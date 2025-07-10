
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BillPayment from "./pages/BillPayment";
import BillInquiry from "./pages/BillInquiry";
import Complaints from "./pages/Complaints";
import LoadShedding from "./pages/LoadShedding";
import OfficeLocator from "./pages/OfficeLocator";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import NewConnection from "./pages/NewConnection";
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
          <Route path="/bill-payment" element={<BillPayment />} />
          <Route path="/bill-inquiry" element={<BillInquiry />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/load-shedding" element={<LoadShedding />} />
          <Route path="/office-locator" element={<OfficeLocator />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-connection" element={<NewConnection />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;