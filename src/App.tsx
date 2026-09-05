import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Compose from "./pages/Compose";
import Inbox from "./pages/Inbox";
import Broadcast from "./pages/Broadcast";
import AutoReply from "./pages/AutoReply";
import WebhookLogs from "./pages/WebhookLogs";
import Contacts from "./pages/Contacts";
import MediaLibrary from "./pages/MediaLibrary";
import DeviceStatus from "./pages/DeviceStatus";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/broadcast" element={<Broadcast />} />
          <Route path="/auto-reply" element={<AutoReply />} />
          <Route path="/webhook-logs" element={<WebhookLogs />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/media" element={<MediaLibrary />} />
          <Route path="/device-status" element={<DeviceStatus />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
