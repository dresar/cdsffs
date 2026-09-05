import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Bot, Radio, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "message" | "auto-reply" | "broadcast" | "error";
  title: string;
  description: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "message",
    title: "New message received",
    description: "From +62 812-3456-7890",
    time: "2 min ago",
  },
  {
    id: "2",
    type: "auto-reply",
    title: "Auto-reply sent",
    description: 'Keyword: "harga" triggered',
    time: "5 min ago",
  },
  {
    id: "3",
    type: "broadcast",
    title: "Broadcast completed",
    description: "150 messages delivered",
    time: "15 min ago",
  },
  {
    id: "4",
    type: "message",
    title: "New message received",
    description: "From +62 878-1234-5678",
    time: "22 min ago",
  },
  {
    id: "5",
    type: "auto-reply",
    title: "Auto-reply sent",
    description: 'Keyword: "promo" triggered',
    time: "35 min ago",
  },
  {
    id: "6",
    type: "error",
    title: "Message failed",
    description: "Number blocked: +62 857-9999-8888",
    time: "1 hour ago",
  },
];

const iconMap = {
  message: MessageSquare,
  "auto-reply": Bot,
  broadcast: Radio,
  error: AlertCircle,
};

const colorMap = {
  message: "bg-primary/10 text-primary",
  "auto-reply": "bg-secondary/10 text-secondary",
  broadcast: "bg-warning/10 text-warning",
  error: "bg-destructive/10 text-destructive",
};

export function RecentActivity() {
  return (
    <Card className="shadow-card h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <Badge variant="secondary" className="text-xs">Live</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[340px] px-6">
          <div className="space-y-4 pb-4">
            {activities.map((activity, index) => {
              const Icon = iconMap[activity.type];
              return (
                <div
                  key={activity.id}
                  className={cn(
                    "flex items-start gap-3 animate-fade-in",
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={cn("p-2 rounded-lg", colorMap[activity.type])}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
