import express, { NextFunction, Request, Response } from "express";
import { registerRoutes } from "./routes";
import { serveStatic, log, setupVite } from "./vite";
import path from "path";

const PORT = process.env.PORT || 5000;

async function main() {
  const app = express();
  app.use(express.json());

  // Create HTTP server
  const server = await registerRoutes(app);

  // Setup Vite or static file serving depending on environment
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    log(err.message || 'Internal server error', 'error');
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      error: true,
      message: err.message || 'Internal server error',
    });
  });

  server.listen(PORT, () => {
    log(`serving on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});