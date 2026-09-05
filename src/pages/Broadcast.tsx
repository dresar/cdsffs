import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio, Send, Users, Clock, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ContactGroup {
  id: string;
  name: string;
  count: number;
}

const contactGroups: ContactGroup[] = [
  { id: "1", name: "VIP Customers", count: 47 },
  { id: "2", name: "Newsletter Subscribers", count: 1250 },
  { id: "3", name: "Recent Buyers", count: 156 },
  { id: "4", name: "Prospects", count: 89 },
  { id: "5", name: "Partners", count: 23 },
];

const Broadcast = () => {
  const [message, setMessage] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const totalRecipients = contactGroups
    .filter((g) => selectedGroups.includes(g.id))
    .reduce((sum, g) => sum + g.count, 0);

  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSend = () => {
    if (!message || selectedGroups.length === 0) {
      toast({
        title: "Missing fields",
        description: "Please select recipients and enter a message.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    setProgress(0);
    setCompleted(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSending(false);
          setCompleted(true);
          toast({
            title: "Broadcast complete",
            description: `Successfully sent to ${totalRecipients} recipients`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleReset = () => {
    setMessage("");
    setSelectedGroups([]);
    setProgress(0);
    setCompleted(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Radio className="h-7 w-7 text-primary" />
            Broadcast Message
          </h1>
          <p className="text-muted-foreground mt-1">
            Send bulk messages to multiple contact groups
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Message Card */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Compose Broadcast</CardTitle>
                <CardDescription>
                  Write your message to be sent to all selected groups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="broadcast-message">Message</Label>
                  <Textarea
                    id="broadcast-message"
                    placeholder="Type your broadcast message here..."
                    rows={8}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSending}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Supports emojis and line breaks</span>
                    <span>{message.length} characters</span>
                  </div>
                </div>

                {/* Progress */}
                {(isSending || completed) && (
                  <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {completed ? "Broadcast Complete" : "Sending..."}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((progress / 100) * totalRecipients)} / {totalRecipients}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    {completed && (
                      <div className="flex items-center gap-2 text-success mt-2">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">
                          All messages delivered successfully
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  {completed ? (
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={handleReset}
                    >
                      New Broadcast
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="flex-1 gradient-primary"
                      onClick={handleSend}
                      disabled={isSending || !message || selectedGroups.length === 0}
                    >
                      <Send className="mr-2 h-5 w-5" />
                      {isSending ? "Sending..." : `Send to ${totalRecipients} recipients`}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recipients Sidebar */}
          <div className="space-y-6">
            {/* Groups Selection */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Select Recipients
                </CardTitle>
                <CardDescription>
                  Choose contact groups to receive this broadcast
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {contactGroups.map((group) => (
                  <label
                    key={group.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedGroups.includes(group.id)}
                        onCheckedChange={() => handleGroupToggle(group.id)}
                        disabled={isSending}
                      />
                      <span className="font-medium text-foreground">
                        {group.name}
                      </span>
                    </div>
                    <Badge variant="secondary">{group.count}</Badge>
                  </label>
                ))}
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Broadcast Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Groups selected</span>
                  <span className="font-medium">{selectedGroups.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total recipients</span>
                  <span className="font-medium">{totalRecipients}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Est. duration</span>
                  <span className="font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    ~{Math.ceil(totalRecipients / 50)} min
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Broadcast;
