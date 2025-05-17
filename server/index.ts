import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

const app = express();

// Cookie parser must come before CSRF
app.use(cookieParser());

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CSRF protection middleware
const csrfProtection = csrf({ cookie: { 
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
}});

// Apply CSRF protection to all non-GET routes
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
    csrfProtection(req, res, next);
  } else {
    next();
  }
});

// Generate CSRF token for GET requests
app.use((req, res, next) => {
  if (req.method === 'GET') {
    csrfProtection(req, res, (err) => {
      if (err) {
        next(); // Continue even if CSRF fails on GET requests
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

// Add comprehensive security headers
app.use((req, res, next) => {
  // Set Content-Security-Policy with strict rules
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "img-src 'self' data:; " + 
    "style-src 'self' 'unsafe-inline'; " + 
    "script-src 'self' 'unsafe-inline'; " + 
    "connect-src 'self'; " +
    "font-src 'self'; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self';"
  );
  
  // Additional security headers as recommended by NodeDiag
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Set secure cookie policy
  if (!res.headersSent) {
    res.setHeader('Set-Cookie', [
      'session=; HttpOnly; Secure; SameSite=Strict; Path=/',
      'XSRF-TOKEN=; HttpOnly; Secure; SameSite=Strict; Path=/'
    ]);
  }
  
  next();
});

// Enhanced XSS protection (manual implementation)
app.use((req, res, next) => {
  // Helper function to sanitize strings
  const sanitizeString = (str: string): string => {
    if (!str || typeof str !== 'string') return str;
    return str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/`/g, '&#96;')
      .replace(/\\/g, '&#92;');
  };

  // Process query parameters
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === 'string') {
        req.query[key] = sanitizeString(req.query[key] as string);
      }
    });
  }
  
  // Process request body
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key]);
      }
    });
  }
  
  next();
});

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
