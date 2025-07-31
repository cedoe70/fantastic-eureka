import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Key, Bell, Shield, User } from "lucide-react";

export default function Settings() {
  return (
    <div className="animate-fade-in">
      <Header 
        title="Settings" 
        description="Manage your account and email configuration"
      />
      
      <div className="p-8 space-y-8">
        {/* Account Settings */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <CardTitle>Account Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john@company.com" />
              </div>
            </div>
            <Button className="gradient-primary text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Email Configuration */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Key className="w-5 h-5 text-primary" />
              <CardTitle>Email Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sender-name">Default Sender Name</Label>
              <Input id="sender-name" defaultValue="MailFlow Support" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sender-email">Default Sender Email</Label>
              <Input id="sender-email" type="email" defaultValue="noreply@mailflow.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">SendGrid API Key</Label>
              <Input id="api-key" type="password" placeholder="••••••••••••••••" />
            </div>
            <Button className="gradient-primary text-white">
              <Save className="w-4 h-4 mr-2" />
              Update Configuration
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-primary" />
              <CardTitle>Notification Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive notifications about email delivery status</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="delivery-reports">Delivery Reports</Label>
                <p className="text-sm text-gray-600">Get daily reports about email performance</p>
              </div>
              <Switch id="delivery-reports" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="bounce-notifications">Bounce Notifications</Label>
                <p className="text-sm text-gray-600">Get notified when emails bounce</p>
              </div>
              <Switch id="bounce-notifications" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle>Security Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button className="gradient-primary text-white">
              <Save className="w-4 h-4 mr-2" />
              Update Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
