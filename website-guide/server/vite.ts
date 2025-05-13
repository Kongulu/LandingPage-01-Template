import path from "path";
import fs from "fs";
import { Express } from "express";
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
  });

  app.use(vite.middlewares);

  return { vite, server };
}

export function serveStatic(app: Express) {
  const clientDistPath = path.resolve(process.cwd(), "dist");
  
  if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));
    
    // Serve index.html for any route not handled by API or static files
    app.get("*", (req, res) => {
      res.sendFile(path.join(clientDistPath, "index.html"));
    });
  } else {
    log("Warning: dist folder not found. Did you run build?", "static");
  }
}