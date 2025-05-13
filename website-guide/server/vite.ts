import path from "path";
import fs from "fs";
import express, { Express } from "express";
import { Server } from "http";

export function log(message: string, source = "express") {
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log(`${time} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const { createServer: createViteServer } = await import("vite");
  
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
    root: path.resolve(process.cwd(), "client"),
  });

  app.use(vite.middlewares);

  // Additional middleware for SPA routing in development mode
  app.use((req, res, next) => {
    if (req.url.startsWith('/api') || req.url.includes('.')) {
      return next();
    }
    
    res.sendFile(path.resolve(process.cwd(), 'client/index.html'));
  });

  return { vite, server };
}

export function serveStatic(app: Express) {
  const clientPath = path.resolve(process.cwd(), "client");
  
  // Serve static files from client directory
  app.use(express.static(clientPath));
  
  // Serve index.html for any route not handled by API or static files
  app.get("*", (req, res) => {
    if (req.path.startsWith('/api') || req.path.includes('.')) {
      return;
    }
    res.sendFile(path.join(clientPath, "index.html"));
  });
}