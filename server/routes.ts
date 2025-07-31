import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail, processTemplate } from "./services/email";
import { insertEmailTemplateSchema, insertContactSchema, sendEmailSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server | void> {
  const DEFAULT_USER_ID = "default-user"; // For demo purposes

  // Get email templates
  app.get("/api/templates", async (req, res) => {
    try {
      const templates = await storage.getEmailTemplates(DEFAULT_USER_ID);
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  // Create email template
  app.post("/api/templates", async (req, res) => {
    try {
      const templateData = insertEmailTemplateSchema.parse(req.body);
      const template = await storage.createEmailTemplate({
        ...templateData,
        userId: DEFAULT_USER_ID
      });
      res.status(201).json(template);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid template data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create template" });
      }
    }
  });

  // Update email template
  app.put("/api/templates/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const templateData = insertEmailTemplateSchema.partial().parse(req.body);
      const template = await storage.updateEmailTemplate(id, templateData);
      
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      res.json(template);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid template data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update template" });
      }
    }
  });

  // Delete email template
  app.delete("/api/templates/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteEmailTemplate(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete template" });
    }
  });

  // Send email
  app.post("/api/emails/send", async (req, res) => {
    try {
      const emailData = sendEmailSchema.parse(req.body);
      
      // Create sent email record
      const sentEmail = await storage.createSentEmail({
        templateId: emailData.templateId || null,
        recipientEmail: emailData.recipientEmail,
        recipientName: emailData.recipientName || null,
        subject: emailData.subject,
        htmlContent: emailData.htmlContent,
        textContent: emailData.textContent || null,
        userId: DEFAULT_USER_ID
      });

      // If using a template, increment its usage count
      if (emailData.templateId) {
        await storage.incrementTemplateUsage(emailData.templateId);
      }

      // Send email
      const result = await sendEmail({
        to: emailData.recipientEmail,
        from: "noreply@mailflow.com",
        subject: emailData.subject,
        html: emailData.htmlContent,
        text: emailData.textContent
      });

      if (result.success) {
        await storage.updateSentEmailStatus(sentEmail.id, "delivered", new Date());
        res.json({ success: true, emailId: sentEmail.id });
      } else {
        await storage.updateSentEmailStatus(sentEmail.id, "failed", new Date(), result.error);
        res.status(500).json({ message: result.error || "Failed to send email" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid email data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to send email" });
      }
    }
  });

  // Get sent emails
  app.get("/api/emails", async (req, res) => {
    try {
      const emails = await storage.getSentEmails(DEFAULT_USER_ID);
      res.json(emails);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch emails" });
    }
  });

  // Get email analytics
  app.get("/api/analytics", async (req, res) => {
    try {
      const stats = await storage.getEmailStats(DEFAULT_USER_ID);
      const templates = await storage.getEmailTemplates(DEFAULT_USER_ID);
      
      res.json({
        stats: {
          emailsSent: stats.totalSent,
          deliveryRate: stats.deliveryRate,
          openRate: stats.openRate,
          activeTemplates: templates.filter(t => t.isActive).length
        },
        deliveryStatus: {
          delivered: stats.delivered,
          opened: stats.opened,
          pending: stats.totalSent - stats.delivered - stats.failed,
          failed: stats.failed
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Get contacts
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts(DEFAULT_USER_ID);
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Create contact
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact({
        ...contactData,
        userId: DEFAULT_USER_ID
      });
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create contact" });
      }
    }
  });

  // Get recent activity
  app.get("/api/activity", async (req, res) => {
    try {
      const emails = await storage.getSentEmails(DEFAULT_USER_ID);
      const templates = await storage.getEmailTemplates(DEFAULT_USER_ID);
      
      const activities = [
        ...emails.slice(0, 10).map(email => ({
          id: email.id,
          message: `${email.status === 'delivered' ? 'Email delivered to' : 'Email sent to'} ${email.recipientEmail}`,
          time: email.sentAt || new Date(),
          type: 'email'
        })),
        ...templates.slice(0, 5).map(template => ({
          id: template.id,
          message: `Template "${template.name}" ${template.createdAt! > new Date(Date.now() - 24 * 60 * 60 * 1000) ? 'created' : 'updated'}`,
          time: template.createdAt || new Date(),
          type: 'template'
        }))
      ].sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 10);

      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activity" });
    }
  });

  // Only create HTTP server in development mode
  if (process.env.NODE_ENV === "development") {
    const httpServer = createServer(app);
    return httpServer;
  }
  
  // For production/serverless, just return void
}
