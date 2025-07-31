import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeliveryStatusProps {
  status: {
    delivered: number;
    opened: number;
    pending: number;
    failed: number;
  };
}

export default function DeliveryStatus({ status }: DeliveryStatusProps) {
  const total = status.delivered + status.opened + status.pending + status.failed;
  const deliveryRate = total > 0 ? ((status.delivered + status.opened) / total * 100) : 0;

  const statusItems = [
    {
      label: "Delivered",
      value: status.delivered,
      percentage: total > 0 ? (status.delivered / total * 100).toFixed(1) : "0.0",
      color: "bg-emerald-500"
    },
    {
      label: "Opened",
      value: status.opened,
      percentage: total > 0 ? (status.opened / total * 100).toFixed(1) : "0.0",
      color: "bg-cyan-500"
    },
    {
      label: "Pending",
      value: status.pending,
      percentage: total > 0 ? (status.pending / total * 100).toFixed(1) : "0.0",
      color: "bg-yellow-500"
    },
    {
      label: "Failed",
      value: status.failed,
      percentage: total > 0 ? (status.failed / total * 100).toFixed(1) : "0.0",
      color: "bg-red-500"
    }
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900">Delivery Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {statusItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                <span className="text-gray-700">{item.label}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">{item.value.toLocaleString()}</span>
                <span className="text-sm text-gray-500 block">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Ring */}
        <div className="mt-8 flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle 
                cx="60" 
                cy="60" 
                r="50" 
                stroke="currentColor" 
                strokeWidth="8" 
                fill="none" 
                className="text-gray-200"
              />
              <circle 
                cx="60" 
                cy="60" 
                r="50" 
                stroke="currentColor" 
                strokeWidth="8" 
                fill="none" 
                strokeLinecap="round" 
                className="text-emerald-500" 
                strokeDasharray="314" 
                strokeDashoffset={314 - (314 * deliveryRate / 100)}
                style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{deliveryRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
