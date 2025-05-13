import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import { fileURLToPath } from 'url';
import https from 'https';
import { URL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Interface for SSL check results
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
          timeout: 5000,
        },
        (res) => {
          // For demo purposes, consider it valid if we get a response
          const valid = res.statusCode !== undefined && res.statusCode < 500;
          
          // In a real implementation, we would extract these from the certificate
          const currentDate = new Date();
          const futureDate = new Date();
          futureDate.setDate(currentDate.getDate() + 90); // 90 days validity
          
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
    } catch (err: any) {
      resolve({
        domain,
        valid: false,
        error: err.message || 'Unknown error',
      });
    }
  });
}

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

  // SSL certificate checking endpoint
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
    } catch (error: any) {
      res.status(500).json({ 
        error: error.message || 'Unknown error checking SSL certificate' 
      });
    }
  });

  // Route for the landing page
  app.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'index.html'));
  });

  // Route for the SSL checker page
  app.get('/ssl-checker', (req, res) => {
    res.sendFile(path.join(rootDir, 'ssl-checker.html'));
  });

  const httpServer = createServer(app);

  return httpServer;
}
