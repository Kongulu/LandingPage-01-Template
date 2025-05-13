import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for Node12.com project guide
  app.get('/api/guide', (req, res) => {
    res.json({
      title: "Project Separation Guide",
      steps: [
        {
          number: 1,
          title: "Create a New Project for Node12.com"
        },
        {
          number: 2,
          title: "Set Up the Node12.com Site in the New Project"
        },
        {
          number: 3,
          title: "Configure Domain for the New Project"
        },
        {
          number: 4,
          title: "Keep the Bookmark Converter in the Original Project"
        },
        {
          number: 5,
          title: "Link Between Projects (Optional)"
        }
      ]
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
