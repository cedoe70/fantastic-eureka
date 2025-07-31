import { apiRequest } from "./queryClient";

export const api = {
  // Templates
  getTemplates: () => fetch("/api/templates").then(res => res.json()),
  createTemplate: (data: any) => apiRequest("POST", "/api/templates", data),
  updateTemplate: (id: string, data: any) => apiRequest("PUT", `/api/templates/${id}`, data),
  deleteTemplate: (id: string) => apiRequest("DELETE", `/api/templates/${id}`),
  
  // Emails
  sendEmail: (data: any) => apiRequest("POST", "/api/emails/send", data),
  getEmails: () => fetch("/api/emails").then(res => res.json()),
  
  // Analytics
  getAnalytics: () => fetch("/api/analytics").then(res => res.json()),
  
  // Contacts
  getContacts: () => fetch("/api/contacts").then(res => res.json()),
  createContact: (data: any) => apiRequest("POST", "/api/contacts", data),
  
  // Activity
  getActivity: () => fetch("/api/activity").then(res => res.json()),
};
