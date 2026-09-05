import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Webhook, Key, Globe, Bell, Shield, Save, Copy, Check, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [webhookUrl, setWebhookUrl] = useState("https://yourserver.com/api/webhook/gowa");
  const [apiPort, setApiPort] = useState("3000");
  const [apiKey, setApiKey] = useState("gowa_sk_live_SANITIZED_KEY");
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [notifications, setNotifications] = useState({
    messageReceived: true,
    autoReplyTriggered: true,
    broadcastComplete: true,
    connectionStatus: true,
  });

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "API Key copied",
      description: "The API key has been copied to your clipboard.",
    });
  };

  const handleRegenerateKey = () => {
    const newKey = `gowa_sk_live_${Math.random().toString(36).substring(2, 26)}`;
    setApiKey(newKey);
    toast({
      title: "API Key regenerated",
      description: "A new API key has been generated. Please update your integrations.",
      variant: "destructive",
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your configuration has been updated successfully.",
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <SettingsIcon className="h-7 w-7 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure your WhatsApp Gateway API and webhooks
          </p>
        </div>

        {/* API Configuration */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Key className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">API Configuration</CardTitle>
                <CardDescription>
                  Configure your GoWA API connection settings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    readOnly
                    className="font-mono pr-20"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7"
                    onClick={handleCopyApiKey}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button variant="outline" onClick={handleRegenerateKey}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Keep this key secret. Use it to authenticate API requests.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiPort">GoWA API Port</Label>
              <Input
                id="apiPort"
                placeholder="3000"
                value={apiPort}
                onChange={(e) => setApiPort(e.target.value)}
                className="max-w-xs"
              />
              <p className="text-xs text-muted-foreground">
                The port where your GoWA server is running
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Webhook Configuration */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Webhook className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <CardTitle className="text-lg">Webhook Configuration</CardTitle>
                <CardDescription>
                  Set up where GoWA sends incoming message data
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                placeholder="https://yourserver.com/api/webhook"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                GoWA will POST incoming messages and events to this URL
              </p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Webhook Status</span>
                <Badge variant="outline" className="border-success/30 bg-success/10 text-success gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Active
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Last Event</p>
                  <p className="font-medium">2 minutes ago</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Events Today</p>
                  <p className="font-medium">1,247</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-warning/10">
                <Bell className="h-5 w-5 text-warning" />
              </div>
              <div>
                <CardTitle className="text-lg">Notification Preferences</CardTitle>
                <CardDescription>
                  Configure which events trigger notifications
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                key: "messageReceived",
                label: "Message Received",
                description: "Get notified when a new message arrives",
              },
              {
                key: "autoReplyTriggered",
                label: "Auto-Reply Triggered",
                description: "Get notified when an auto-reply is sent",
              },
              {
                key: "broadcastComplete",
                label: "Broadcast Complete",
                description: "Get notified when a broadcast finishes",
              },
              {
                key: "connectionStatus",
                label: "Connection Status",
                description: "Get notified about device connection changes",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-2"
              >
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">{item.label}</Label>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <Switch
                  checked={notifications[item.key as keyof typeof notifications]}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, [item.key]: checked })
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-accent/10">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <div>
                <CardTitle className="text-lg">Security</CardTitle>
                <CardDescription>
                  IP whitelisting and access control
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="allowedIps">Allowed IP Addresses</Label>
              <Input
                id="allowedIps"
                placeholder="192.168.1.1, 10.0.0.1"
                defaultValue="0.0.0.0/0"
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated list of IPs allowed to access the API. Use 0.0.0.0/0 to allow all.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            size="lg"
            className="gradient-primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
