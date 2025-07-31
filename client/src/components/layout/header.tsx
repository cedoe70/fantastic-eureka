import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  description: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>
    </div>
  );
}
