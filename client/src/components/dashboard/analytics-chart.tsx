import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AnalyticsChart() {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-900">Email Performance</CardTitle>
          <Select defaultValue="7days">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mock Chart */}
        <div className="relative h-64 bg-gradient-to-br from-primary/5 to-purple-50 rounded-xl p-4 flex items-end justify-between">
          <div className="flex items-end space-x-2 w-full h-full">
            <div className="w-full flex items-end justify-between">
              {[16, 24, 32, 20, 28, 36, 40].map((height, index) => (
                <div
                  key={index}
                  className="w-8 gradient-primary rounded-t transition-all duration-500 hover:opacity-80"
                  style={{ height: `${height * 4}px` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-gray-500">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
