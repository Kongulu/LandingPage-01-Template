import { Express, Request, Response } from "express";
import { Server, createServer } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  const server = createServer(app);
  
  // API routes
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  return server;
}