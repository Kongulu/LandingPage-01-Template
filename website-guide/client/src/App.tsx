import { Route, Switch, useLocation } from "wouter";
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
import { useEffect } from "react";
import { feedback } from "@/components/FeedbackSystem";

function Router() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Show a welcome feedback message when the app loads
    feedback.info("Welcome to the Project Separation Guide!");
    
    // Log current path for debugging
    console.log("Current path:", location);
  }, [location]);
  
  return (
    <PageTransition location={location}>
      <Switch>
        {/* Routes are now relative to the base path set in main.tsx */}
        <Route path="/" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/design-system" component={DesignSystemPage} />
        <Route path="/ssl" component={SSLPage} />
        <Route path="/test" component={TestPage} />
        {/* Catch-all route must be last */}
        <Route component={NotFound} />
      </Switch>
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