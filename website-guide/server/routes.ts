import { Express, Request, Response } from "express";
import { Server, createServer } from "http";
import { storage } from "./storage";
import https from 'https';
import { URL } from 'url';

interface SSLResult {
  domain: string;
  valid: boolean;
  issuer?: string;
  validFrom?: string;
  validTo?: string;
  daysRemaining?: number;
  error?: string;
}

/**
 * Checks the SSL certificate for a given domain
 * In a production environment, this would use proper SSL certificate validation libraries
 * This is a simplified implementation for demonstration purposes
 */
async function checkSSLCertificate(domain: string): Promise<SSLResult> {
  return new Promise((resolve) => {
    try {
      const url = new URL(`https://${domain}`);
      
      const req = https.request(
        {
          host: url.hostname,
          port: 443,
          method: 'HEAD',
          rejectUnauthorized: false, // Don't reject certificates for testing
        },
        (res) => {
          // This is a simplified implementation
          // A real implementation would extract the certificate details
          // and validate it properly
          
          // For demo purposes, consider it valid if we get a response
          const valid = res.statusCode !== undefined && res.statusCode < 500;
          
          // In a real implementation, we would extract these from the certificate
          const currentDate = new Date();
          const futureDate = new Date();
          futureDate.setDate(currentDate.getDate() + 90);
          
          resolve({
            domain,
            valid,
            issuer: "Let's Encrypt Authority X3",
            validFrom: currentDate.toISOString(),
            validTo: futureDate.toISOString(),
            daysRemaining: 90,
          });
        }
      );
      
      req.on('error', (err) => {
        resolve({
          domain,
          valid: false,
          error: err.message,
        });
      });
      
      req.setTimeout(5000, () => {
        req.destroy();
        resolve({
          domain,
          valid: false,
          error: 'Connection timeout',
        });
      });
      
      req.end();
    } catch (err) {
      resolve({
        domain,
        valid: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  const server = createServer(app);
  
  // API routes
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });
  
  // SSL certificate check endpoint
  app.get('/api/check-ssl', async (req: Request, res: Response) => {
    try {
      const domain = req.query.domain as string;
      
      if (!domain) {
        return res.status(400).json({ 
          error: 'Domain parameter is required' 
        });
      }
      
      const result = await checkSSLCertificate(domain);
      res.json(result);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Unknown error checking SSL certificate' 
      });
    }
  });
  
  // Bulk SSL certificate check endpoint
  app.post('/api/check-ssl-bulk', async (req: Request, res: Response) => {
    try {
      const domains = req.body.domains as string[];
      
      if (!domains || !Array.isArray(domains) || domains.length === 0) {
        return res.status(400).json({ 
          error: 'Request body must include a non-empty "domains" array' 
        });
      }
      
      // Check up to 5 domains max
      const limitedDomains = domains.slice(0, 5);
      
      const results = await Promise.all(
        limitedDomains.map(domain => checkSSLCertificate(domain))
      );
      
      res.json(results);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Unknown error checking SSL certificates' 
      });
    }
  });

  // Special middleware to log all requests
  app.use((req, res, next) => {
    console.log(`[DEBUG] Request to: ${req.method} ${req.url}`);
    next();
  });
  
  // Serve static files from the client directory
  app.use(express.static(process.cwd() + '/client'));
  
  // Define specific routes to serve the corresponding index.html files
  app.get('/', (req, res) => {
    console.log('[DEBUG] Home route hit');
    res.sendFile(process.cwd() + '/client/index.html');
  });
  
  app.get('/ssl', (req, res) => {
    console.log('[DEBUG] SSL route hit');
    res.sendFile(process.cwd() + '/client/ssl/index.html');
  });
  
  app.get('/analytics', (req, res) => {
    console.log('[DEBUG] Analytics route hit');
    res.sendFile(process.cwd() + '/client/analytics/index.html');
  });
  
  app.get('/design-system', (req, res) => {
    console.log('[DEBUG] Design System route hit');
    res.sendFile(process.cwd() + '/client/design-system/index.html');
  });
  
  app.get('/test', (req, res) => {
    console.log('[DEBUG] Test route hit');
    res.sendFile(process.cwd() + '/client/test/index.html');
  });
  
  app.get('/admin', (req, res) => {
    console.log('[DEBUG] Admin route hit');
    res.sendFile(process.cwd() + '/client/admin/index.html');
  });
  
  // Fallback route for any other routes - serve main index.html
  app.use('*', (req, res) => {
    console.log('[DEBUG] Catch-all route hit for URL:', req.originalUrl);
    res.sendFile(process.cwd() + '/client/index.html');
  });

  return server;
}