import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Smartphone, QrCode, RefreshCw, Power } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionCardProps {
  isConnected?: boolean;
  phoneNumber?: string;
  profileName?: string;
}

export function ConnectionCard({
  isConnected = true,
  phoneNumber = "+62 812-9876-5432",
  profileName = "GoWA Business",
}: ConnectionCardProps) {
  const [connected, setConnected] = useState(isConnected);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleConnection = () => {
    setIsLoading(true);
    setTimeout(() => {
      setConnected(!connected);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            WhatsApp Session
          </CardTitle>
          <Badge
            variant="outline"
            className={cn(
              "gap-1.5",
              connected
                ? "border-success/30 bg-success/10 text-success"
                : "border-destructive/30 bg-destructive/10 text-destructive"
            )}
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                connected ? "bg-success animate-pulse" : "bg-destructive"
              )}
            />
            {connected ? "Online" : "Offline"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {connected ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
                  GB
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{profileName}</p>
                <p className="text-sm text-muted-foreground">{phoneNumber}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Connected since Jan 4, 2026 • 08:30 WIB
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleToggleConnection}
                disabled={isLoading}
              >
                <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
                Refresh
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleToggleConnection}
                disabled={isLoading}
              >
                <Power className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-xl border-2 border-dashed border-border">
              <div className="w-48 h-48 bg-card rounded-xl shadow-elevated flex items-center justify-center mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <QrCode className="h-32 w-32 text-foreground/80" />
              </div>
              <p className="text-sm font-medium text-foreground">Scan to Connect</p>
              <p className="text-xs text-muted-foreground text-center mt-1">
                Open WhatsApp on your phone → Settings → Linked Devices
              </p>
            </div>
            <Button
              className="w-full gradient-primary"
              onClick={handleToggleConnection}
              disabled={isLoading}
            >
              <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
              {isLoading ? "Connecting..." : "Generate New QR Code"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
