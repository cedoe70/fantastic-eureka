import { Send, CheckCircle, MailOpen, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  stats: {
    emailsSent: number;
    deliveryRate: number;
    openRate: number;
    activeTemplates: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Emails Sent",
      value: stats.emailsSent.toLocaleString(),
      change: "+12.5%",
      icon: Send,
      gradient: "from-primary to-purple-500",
      positive: true
    },
    {
      title: "Delivery Rate",
      value: `${stats.deliveryRate}%`,
      change: "+0.3%",
      icon: CheckCircle,
      gradient: "from-emerald-500 to-cyan-500",
      positive: true
    },
    {
      title: "Open Rate",
      value: `${stats.openRate}%`,
      change: "-2.1%",
      icon: MailOpen,
      gradient: "from-cyan-500 to-blue-500",
      positive: false
    },
    {
      title: "Active Templates",
      value: stats.activeTemplates.toString(),
      change: "+3",
      icon: FileText,
      gradient: "from-purple-500 to-pink-500",
      positive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      card.positive ? "text-emerald-500" : "text-red-500"
                    }`}>
                      {card.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center`}>
                  <Icon className="text-white w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
