import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Webhook, Search, RefreshCw, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface WebhookLog {
  id: string;
  timestamp: string;
  event: string;
  source: string;
  status: "success" | "failed" | "pending";
  responseTime: number;
  payload: object;
}

const logs: WebhookLog[] = [
  {
    id: "wh_001",
    timestamp: "2026-01-04 10:32:15",
    event: "message.received",
    source: "+62 812-3456-7890",
    status: "success",
    responseTime: 124,
    payload: {
      from: "+62 812-3456-7890",
      message: "Halo, saya mau pesan produk",
      timestamp: "2026-01-04T10:32:15.000Z",
      messageId: "msg_abc123",
    },
  },
  {
    id: "wh_002",
    timestamp: "2026-01-04 10:30:42",
    event: "message.sent",
    source: "System",
    status: "success",
    responseTime: 89,
    payload: {
      to: "+62 878-1234-5678",
      message: "Auto-reply: Terima kasih telah menghubungi kami...",
      messageId: "msg_def456",
    },
  },
  {
    id: "wh_003",
    timestamp: "2026-01-04 10:28:33",
    event: "message.received",
    source: "+62 878-1234-5678",
    status: "success",
    responseTime: 156,
    payload: {
      from: "+62 878-1234-5678",
      message: "harga",
      timestamp: "2026-01-04T10:28:33.000Z",
      triggeredAutoReply: true,
    },
  },
  {
    id: "wh_004",
    timestamp: "2026-01-04 10:15:20",
    event: "connection.status",
    source: "WhatsApp",
    status: "success",
    responseTime: 45,
    payload: {
      status: "connected",
      phoneNumber: "+62 812-9876-5432",
      sessionId: "sess_xyz789",
    },
  },
  {
    id: "wh_005",
    timestamp: "2026-01-04 09:45:18",
    event: "broadcast.complete",
    source: "System",
    status: "success",
    responseTime: 2340,
    payload: {
      broadcastId: "bc_001",
      totalSent: 150,
      delivered: 148,
      failed: 2,
    },
  },
  {
    id: "wh_006",
    timestamp: "2026-01-04 09:30:05",
    event: "message.sent",
    source: "System",
    status: "failed",
    responseTime: 5000,
    payload: {
      error: "Connection timeout",
      to: "+62 857-9999-8888",
      retryCount: 3,
    },
  },
  {
    id: "wh_007",
    timestamp: "2026-01-04 09:15:42",
    event: "message.received",
    source: "+62 821-5555-4444",
    status: "success",
    responseTime: 98,
    payload: {
      from: "+62 821-5555-4444",
      message: "Kapan barang sampai ya?",
      timestamp: "2026-01-04T09:15:42.000Z",
    },
  },
  {
    id: "wh_008",
    timestamp: "2026-01-04 08:55:30",
    event: "media.received",
    source: "+62 813-7777-8888",
    status: "pending",
    responseTime: 0,
    payload: {
      from: "+62 813-7777-8888",
      mediaType: "image",
      mediaUrl: "pending_upload",
      caption: "Bukti transfer",
    },
  },
];

const statusConfig = {
  success: {
    label: "Success",
    icon: CheckCircle,
    className: "border-success/30 bg-success/10 text-success",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "border-destructive/30 bg-destructive/10 text-destructive",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "border-warning/30 bg-warning/10 text-warning",
  },
};

const WebhookLogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLog, setSelectedLog] = useState<WebhookLog | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredLogs = logs.filter(
    (log) =>
      log.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.source.includes(searchQuery) ||
      log.id.includes(searchQuery)
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Webhook className="h-7 w-7 text-primary" />
              Webhook Logs
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor incoming webhook events from GoWA
            </p>
          </div>
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={cn("mr-2 h-4 w-4", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Events", value: "1,247", color: "text-foreground" },
            { label: "Success", value: "1,198", color: "text-success" },
            { label: "Failed", value: "12", color: "text-destructive" },
            { label: "Pending", value: "37", color: "text-warning" },
          ].map((stat) => (
            <Card key={stat.label} className="shadow-card">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Logs Table */}
        <Card className="shadow-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg">Event History</CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Event ID</TableHead>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[100px] text-right">Response</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log, index) => {
                    const status = statusConfig[log.status];
                    const StatusIcon = status.icon;
                    return (
                      <TableRow
                        key={log.id}
                        className="animate-fade-in cursor-pointer hover:bg-muted/50"
                        style={{ animationDelay: `${index * 30}ms` }}
                        onClick={() => setSelectedLog(log)}
                      >
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {log.id}
                          </code>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {log.timestamp}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="font-mono text-xs">
                            {log.event}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{log.source}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("gap-1", status.className)}>
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-sm">
                          {log.responseTime > 0 ? `${log.responseTime}ms` : "-"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLog(log);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Payload Dialog */}
        <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <DialogContent className="sm:max-w-[600px] bg-card">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {selectedLog?.id}
                </code>
                <Badge variant="secondary" className="font-mono text-xs">
                  {selectedLog?.event}
                </Badge>
              </DialogTitle>
              <DialogDescription>
                {selectedLog?.timestamp} • Response: {selectedLog?.responseTime}ms
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Payload</p>
              <ScrollArea className="h-[300px]">
                <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto">
                  {JSON.stringify(selectedLog?.payload, null, 2)}
                </pre>
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default WebhookLogs;
