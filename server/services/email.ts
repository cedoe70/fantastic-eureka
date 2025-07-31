import { MailService } from '@sendgrid/mail';

const sendgridApiKey = process.env.SENDGRID_API_KEY || process.env.VITE_SENDGRID_API_KEY || "default_sendgrid_key";

if (!sendgridApiKey || sendgridApiKey === "default_sendgrid_key") {
  console.warn("SENDGRID_API_KEY not found. Email sending will be simulated.");
}

const mailService = new MailService();
if (sendgridApiKey !== "default_sendgrid_key") {
  mailService.setApiKey(sendgridApiKey);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    if (sendgridApiKey === "default_sendgrid_key") {
      // Simulate email sending for demo purposes
      console.log("Simulating email send:", params);
      
      // Simulate some processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate occasional failures (5% chance)
      if (Math.random() < 0.05) {
        throw new Error("Simulated email delivery failure");
      }
      
      return { success: true };
    }

    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || "",
      html: params.html,
    });
    
    return { success: true };
  } catch (error: any) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      error: error.message || "Failed to send email" 
    };
  }
}

export function processTemplate(content: string, variables: Record<string, string>): string {
  let processed = content;
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    processed = processed.replace(regex, value);
  });
  
  return processed;
}
