import { Route, Switch, useLocation } from "wouter";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import PageTransition from "@/components/PageTransition";
import QuickTips from "@/components/QuickTips";
import FeedbackContainer from "@/components/FeedbackSystem";
import { useEffect } from "react";
import { feedback } from "@/components/FeedbackSystem";

function Router() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Show a welcome feedback message when the app loads
    feedback.info("Welcome to the Project Separation Guide!");
  }, []);
  
  return (
    <PageTransition location={location}>
      <Switch>
        <Route path="/" component={Home} />
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
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;