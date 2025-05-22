import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export async function registerRoutes(app: Express): Promise<Server> {
  // Route for the landing page - always serve main index.html
  app.get('/', (req, res) => {
    // Serve the main landing page
    res.sendFile(path.join(rootDir, 'index.html'));
  });

  // Handle all other routes to redirect to home page
  app.get('*', (req, res) => {
    res.redirect('/');
  });

  const httpServer = createServer(app);
  return httpServer;
}
