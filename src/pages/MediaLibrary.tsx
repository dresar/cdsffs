import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Image, Search, Upload, FileText, Film, Music, Trash2, Download, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaItem {
  id: string;
  name: string;
  type: "image" | "document" | "video" | "audio";
  size: string;
  uploadedAt: string;
  url: string;
}

const mediaItems: MediaItem[] = [
  {
    id: "1",
    name: "katalog-produk-2026.pdf",
    type: "document",
    size: "2.4 MB",
    uploadedAt: "2026-01-04",
    url: "#",
  },
  {
    id: "2",
    name: "promo-banner-januari.jpg",
    type: "image",
    size: "450 KB",
    uploadedAt: "2026-01-03",
    url: "#",
  },
  {
    id: "3",
    name: "product-demo.mp4",
    type: "video",
    size: "15.8 MB",
    uploadedAt: "2026-01-02",
    url: "#",
  },
  {
    id: "4",
    name: "logo-company.png",
    type: "image",
    size: "120 KB",
    uploadedAt: "2025-12-28",
    url: "#",
  },
  {
    id: "5",
    name: "price-list-q1.pdf",
    type: "document",
    size: "890 KB",
    uploadedAt: "2025-12-25",
    url: "#",
  },
  {
    id: "6",
    name: "greeting-audio.mp3",
    type: "audio",
    size: "1.2 MB",
    uploadedAt: "2025-12-20",
    url: "#",
  },
  {
    id: "7",
    name: "product-photo-1.jpg",
    type: "image",
    size: "380 KB",
    uploadedAt: "2025-12-18",
    url: "#",
  },
  {
    id: "8",
    name: "product-photo-2.jpg",
    type: "image",
    size: "420 KB",
    uploadedAt: "2025-12-18",
    url: "#",
  },
];

const typeConfig = {
  image: { icon: Image, color: "text-primary", bg: "bg-primary/10" },
  document: { icon: FileText, color: "text-warning", bg: "bg-warning/10" },
  video: { icon: Film, color: "text-destructive", bg: "bg-destructive/10" },
  audio: { icon: Music, color: "text-secondary", bg: "bg-secondary/10" },
};

const MediaLibrary = () => {
  const [items, setItems] = useState<MediaItem[]>(mediaItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    setSelectedItem(null);
  };

  const totalSize = items.reduce((sum, item) => {
    const size = parseFloat(item.size);
    const unit = item.size.includes("MB") ? 1024 : 1;
    return sum + size * unit;
  }, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Image className="h-7 w-7 text-primary" />
              Media Library
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your uploaded files and media
            </p>
          </div>
          <Button className="gradient-primary">
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Files</p>
              <p className="text-2xl font-bold text-foreground">{items.length}</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Images</p>
              <p className="text-2xl font-bold text-primary">
                {items.filter((i) => i.type === "image").length}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Documents</p>
              <p className="text-2xl font-bold text-warning">
                {items.filter((i) => i.type === "document").length}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Storage Used</p>
              <p className="text-2xl font-bold text-foreground">
                {(totalSize / 1024).toFixed(1)} MB
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="shadow-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {["all", "image", "document", "video", "audio"].map((type) => (
                  <Button
                    key={type}
                    variant={filterType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType(type)}
                    className={filterType === type ? "gradient-primary" : ""}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Grid View */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredItems.map((item, index) => {
                const config = typeConfig[item.type];
                const Icon = config.icon;

                return (
                  <div
                    key={item.id}
                    className="group relative p-4 border border-border rounded-xl hover:border-primary/50 hover:shadow-card-hover cursor-pointer transition-all animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div
                      className={cn(
                        "w-full aspect-square rounded-lg flex items-center justify-center mb-3",
                        config.bg
                      )}
                    >
                      <Icon className={cn("h-10 w-10", config.color)} />
                    </div>
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.size}
                    </p>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 bg-card shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Preview Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="sm:max-w-[500px] bg-card">
            <DialogHeader>
              <DialogTitle>{selectedItem?.name}</DialogTitle>
              <DialogDescription>
                Uploaded on {selectedItem?.uploadedAt}
              </DialogDescription>
            </DialogHeader>
            {selectedItem && (
              <div className="space-y-4">
                <div
                  className={cn(
                    "w-full h-48 rounded-lg flex items-center justify-center",
                    typeConfig[selectedItem.type].bg
                  )}
                >
                  {(() => {
                    const Icon = typeConfig[selectedItem.type].icon;
                    return (
                      <Icon
                        className={cn(
                          "h-20 w-20",
                          typeConfig[selectedItem.type].color
                        )}
                      />
                    );
                  })()}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <Badge variant="secondary" className="mt-1">
                      {selectedItem.type}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Size</p>
                    <p className="font-medium mt-1">{selectedItem.size}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    className="flex-1"
                    variant="destructive"
                    onClick={() => handleDelete(selectedItem.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default MediaLibrary;
