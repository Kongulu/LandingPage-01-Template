import express, { Express, Request, Response, NextFunction } from "express";
import { registerRoutes } from './routes';
import { log, setupVite, serveStatic } from "./vite";
import { Server } from "http";

async function main() {
  const app: Express = express();
  app.use(express.json());

  // Register API routes
  const server = await registerRoutes(app);

  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Centralized error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    log(`Error: ${err.message}`, "error");
    res.status(statusCode).json({
      message: err.message || "Internal Server Error",
    });
  });

  // Start the server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});