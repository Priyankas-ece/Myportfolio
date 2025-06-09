import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({ success: true, id: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        console.error("Contact submission error:", error);
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Get contact submissions (for admin use)
  app.get("/api/contact", async (req: Request, res: Response) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  // Page view tracking endpoint
  app.post("/api/analytics/pageview", async (req: Request, res: Response) => {
    try {
      const { page } = req.body;
      if (!page) {
        return res.status(400).json({ error: "Page parameter is required" });
      }

      const pageView = await storage.createPageView({
        page,
        userAgent: req.get('User-Agent') || null,
        ipAddress: req.ip || null,
      });

      res.json({ success: true, id: pageView.id });
    } catch (error) {
      console.error("Page view tracking error:", error);
      res.status(500).json({ error: "Failed to track page view" });
    }
  });

  // Get page view statistics
  app.get("/api/analytics/stats", async (req: Request, res: Response) => {
    try {
      const stats = await storage.getPageViewStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching page view stats:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
