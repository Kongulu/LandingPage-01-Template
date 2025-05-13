import { useEffect, useState } from "react";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import Analytics from "@/pages/Analytics";
import DesignSystemPage from "@/pages/DesignSystemPage";
import SSLPage from "@/pages/SSLPage";
import TestPage from "@/pages/TestPage";
import NotFound from "@/pages/not-found";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import PageTransition from "@/components/PageTransition";
import QuickTips from "@/components/QuickTips";
import FeedbackContainer from "@/components/FeedbackSystem";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { feedback } from "@/components/FeedbackSystem";
// Navigation is now handled by the Header component

function getCurrentPath() {
  // Get the pathname from the current URL
  const pathname = window.location.pathname;
  
  // Remove trailing slash if present
  return pathname.endsWith('/') && pathname.length > 1 
    ? pathname.slice(0, -1) 
    : pathname;
}

function Router() {
  const [path, setPath] = useState(getCurrentPath());
  
  useEffect(() => {
    // Show a welcome feedback message when the app loads
    feedback.info("Welcome to the Project Separation Guide!");
    
    // Log current path for debugging
    console.log("Current path:", path);
    
    // Update path when the URL changes
    const handleUrlChange = () => {
      setPath(getCurrentPath());
    };
    
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [path]);
  
  // Render the appropriate component based on the current path
  return (
    <PageTransition location={path}>
      {path === '/' && <Home />}
      {path === '/admin' && <Admin />}
      {path === '/analytics' && <Analytics />}
      {path === '/design-system' && <DesignSystemPage />}
      {path === '/ssl' && <SSLPage />}
      {path === '/test' && <TestPage />}
      {!['/admin', '/analytics', '/design-system', '/ssl', '/test', '/'].includes(path) && <NotFound />}
    </PageTransition>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Router />
        <QuickTips />
        <FeedbackContainer position="bottom-right" />
        <AnalyticsTracker />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;