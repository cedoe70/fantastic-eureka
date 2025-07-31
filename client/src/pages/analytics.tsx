import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import StatsCards from "@/components/dashboard/stats-cards";
import AnalyticsChart from "@/components/dashboard/analytics-chart";
import DeliveryStatus from "@/components/dashboard/delivery-status";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";

export default function Analytics() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["/api/analytics"],
    queryFn: api.getAnalytics,
  });

  const { data: emails = [] } = useQuery({
    queryKey: ["/api/emails"],
    queryFn: api.getEmails,
  });

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <Header 
          title="Analytics" 
          description="Track your email performance and metrics"
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
        title="Analytics" 
        description="Track your email performance and metrics"
      />
      
      <div className="p-8 space-y-8">
        {/* Stats Cards */}
        <StatsCards stats={analytics?.stats || {}} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnalyticsChart />
          <DeliveryStatus status={analytics?.deliveryStatus || {}} />
        </div>

        {/* Recent Emails Table */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">Recent Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Recipient</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Sent</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.slice(0, 10).map((email: any) => (
                    <tr key={email.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="py-3 px-4 text-gray-900">{email.recipientEmail}</td>
                      <td className="py-3 px-4 text-gray-600">{email.subject}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          email.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                          email.status === 'opened' ? 'bg-blue-100 text-blue-800' :
                          email.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {email.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-sm">
                        {new Date(email.sentAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
