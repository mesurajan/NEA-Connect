
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
import Support from "./pages/Support";
import Login from './pages/Login';
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./pages/Logout";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* 🔥 Fix: Correct base route path */}
          <Route path="/" element={
            <ProtectedRoute><Index /></ProtectedRoute>
          } />

          {/* 🔐 Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          {/* 🔐 Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/new-connection" element={
            <ProtectedRoute><NewConnection /></ProtectedRoute>
          } />
          <Route path="/bill-payment" element={
            <ProtectedRoute><BillPayment /></ProtectedRoute>
          } />
          <Route path="/bill-inquiry" element={
            <ProtectedRoute><BillInquiry /></ProtectedRoute>
          } />
          <Route path="/complaints" element={
            <ProtectedRoute><Complaints /></ProtectedRoute>
          } />
          <Route path="/load-shedding" element={
            <ProtectedRoute><LoadShedding /></ProtectedRoute>
          } />
          <Route path="/office-locator" element={
            <ProtectedRoute><OfficeLocator /></ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute><Contact /></ProtectedRoute>
          } />
          <Route path="/support" element={
            <ProtectedRoute><Support /></ProtectedRoute>
          } />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
