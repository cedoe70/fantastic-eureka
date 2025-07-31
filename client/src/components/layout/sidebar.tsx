import { Link, useLocation } from "wouter";
import { 
  BarChart3, 
  FileText, 
  Send, 
  TrendingUp, 
  Users, 
  Settings, 
  Mail 
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Templates", href: "/templates", icon: FileText },
  { name: "Send Email", href: "/send", icon: Send },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 glass-dark fixed h-full z-10">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Mail className="text-white text-lg" />
          </div>
          <span className="text-xl font-bold text-white">MailFlow</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link key={item.name} href={item.href}>
                <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? "text-white bg-white/10" 
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}>
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* User Profile */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/10">
          <div className="w-10 h-10 rounded-full gradient-secondary"></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-gray-300 truncate">john@company.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
