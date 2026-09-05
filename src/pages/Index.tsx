import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ConnectionCard } from "@/components/dashboard/ConnectionCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { MessageSquare, Inbox, Bot, Smartphone } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your WhatsApp Gateway performance and activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Sent"
            value="12,847"
            subtitle="Last 30 days"
            icon={MessageSquare}
            trend={{ value: 12.5, isPositive: true }}
            variant="primary"
          />
          <StatsCard
            title="Total Received"
            value="8,392"
            subtitle="Last 30 days"
            icon={Inbox}
            trend={{ value: 8.2, isPositive: true }}
            variant="success"
          />
          <StatsCard
            title="Auto-Replies"
            value="3,156"
            subtitle="Last 30 days"
            icon={Bot}
            trend={{ value: 23.1, isPositive: true }}
            variant="warning"
          />
          <StatsCard
            title="Device Status"
            value="Online"
            subtitle="Connected 12h ago"
            icon={Smartphone}
            variant="default"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ConnectionCard isConnected={true} />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
