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
    console.log("Window location:", window.location.href);
    console.log("Rendering component for path:", path);
    
    // Update path when the URL changes
    const handleUrlChange = () => {
      const newPath = getCurrentPath();
      console.log("URL changed, new path:", newPath);
      setPath(newPath);
    };
    
    window.addEventListener('popstate', handleUrlChange);
    
    // Force an immediate path check
    handleUrlChange();
    
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);
  
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

function NavigationBar() {
  const [currentPath, setCurrentPath] = useState('');
  
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  
  return (
    <div style={{
      background: 'linear-gradient(to right, #2563eb, #4f46e5)',
      color: 'white',
      padding: '15px 0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: '100%',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '80rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}>
        <div style={{
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: '10px'
        }}>
          Node12.com Project Separation
        </div>
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {[
            { text: 'Home', url: '/' },
            { text: 'SSL', url: '/ssl' },
            { text: 'Analytics', url: '/analytics' },
            { text: 'Design System', url: '/design-system' },
            { text: 'Admin', url: '/admin' },
            { text: 'Bookmark Converter', url: 'https://bookmarkconverter.replit.app', external: true }
          ].map(link => (
            <a 
              key={link.url}
              href={link.url}
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '5px 15px',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'background-color 0.2s',
                backgroundColor: currentPath === link.url ? 'rgba(255, 255, 255, 0.2)' : undefined,
                fontWeight: currentPath === link.url ? 'bold' : undefined
              }}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <NavigationBar />
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