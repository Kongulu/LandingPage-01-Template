import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Info, AlertCircle } from 'lucide-react';

type FeedbackType = 'success' | 'error' | 'info' | 'warning';
type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface FeedbackMessage {
  id: string;
  type: FeedbackType;
  message: string;
  duration?: number;
}

interface FeedbackContextType {
  messages: FeedbackMessage[];
  showFeedback: (type: FeedbackType, message: string, duration?: number) => void;
  clearFeedback: (id: string) => void;
}

// Global state
let feedbackState: FeedbackMessage[] = [];
let listeners: Array<(messages: FeedbackMessage[]) => void> = [];

// Helper function to generate unique IDs
const generateId = () => `feedback-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// Update state and notify listeners
const updateState = (newState: FeedbackMessage[]) => {
  feedbackState = newState;
  listeners.forEach(listener => listener(feedbackState));
};

// Feedback function to add feedback messages
export const feedback = {
  success: (message: string, duration = 3000) => {
    const id = generateId();
    const newMessage = { id, type: 'success' as FeedbackType, message, duration };
    updateState([...feedbackState, newMessage]);
    
    if (duration > 0) {
      setTimeout(() => {
        updateState(feedbackState.filter(msg => msg.id !== id));
      }, duration);
    }
    
    return id;
  },
  
  error: (message: string, duration = 5000) => {
    const id = generateId();
    const newMessage = { id, type: 'error' as FeedbackType, message, duration };
    updateState([...feedbackState, newMessage]);
    
    if (duration > 0) {
      setTimeout(() => {
        updateState(feedbackState.filter(msg => msg.id !== id));
      }, duration);
    }
    
    return id;
  },
  
  info: (message: string, duration = 4000) => {
    const id = generateId();
    const newMessage = { id, type: 'info' as FeedbackType, message, duration };
    updateState([...feedbackState, newMessage]);
    
    if (duration > 0) {
      setTimeout(() => {
        updateState(feedbackState.filter(msg => msg.id !== id));
      }, duration);
    }
    
    return id;
  },
  
  warning: (message: string, duration = 4500) => {
    const id = generateId();
    const newMessage = { id, type: 'warning' as FeedbackType, message, duration };
    updateState([...feedbackState, newMessage]);
    
    if (duration > 0) {
      setTimeout(() => {
        updateState(feedbackState.filter(msg => msg.id !== id));
      }, duration);
    }
    
    return id;
  },
  
  clear: (id: string) => {
    updateState(feedbackState.filter(msg => msg.id !== id));
  },
  
  clearAll: () => {
    updateState([]);
  }
};

interface FeedbackContainerProps {
  position?: Position;
}

export default function FeedbackContainer({ position = 'top-right' }: FeedbackContainerProps) {
  const [messages, setMessages] = useState<FeedbackMessage[]>(feedbackState);

  // Add listener on mount and remove on unmount
  useEffect(() => {
    const handler = (newMessages: FeedbackMessage[]) => {
      setMessages([...newMessages]);
    };
    
    listeners.push(handler);
    
    return () => {
      listeners = listeners.filter(listener => listener !== handler);
    };
  }, []);

  // Determine position styles
  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  // Get icon component based on feedback type
  const getIcon = (type: FeedbackType) => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5 text-white" />;
      case 'error':
        return <X className="h-5 w-5 text-white" />;
      case 'info':
        return <Info className="h-5 w-5 text-white" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-white" />;
      default:
        return null;
    }
  };

  // Get background color based on feedback type
  const getBackgroundColor = (type: FeedbackType) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 dark:bg-green-600';
      case 'error':
        return 'bg-red-500 dark:bg-red-600';
      case 'info':
        return 'bg-blue-500 dark:bg-blue-600';
      case 'warning':
        return 'bg-yellow-500 dark:bg-yellow-600';
      default:
        return 'bg-gray-500 dark:bg-gray-600';
    }
  };

  return (
    <div className={`fixed z-50 flex flex-col gap-2 ${positionStyles[position]}`}>
      <AnimatePresence>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`flex items-center p-3 shadow-lg rounded-lg ${getBackgroundColor(msg.type)} min-w-[250px] max-w-md`}
          >
            <div className="mr-3 flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                {getIcon(msg.type)}
              </div>
            </div>
            <div className="text-white flex-grow">{msg.message}</div>
            <button
              onClick={() => feedback.clear(msg.id)}
              className="ml-2 text-white opacity-70 hover:opacity-100 focus:outline-none"
              aria-label="Dismiss feedback"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}