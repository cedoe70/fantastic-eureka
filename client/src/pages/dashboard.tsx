import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import StatsCards from "@/components/dashboard/stats-cards";
import EmailComposer from "@/components/dashboard/email-composer";
import TemplateLibrary from "@/components/dashboard/template-library";
import RecentActivity from "@/components/dashboard/recent-activity";
import AnalyticsChart from "@/components/dashboard/analytics-chart";
import DeliveryStatus from "@/components/dashboard/delivery-status";
import { api } from "@/lib/api";

export default function Dashboard() {
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["/api/analytics"],
    queryFn: api.getAnalytics,
  });

  const { data: templates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ["/api/templates"],
    queryFn: api.getTemplates,
  });

  const isLoading = analyticsLoading || templatesLoading;

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <Header 
          title="Dashboard" 
          description="Monitor your email campaigns and performance"
        />
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg animate-pulse">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <Header 
        title="Dashboard" 
        description="Monitor your email campaigns and performance"
      />
      
      <div className="p-8 space-y-8">
        {/* Stats Cards */}
        <StatsCards stats={analytics?.stats || {}} />

        {/* Email Composer Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Send */}
          <div className="lg:col-span-2">
            <EmailComposer templates={templates} />
          </div>

          {/* Template Library */}
          <div className="space-y-6">
            <TemplateLibrary templates={templates} />
            <RecentActivity />
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnalyticsChart />
          <DeliveryStatus status={analytics?.deliveryStatus || {}} />
        </div>
      </div>
    </div>
  );
}
