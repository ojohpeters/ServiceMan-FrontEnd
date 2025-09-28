import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";

// Context
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Layout
import Layout from "@/components/layout/Layout";

// Pages
import Landing from "@/components/Landing";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import NotFound from "@/pages/not-found";

// Import queryClient
import { queryClient } from "./lib/queryClient";

function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Layout user={user}>
      <Switch>
        {/* Landing page */}
        <Route path="/" component={Landing} />
        
        {/* Authentication routes */}
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        
        {/* Browse servicemen */}
        <Route path="/browse" component={() => <div className="p-8 text-center">Browse Servicemen - Coming Soon</div>} />
        <Route path="/hire" component={() => <div className="p-8 text-center">Hire Service - Coming Soon</div>} />
        
        {/* Client routes */}
        <Route path="/client/dashboard" component={() => <div className="p-8 text-center">Client Dashboard - Coming Soon</div>} />
        
        {/* Serviceman routes */}
        <Route path="/serviceman/dashboard" component={() => <div className="p-8 text-center">Serviceman Dashboard - Coming Soon</div>} />
        
        {/* Admin routes */}
        <Route path="/admin/dashboard" component={() => <div className="p-8 text-center">Admin Dashboard - Coming Soon</div>} />
        
        {/* Static pages */}
        <Route path="/categories" component={() => <div className="p-8 text-center">Categories Page - Coming Soon</div>} />
        <Route path="/how-it-works" component={() => <div className="p-8 text-center">How It Works - Coming Soon</div>} />
        <Route path="/pricing" component={() => <div className="p-8 text-center">Pricing - Coming Soon</div>} />
        <Route path="/safety" component={() => <div className="p-8 text-center">Safety & Trust - Coming Soon</div>} />
        <Route path="/help" component={() => <div className="p-8 text-center">Help Center - Coming Soon</div>} />
        <Route path="/contact" component={() => <div className="p-8 text-center">Contact Us - Coming Soon</div>} />
        <Route path="/terms" component={() => <div className="p-8 text-center">Terms of Service - Coming Soon</div>} />
        <Route path="/privacy" component={() => <div className="p-8 text-center">Privacy Policy - Coming Soon</div>} />
        
        {/* 404 fallback */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Router />
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}