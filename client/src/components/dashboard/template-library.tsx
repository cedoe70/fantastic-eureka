import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt, CheckCircle, UserPlus, Plus, ArrowRight } from "lucide-react";

interface TemplateLibraryProps {
  templates: any[];
}

export default function TemplateLibrary({ templates }: TemplateLibraryProps) {
  const getTemplateIcon = (type: string) => {
    switch (type) {
      case "receipt":
        return Receipt;
      case "confirmation":
        return CheckCircle;
      case "welcome":
        return UserPlus;
      default:
        return Receipt;
    }
  };

  const getTemplateGradient = (type: string) => {
    switch (type) {
      case "receipt":
        return "from-emerald-500 to-cyan-500";
      case "confirmation":
        return "from-purple-500 to-pink-500";
      case "welcome":
        return "from-primary to-purple-500";
      default:
        return "from-emerald-500 to-cyan-500";
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900">Template Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {templates.map((template) => {
            const Icon = getTemplateIcon(template.type);
            const gradient = getTemplateGradient(template.type);
            
            return (
              <div 
                key={template.id}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{template.name}</p>
                    <p className="text-xs text-gray-500">Used {template.usageCount} times</p>
                  </div>
                </div>
                <ArrowRight className="text-gray-400 w-4 h-4" />
              </div>
            );
          })}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-4 border-2 border-dashed border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Template
        </Button>
      </CardContent>
    </Card>
  );
}
