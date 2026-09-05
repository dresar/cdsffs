import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Inbox,
  Radio,
  Bot,
  Webhook,
  Users,
  Image,
  Smartphone,
  Settings,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navigationGroups: NavGroup[] = [
  {
    label: "Dashboard",
    items: [
      { title: "Overview", href: "/", icon: LayoutDashboard },
    ],
  },
  {
    label: "Messaging",
    items: [
      { title: "Compose Message", href: "/compose", icon: MessageSquare },
      { title: "Inbox", href: "/inbox", icon: Inbox },
      { title: "Broadcast", href: "/broadcast", icon: Radio },
    ],
  },
  {
    label: "Automation",
    items: [
      { title: "Auto Reply", href: "/auto-reply", icon: Bot },
      { title: "Webhook Logs", href: "/webhook-logs", icon: Webhook },
    ],
  },
  {
    label: "Contacts & Media",
    items: [
      { title: "Contact Groups", href: "/contacts", icon: Users },
      { title: "Media Library", href: "/media", icon: Image },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Device Status", href: "/device-status", icon: Smartphone },
      { title: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-slide-in">
              <h1 className="font-semibold text-foreground text-sm">GoWA Gateway</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navigationGroups.map((group, groupIndex) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <h2 className="px-4 mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {group.label}
              </h2>
            )}
            {collapsed && groupIndex > 0 && (
              <Separator className="mx-3 my-2" />
            )}
            <ul className="space-y-1 px-2">
              {group.items.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
                        collapsed && "justify-center px-2"
                      )}
                      title={collapsed ? item.title : undefined}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0",
                          isActive && "text-primary"
                        )}
                      />
                      {!collapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="p-3 bg-sidebar-accent rounded-lg">
            <p className="text-xs text-sidebar-accent-foreground font-medium">GoWA v1.2.0</p>
            <p className="text-xs text-muted-foreground mt-0.5">API Connected</p>
          </div>
        </div>
      )}
    </aside>
  );
}
