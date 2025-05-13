import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

// Types for analytics events
type AnalyticsEventType = 
  | 'pageview' 
  | 'click' 
  | 'conversion' 
  | 'navigation' 
  | 'cross_project';

interface AnalyticsEvent {
  type: AnalyticsEventType;
  timestamp: number;
  data: Record<string, any>;
}

// Mock analytics service
class AnalyticsService {
  private static instance: AnalyticsService;
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  private userId: string | null = null;
  
  private constructor() {
    this.sessionId = `session_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    // Try to get stored user ID or create a new one
    const storedUserId = localStorage.getItem('analytics_user_id');
    if (storedUserId) {
      this.userId = storedUserId;
    } else {
      this.userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      localStorage.setItem('analytics_user_id', this.userId);
    }
  }
  
  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }
  
  public trackEvent(type: AnalyticsEventType, data: Record<string, any>): void {
    const event: AnalyticsEvent = {
      type,
      timestamp: Date.now(),
      data: {
        ...data,
        sessionId: this.sessionId,
        userId: this.userId,
      }
    };
    
    this.events.push(event);
    
    // In a real implementation, we would send this to a backend
    console.log('Analytics event tracked:', event);
    
    // For cross-project events, store in localStorage to share between projects
    if (type === 'cross_project') {
      this.storeCrossProjectEvent(event);
    }
  }
  
  public trackPageView(path: string, title: string): void {
    this.trackEvent('pageview', { path, title });
  }
  
  public trackClick(elementId: string, elementText: string, destination?: string): void {
    this.trackEvent('click', { elementId, elementText, destination });
  }
  
  public trackCrossProjectNavigation(fromProject: string, toProject: string, context: string): void {
    this.trackEvent('cross_project', { fromProject, toProject, context });
  }
  
  private storeCrossProjectEvent(event: AnalyticsEvent): void {
    // Get existing cross-project events
    const storedEvents = localStorage.getItem('cross_project_events');
    let events: AnalyticsEvent[] = [];
    
    if (storedEvents) {
      try {
        events = JSON.parse(storedEvents);
      } catch (e) {
        console.error('Error parsing stored cross-project events', e);
      }
    }
    
    // Add new event and keep only last 20
    events.push(event);
    if (events.length > 20) {
      events = events.slice(events.length - 20);
    }
    
    // Store back to localStorage
    localStorage.setItem('cross_project_events', JSON.stringify(events));
  }
  
  public getCrossProjectEvents(): AnalyticsEvent[] {
    const storedEvents = localStorage.getItem('cross_project_events');
    if (storedEvents) {
      try {
        return JSON.parse(storedEvents);
      } catch (e) {
        console.error('Error parsing stored cross-project events', e);
      }
    }
    return [];
  }
}

// React hook to use analytics
export function useAnalytics() {
  const analyticsService = AnalyticsService.getInstance();
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  
  useEffect(() => {
    // Get cross-project events when component mounts
    setEvents(analyticsService.getCrossProjectEvents());
    
    // Set up interval to refresh events periodically
    const interval = setInterval(() => {
      setEvents(analyticsService.getCrossProjectEvents());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return {
    trackPageView: analyticsService.trackPageView.bind(analyticsService),
    trackClick: analyticsService.trackClick.bind(analyticsService),
    trackCrossProjectNavigation: analyticsService.trackCrossProjectNavigation.bind(analyticsService),
    crossProjectEvents: events
  };
}

// Analytics Tracker component to automatically track page views
export default function AnalyticsTracker() {
  const [location] = useLocation();
  const { trackPageView } = useAnalytics();
  
  useEffect(() => {
    // Track page view when location changes
    trackPageView(location, document.title);
  }, [location, trackPageView]);
  
  return null; // This component doesn't render anything
}