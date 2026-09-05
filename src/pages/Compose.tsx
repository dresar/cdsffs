import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Image, FileText, Smile, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Compose = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    if (!phoneNumber || !message) {
      toast({
        title: "Missing fields",
        description: "Please enter a phone number and message.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Message sent",
        description: `Your message has been sent to ${phoneNumber}`,
      });
      setPhoneNumber("");
      setMessage("");
      setAttachments([]);
    }, 1500);
  };

  const addAttachment = (type: string) => {
    setAttachments([...attachments, `${type}_${Date.now()}`]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MessageSquare className="h-7 w-7 text-primary" />
            Compose Message
          </h1>
          <p className="text-muted-foreground mt-1">
            Send a manual message to a WhatsApp number
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">New Message</CardTitle>
            <CardDescription>
              Enter the recipient's number and your message below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+62 812-3456-7890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Include country code (e.g., +62 for Indonesia)
              </p>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => addAttachment("image")}
                  >
                    <Image className="h-4 w-4 mr-1" />
                    Image
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => addAttachment("document")}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Document
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground">
                  {message.length} characters
                </span>
              </div>
            </div>

            {/* Attachments Preview */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                <Label>Attachments</Label>
                <div className="flex flex-wrap gap-2">
                  {attachments.map((attachment, index) => (
                    <Badge
                      key={attachment}
                      variant="secondary"
                      className="gap-1 pr-1"
                    >
                      {attachment.startsWith("image") ? (
                        <Image className="h-3 w-3" />
                      ) : (
                        <FileText className="h-3 w-3" />
                      )}
                      {attachment.startsWith("image") ? "Image" : "Document"}_{index + 1}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Send Button */}
            <Button
              size="lg"
              className="w-full gradient-primary"
              onClick={handleSend}
              disabled={isSending || !phoneNumber || !message}
            >
              <Send className={cn("mr-2 h-5 w-5", isSending && "animate-pulse")} />
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Templates */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Quick Templates</CardTitle>
            <CardDescription>
              Click to use a pre-made template
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: "Welcome",
                  preview: "Selamat datang! Terima kasih telah...",
                  message: "Selamat datang! Terima kasih telah menghubungi kami. Ada yang bisa kami bantu?",
                },
                {
                  title: "Order Confirmation",
                  preview: "Pesanan Anda telah kami terima...",
                  message: "Pesanan Anda telah kami terima dan sedang diproses. Nomor order: #ORDER_ID. Estimasi pengiriman 2-3 hari kerja.",
                },
                {
                  title: "Payment Reminder",
                  preview: "Hai! Ini pengingat untuk...",
                  message: "Hai! Ini pengingat untuk pembayaran Anda yang tertunda. Silakan selesaikan pembayaran untuk melanjutkan pesanan.",
                },
                {
                  title: "Thank You",
                  preview: "Terima kasih telah berbelanja...",
                  message: "Terima kasih telah berbelanja dengan kami! Semoga Anda puas dengan produk kami. Jangan ragu untuk menghubungi jika ada pertanyaan.",
                },
              ].map((template) => (
                <button
                  key={template.title}
                  className="p-4 text-left border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  onClick={() => setMessage(template.message)}
                >
                  <p className="font-medium text-foreground">{template.title}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {template.preview}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Compose;
