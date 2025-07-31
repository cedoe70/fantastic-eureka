import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { Wand2, Paperclip, Eye, Send } from "lucide-react";

const sendEmailSchema = z.object({
  recipientEmail: z.string().email("Please enter a valid email address"),
  templateType: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  htmlContent: z.string().min(1, "Message content is required"),
});

type SendEmailForm = z.infer<typeof sendEmailSchema>;

interface EmailComposerProps {
  templates: any[];
}

export default function EmailComposer({ templates }: EmailComposerProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const form = useForm<SendEmailForm>({
    resolver: zodResolver(sendEmailSchema),
    defaultValues: {
      recipientEmail: "",
      templateType: "",
      subject: "",
      htmlContent: "",
    },
  });

  const sendEmailMutation = useMutation({
    mutationFn: api.sendEmail,
    onSuccess: () => {
      toast({
        title: "Email sent successfully!",
        description: "Your email has been delivered.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/emails"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activity"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send email",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SendEmailForm) => {
    sendEmailMutation.mutate({
      recipientEmail: data.recipientEmail,
      subject: data.subject,
      htmlContent: data.htmlContent,
      templateId: selectedTemplate?.id,
    });
  };

  const handleTemplateSelect = (templateType: string) => {
    const template = templates.find(t => t.type === templateType);
    if (template) {
      setSelectedTemplate(template);
      form.setValue("subject", template.subject);
      form.setValue("htmlContent", template.htmlContent);
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">Quick Send Email</CardTitle>
          <Button 
            type="button" 
            className="gradient-primary text-white hover:shadow-lg transition-all duration-200"
            onClick={() => {
              // Could open template selector modal here
            }}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Use Template
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="recipientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="recipient@example.com" 
                        className="border-2 focus:border-primary" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="templateType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Type</FormLabel>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      handleTemplateSelect(value);
                    }}>
                      <FormControl>
                        <SelectTrigger className="border-2 focus:border-primary">
                          <SelectValue placeholder="Select template type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="receipt">Receipt</SelectItem>
                        <SelectItem value="confirmation">Order Confirmation</SelectItem>
                        <SelectItem value="notification">Notification</SelectItem>
                        <SelectItem value="welcome">Welcome Email</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Subject</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter email subject" 
                      className="border-2 focus:border-primary" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="htmlContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={6}
                      placeholder="Enter your message content here..." 
                      className="border-2 focus:border-primary resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button type="button" variant="ghost" className="text-gray-600 hover:text-primary">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach File
                </Button>
                <Button type="button" variant="ghost" className="text-gray-600 hover:text-primary">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
              <div className="flex items-center space-x-3">
                <Button type="button" variant="outline">
                  Save Draft
                </Button>
                <Button 
                  type="submit" 
                  className="gradient-primary text-white hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  disabled={sendEmailMutation.isPending}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {sendEmailMutation.isPending ? "Sending..." : "Send Email"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
