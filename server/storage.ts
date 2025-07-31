import { 
  type User, 
  type InsertUser, 
  type EmailTemplate, 
  type InsertEmailTemplate,
  type SentEmail,
  type InsertSentEmail,
  type Contact,
  type InsertContact
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Email template methods
  getEmailTemplates(userId: string): Promise<EmailTemplate[]>;
  getEmailTemplate(id: string): Promise<EmailTemplate | undefined>;
  createEmailTemplate(template: InsertEmailTemplate & { userId: string }): Promise<EmailTemplate>;
  updateEmailTemplate(id: string, template: Partial<EmailTemplate>): Promise<EmailTemplate | undefined>;
  deleteEmailTemplate(id: string): Promise<boolean>;
  incrementTemplateUsage(id: string): Promise<void>;

  // Sent email methods
  getSentEmails(userId: string): Promise<SentEmail[]>;
  getSentEmail(id: string): Promise<SentEmail | undefined>;
  createSentEmail(email: InsertSentEmail & { userId: string }): Promise<SentEmail>;
  updateSentEmailStatus(id: string, status: string, timestamp?: Date, errorMessage?: string): Promise<void>;

  // Contact methods
  getContacts(userId: string): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  createContact(contact: InsertContact & { userId: string }): Promise<Contact>;
  updateContact(id: string, contact: Partial<Contact>): Promise<Contact | undefined>;
  deleteContact(id: string): Promise<boolean>;

  // Analytics methods
  getEmailStats(userId: string): Promise<{
    totalSent: number;
    delivered: number;
    opened: number;
    failed: number;
    deliveryRate: number;
    openRate: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private emailTemplates: Map<string, EmailTemplate>;
  private sentEmails: Map<string, SentEmail>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.emailTemplates = new Map();
    this.sentEmails = new Map();
    this.contacts = new Map();
    
    // Initialize with default user and templates
    this.initializeDefaultData();
  }

  private async initializeDefaultData() {
    // Create default user
    const defaultUser: User = {
      id: "default-user",
      username: "demo",
      password: "demo123",
      email: "john@company.com",
      name: "John Doe"
    };
    this.users.set(defaultUser.id, defaultUser);

    // Create default templates
    const templates: EmailTemplate[] = [
      {
        id: "template-1",
        name: "Order Receipt",
        type: "receipt",
        subject: "Your order receipt - Order #{{orderNumber}}",
        htmlContent: `
          <h1>Thank you for your order!</h1>
          <p>Hi {{customerName}},</p>
          <p>Your order #{{orderNumber}} has been confirmed.</p>
          <p>Total amount: {{totalAmount}}</p>
          <p>Thank you for your business!</p>
        `,
        textContent: "Thank you for your order! Order #{{orderNumber}} confirmed. Total: {{totalAmount}}",
        variables: ["customerName", "orderNumber", "totalAmount"],
        isActive: true,
        usageCount: 450,
        createdAt: new Date(),
        userId: defaultUser.id
      },
      {
        id: "template-2",
        name: "Order Confirmation",
        type: "confirmation",
        subject: "Order Confirmation - {{orderNumber}}",
        htmlContent: `
          <h1>Order Confirmed!</h1>
          <p>Dear {{customerName}},</p>
          <p>We've received your order and it's being processed.</p>
          <p>Order details:</p>
          <ul>
            <li>Order Number: {{orderNumber}}</li>
            <li>Total: {{totalAmount}}</li>
            <li>Expected delivery: {{deliveryDate}}</li>
          </ul>
        `,
        textContent: "Order confirmed! Order #{{orderNumber}}, Total: {{totalAmount}}, Delivery: {{deliveryDate}}",
        variables: ["customerName", "orderNumber", "totalAmount", "deliveryDate"],
        isActive: true,
        usageCount: 320,
        createdAt: new Date(),
        userId: defaultUser.id
      },
      {
        id: "template-3",
        name: "Welcome Email",
        type: "welcome",
        subject: "Welcome to {{companyName}}!",
        htmlContent: `
          <h1>Welcome {{customerName}}!</h1>
          <p>Thank you for joining {{companyName}}.</p>
          <p>We're excited to have you on board!</p>
          <p>Get started by exploring our features.</p>
        `,
        textContent: "Welcome {{customerName}}! Thank you for joining {{companyName}}. We're excited to have you!",
        variables: ["customerName", "companyName"],
        isActive: true,
        usageCount: 280,
        createdAt: new Date(),
        userId: defaultUser.id
      }
    ];

    templates.forEach(template => {
      this.emailTemplates.set(template.id, template);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getEmailTemplates(userId: string): Promise<EmailTemplate[]> {
    return Array.from(this.emailTemplates.values()).filter(
      template => template.userId === userId
    );
  }

  async getEmailTemplate(id: string): Promise<EmailTemplate | undefined> {
    return this.emailTemplates.get(id);
  }

  async createEmailTemplate(template: InsertEmailTemplate & { userId: string }): Promise<EmailTemplate> {
    const id = randomUUID();
    const emailTemplate: EmailTemplate = {
      ...template,
      id,
      textContent: template.textContent || null,
      variables: template.variables || [],
      isActive: template.isActive ?? true,
      usageCount: 0,
      createdAt: new Date()
    };
    this.emailTemplates.set(id, emailTemplate);
    return emailTemplate;
  }

  async updateEmailTemplate(id: string, template: Partial<EmailTemplate>): Promise<EmailTemplate | undefined> {
    const existing = this.emailTemplates.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...template };
    this.emailTemplates.set(id, updated);
    return updated;
  }

  async deleteEmailTemplate(id: string): Promise<boolean> {
    return this.emailTemplates.delete(id);
  }

  async incrementTemplateUsage(id: string): Promise<void> {
    const template = this.emailTemplates.get(id);
    if (template) {
      template.usageCount = (template.usageCount || 0) + 1;
      this.emailTemplates.set(id, template);
    }
  }

  async getSentEmails(userId: string): Promise<SentEmail[]> {
    return Array.from(this.sentEmails.values())
      .filter(email => email.userId === userId)
      .sort((a, b) => b.sentAt!.getTime() - a.sentAt!.getTime());
  }

  async getSentEmail(id: string): Promise<SentEmail | undefined> {
    return this.sentEmails.get(id);
  }

  async createSentEmail(email: InsertSentEmail & { userId: string }): Promise<SentEmail> {
    const id = randomUUID();
    const sentEmail: SentEmail = {
      ...email,
      id,
      templateId: email.templateId || null,
      recipientName: email.recipientName || null,
      textContent: email.textContent || null,
      status: "pending",
      sentAt: new Date(),
      deliveredAt: null,
      openedAt: null,
      errorMessage: null
    };
    this.sentEmails.set(id, sentEmail);
    return sentEmail;
  }

  async updateSentEmailStatus(id: string, status: string, timestamp?: Date, errorMessage?: string): Promise<void> {
    const email = this.sentEmails.get(id);
    if (!email) return;

    email.status = status;
    if (errorMessage) email.errorMessage = errorMessage;
    
    if (status === "delivered" && timestamp) {
      email.deliveredAt = timestamp;
    } else if (status === "opened" && timestamp) {
      email.openedAt = timestamp;
    }

    this.sentEmails.set(id, email);
  }

  async getContacts(userId: string): Promise<Contact[]> {
    return Array.from(this.contacts.values()).filter(
      contact => contact.userId === userId
    );
  }

  async getContact(id: string): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(contact: InsertContact & { userId: string }): Promise<Contact> {
    const id = randomUUID();
    const newContact: Contact = {
      ...contact,
      id,
      name: contact.name || null,
      tags: contact.tags || [],
      createdAt: new Date()
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async updateContact(id: string, contact: Partial<Contact>): Promise<Contact | undefined> {
    const existing = this.contacts.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...contact };
    this.contacts.set(id, updated);
    return updated;
  }

  async deleteContact(id: string): Promise<boolean> {
    return this.contacts.delete(id);
  }

  async getEmailStats(userId: string): Promise<{
    totalSent: number;
    delivered: number;
    opened: number;
    failed: number;
    deliveryRate: number;
    openRate: number;
  }> {
    const userEmails = Array.from(this.sentEmails.values()).filter(
      email => email.userId === userId
    );

    const totalSent = userEmails.length;
    const delivered = userEmails.filter(email => email.status === "delivered").length;
    const opened = userEmails.filter(email => email.status === "opened").length;
    const failed = userEmails.filter(email => email.status === "failed").length;

    const deliveryRate = totalSent > 0 ? (delivered / totalSent) * 100 : 0;
    const openRate = delivered > 0 ? (opened / delivered) * 100 : 0;

    return {
      totalSent,
      delivered,
      opened,
      failed,
      deliveryRate: Math.round(deliveryRate * 10) / 10,
      openRate: Math.round(openRate * 10) / 10
    };
  }
}

export const storage = new MemStorage();
