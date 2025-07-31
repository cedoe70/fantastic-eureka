import Header from "@/components/layout/header";
import EmailComposer from "@/components/dashboard/email-composer";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function SendEmail() {
  const { data: templates = [] } = useQuery({
    queryKey: ["/api/templates"],
    queryFn: api.getTemplates,
  });

  return (
    <div className="animate-fade-in">
      <Header 
        title="Send Email" 
        description="Compose and send transactional emails"
      />
      
      <div className="p-8">
        <EmailComposer templates={templates} />
      </div>
    </div>
  );
}
