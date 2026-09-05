import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Bot, Plus, Pencil, Trash2, Search } from "lucide-react";

interface AutoReplyRule {
  id: string;
  keyword: string;
  response: string;
  matchType: "exact" | "contains";
  active: boolean;
  triggerCount: number;
}

const initialRules: AutoReplyRule[] = [
  {
    id: "1",
    keyword: "harga",
    response: "Terima kasih telah menghubungi kami! Untuk daftar harga terbaru, silakan kunjungi website kami di www.example.com/harga atau ketik KATALOG untuk menerima PDF katalog produk.",
    matchType: "contains",
    active: true,
    triggerCount: 847,
  },
  {
    id: "2",
    keyword: "promo",
    response: "Halo! Saat ini kami sedang ada promo menarik:\n🔥 Diskon 20% untuk semua produk\n🎁 Gratis ongkir min. pembelian 200rb\n📅 Berlaku s/d 31 Januari 2026",
    matchType: "contains",
    active: true,
    triggerCount: 523,
  },
  {
    id: "3",
    keyword: "jam buka",
    response: "Jam operasional kami:\n🕘 Senin-Jumat: 09:00 - 18:00 WIB\n🕙 Sabtu: 09:00 - 15:00 WIB\n❌ Minggu & Libur Nasional: Tutup",
    matchType: "exact",
    active: true,
    triggerCount: 312,
  },
  {
    id: "4",
    keyword: "lokasi",
    response: "Alamat toko kami:\n📍 Jl. Sudirman No. 123, Jakarta Pusat\n📞 021-12345678\n\nGoogle Maps: https://maps.google.com/example",
    matchType: "contains",
    active: false,
    triggerCount: 189,
  },
  {
    id: "5",
    keyword: "KATALOG",
    response: "[Mengirim dokumen katalog...]",
    matchType: "exact",
    active: true,
    triggerCount: 421,
  },
];

const AutoReply = () => {
  const [rules, setRules] = useState<AutoReplyRule[]>(initialRules);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<AutoReplyRule | null>(null);
  const [formData, setFormData] = useState({
    keyword: "",
    response: "",
    matchType: "contains" as "exact" | "contains",
  });

  const filteredRules = rules.filter(
    (rule) =>
      rule.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.response.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleActive = (id: string) => {
    setRules(
      rules.map((rule) =>
        rule.id === id ? { ...rule, active: !rule.active } : rule
      )
    );
  };

  const handleDelete = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  const handleEdit = (rule: AutoReplyRule) => {
    setEditingRule(rule);
    setFormData({
      keyword: rule.keyword,
      response: rule.response,
      matchType: rule.matchType,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingRule) {
      setRules(
        rules.map((rule) =>
          rule.id === editingRule.id
            ? { ...rule, ...formData }
            : rule
        )
      );
    } else {
      const newRule: AutoReplyRule = {
        id: Date.now().toString(),
        ...formData,
        active: true,
        triggerCount: 0,
      };
      setRules([...rules, newRule]);
    }
    setIsDialogOpen(false);
    setEditingRule(null);
    setFormData({ keyword: "", response: "", matchType: "contains" });
  };

  const handleOpenDialog = () => {
    setEditingRule(null);
    setFormData({ keyword: "", response: "", matchType: "contains" });
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Bot className="h-7 w-7 text-primary" />
              Auto Reply Rules
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage automatic responses based on keywords
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary" onClick={handleOpenDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-card">
              <DialogHeader>
                <DialogTitle>
                  {editingRule ? "Edit Auto Reply Rule" : "Create New Rule"}
                </DialogTitle>
                <DialogDescription>
                  Configure keyword triggers and automatic responses
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="keyword">Keyword</Label>
                  <Input
                    id="keyword"
                    placeholder="Enter trigger keyword..."
                    value={formData.keyword}
                    onChange={(e) =>
                      setFormData({ ...formData, keyword: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matchType">Match Type</Label>
                  <Select
                    value={formData.matchType}
                    onValueChange={(value: "exact" | "contains") =>
                      setFormData({ ...formData, matchType: value })
                    }
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select match type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      <SelectItem value="exact">Exact Match</SelectItem>
                      <SelectItem value="contains">Contains Keyword</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="response">Response Message</Label>
                  <Textarea
                    id="response"
                    placeholder="Enter auto-reply message..."
                    rows={5}
                    value={formData.response}
                    onChange={(e) =>
                      setFormData({ ...formData, response: e.target.value })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="gradient-primary">
                  {editingRule ? "Save Changes" : "Create Rule"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Rules Table */}
        <Card className="shadow-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg">
                All Rules ({rules.length})
              </CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search keywords..."
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
                    <TableHead className="w-[180px]">Keyword</TableHead>
                    <TableHead>Response</TableHead>
                    <TableHead className="w-[120px]">Match Type</TableHead>
                    <TableHead className="w-[100px] text-center">Triggers</TableHead>
                    <TableHead className="w-[80px] text-center">Active</TableHead>
                    <TableHead className="w-[100px] text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRules.map((rule, index) => (
                    <TableRow
                      key={rule.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell>
                        <Badge variant="secondary" className="font-mono">
                          {rule.keyword}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground line-clamp-2 max-w-md">
                          {rule.response}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            rule.matchType === "exact"
                              ? "border-primary/30 bg-primary/10 text-primary"
                              : "border-secondary/30 bg-secondary/10 text-secondary"
                          }
                        >
                          {rule.matchType === "exact" ? "Exact" : "Contains"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium">
                          {rule.triggerCount.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={rule.active}
                          onCheckedChange={() => handleToggleActive(rule.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEdit(rule)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(rule.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AutoReply;
