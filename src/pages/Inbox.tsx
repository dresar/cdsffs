import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Paperclip, MoreVertical, Phone, Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOutgoing: boolean;
  status: "sent" | "delivered" | "read";
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Budi Santoso",
    phone: "+62 812-3456-7890",
    lastMessage: "Baik pak, saya tunggu konfirmasinya",
    timestamp: "10:32",
    unread: 2,
    isOnline: true,
  },
  {
    id: "2",
    name: "Dewi Lestari",
    phone: "+62 878-1234-5678",
    lastMessage: "Harga untuk paket A berapa ya?",
    timestamp: "09:45",
    unread: 0,
    isOnline: true,
  },
  {
    id: "3",
    name: "Ahmad Wijaya",
    phone: "+62 857-9876-5432",
    lastMessage: "Terima kasih informasinya",
    timestamp: "Yesterday",
    unread: 0,
    isOnline: false,
  },
  {
    id: "4",
    name: "Siti Rahayu",
    phone: "+62 821-5555-4444",
    lastMessage: "Kapan barang sampai ya?",
    timestamp: "Yesterday",
    unread: 1,
    isOnline: false,
  },
  {
    id: "5",
    name: "Rudi Hermawan",
    phone: "+62 813-7777-8888",
    lastMessage: "Oke siap, besok saya transfer",
    timestamp: "Jan 2",
    unread: 0,
    isOnline: true,
  },
];

const messages: Message[] = [
  {
    id: "1",
    text: "Halo, saya mau tanya tentang produk",
    timestamp: "09:30",
    isOutgoing: false,
    status: "read",
  },
  {
    id: "2",
    text: "Selamat pagi! Silakan, produk apa yang ingin ditanyakan?",
    timestamp: "09:31",
    isOutgoing: true,
    status: "read",
  },
  {
    id: "3",
    text: "Untuk paket premium, apakah tersedia cicilan?",
    timestamp: "09:33",
    isOutgoing: false,
    status: "read",
  },
  {
    id: "4",
    text: "Iya tersedia pak. Kami bekerja sama dengan beberapa bank untuk cicilan 0% sampai 12 bulan",
    timestamp: "09:35",
    isOutgoing: true,
    status: "read",
  },
  {
    id: "5",
    text: "Wah menarik! Syaratnya apa saja ya?",
    timestamp: "10:15",
    isOutgoing: false,
    status: "read",
  },
  {
    id: "6",
    text: "Syaratnya cukup mudah pak:\n1. KTP\n2. Kartu kredit bank partner\n3. Min. limit 2x harga barang\n\nApakah berminat untuk melanjutkan?",
    timestamp: "10:20",
    isOutgoing: true,
    status: "delivered",
  },
  {
    id: "7",
    text: "Baik pak, saya tunggu konfirmasinya",
    timestamp: "10:32",
    isOutgoing: false,
    status: "read",
  },
];

const Inbox = () => {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
  );

  const handleSend = () => {
    if (newMessage.trim()) {
      setNewMessage("");
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)]">
        <Card className="shadow-card h-full overflow-hidden">
          <div className="flex h-full">
            {/* Contacts List */}
            <div className="w-80 border-r border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search contacts..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={cn(
                      "flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-border/50",
                      selectedContact.id === contact.id
                        ? "bg-sidebar-accent"
                        : "hover:bg-muted/50"
                    )}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {contact.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      {contact.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground truncate">
                          {contact.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {contact.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.lastMessage}
                        </p>
                        {contact.unread > 0 && (
                          <Badge className="bg-primary text-primary-foreground h-5 min-w-5 flex items-center justify-center">
                            {contact.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="h-16 px-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {selectedContact.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">
                      {selectedContact.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedContact.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.isOutgoing ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[70%] rounded-2xl px-4 py-2.5",
                          message.isOutgoing
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        )}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <div
                          className={cn(
                            "flex items-center justify-end gap-1 mt-1",
                            message.isOutgoing
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          )}
                        >
                          <span className="text-xs">{message.timestamp}</span>
                          {message.isOutgoing && (
                            message.status === "read" ? (
                              <CheckCheck className="h-4 w-4" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    className="flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button
                    className="gradient-primary"
                    size="icon"
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Inbox;
