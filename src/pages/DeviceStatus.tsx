import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Smartphone, Wifi, WifiOff, RefreshCw, Clock, Activity, Server, Database } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionLog {
  id: string;
  timestamp: string;
  event: string;
  status: "connected" | "disconnected" | "error" | "info";
  details: string;
}

const connectionLogs: ConnectionLog[] = [
  {
    id: "1",
    timestamp: "2026-01-04 10:32:00",
    event: "Session Active",
    status: "connected",
    details: "WhatsApp session is active and receiving messages",
  },
  {
    id: "2",
    timestamp: "2026-01-04 08:30:15",
    event: "Connection Established",
    status: "connected",
    details: "Successfully connected to WhatsApp servers",
  },
  {
    id: "3",
    timestamp: "2026-01-04 08:30:00",
    event: "QR Code Scanned",
    status: "info",
    details: "Device authenticated via QR code scan",
  },
  {
    id: "4",
    timestamp: "2026-01-04 08:29:45",
    event: "Waiting for QR Scan",
    status: "info",
    details: "QR code generated, waiting for device scan",
  },
  {
    id: "5",
    timestamp: "2026-01-03 23:45:30",
    event: "Session Timeout",
    status: "disconnected",
    details: "Session expired after 24 hours of inactivity",
  },
  {
    id: "6",
    timestamp: "2026-01-03 15:20:10",
    event: "Reconnection Successful",
    status: "connected",
    details: "Automatically reconnected after brief network interruption",
  },
  {
    id: "7",
    timestamp: "2026-01-03 15:19:55",
    event: "Connection Lost",
    status: "error",
    details: "Network interruption detected, attempting reconnection...",
  },
  {
    id: "8",
    timestamp: "2026-01-02 09:00:00",
    event: "Session Started",
    status: "connected",
    details: "New WhatsApp session initialized",
  },
];

const statusConfig = {
  connected: { color: "text-success", bg: "bg-success/10", label: "Connected" },
  disconnected: { color: "text-warning", bg: "bg-warning/10", label: "Disconnected" },
  error: { color: "text-destructive", bg: "bg-destructive/10", label: "Error" },
  info: { color: "text-muted-foreground", bg: "bg-muted", label: "Info" },
};

const DeviceStatus = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Smartphone className="h-7 w-7 text-primary" />
              Device Status
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor your WhatsApp connection and system health
            </p>
          </div>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Status
          </Button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Connection</p>
                  <p className="text-xl font-bold text-success mt-1">Online</p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <Wifi className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                  <p className="text-xl font-bold text-foreground mt-1">12h 32m</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">API Status</p>
                  <p className="text-xl font-bold text-success mt-1">Healthy</p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <Server className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Database</p>
                  <p className="text-xl font-bold text-success mt-1">Connected</p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <Database className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Info & Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Phone Number", value: "+62 812-9876-5432" },
                { label: "Profile Name", value: "GoWA Business" },
                { label: "GoWA Version", value: "v1.2.0" },
                { label: "API Port", value: "3000" },
                { label: "Server OS", value: "Ubuntu 22.04 LTS" },
                { label: "Node.js", value: "v20.10.0" },
                { label: "Memory Usage", value: "512 MB / 2 GB" },
                { label: "CPU Usage", value: "12%" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Connection Logs */}
          <Card className="shadow-card lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Connection Logs</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="px-6 space-y-4 pb-6">
                  {connectionLogs.map((log, index) => {
                    const config = statusConfig[log.status];
                    return (
                      <div
                        key={log.id}
                        className="flex gap-4 animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex flex-col items-center">
                          <div
                            className={cn(
                              "w-3 h-3 rounded-full",
                              log.status === "connected"
                                ? "bg-success"
                                : log.status === "error"
                                ? "bg-destructive"
                                : log.status === "disconnected"
                                ? "bg-warning"
                                : "bg-muted-foreground"
                            )}
                          />
                          {index < connectionLogs.length - 1 && (
                            <div className="w-0.5 h-full bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">
                              {log.event}
                            </span>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                config.bg,
                                config.color
                              )}
                            >
                              {config.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {log.details}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {log.timestamp}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeviceStatus;
