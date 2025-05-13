import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAnalytics } from "@/components/AnalyticsTracker";
import { Activity, ExternalLink, RefreshCw, ListFilter } from "lucide-react";

export default function Analytics() {
  const { crossProjectEvents } = useAnalytics();
  const [filterType, setFilterType] = useState<string | null>(null);
  
  // Sort events by timestamp (newest first)
  const sortedEvents = [...crossProjectEvents].sort((a, b) => b.timestamp - a.timestamp);
  
  // Filter events by type if filter is active
  const filteredEvents = filterType 
    ? sortedEvents.filter(event => event.type === filterType) 
    : sortedEvents;
  
  // Get unique event types for the filter
  const eventTypes = Array.from(new Set(sortedEvents.map(event => event.type)));
  
  // Format timestamp for display
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
            <Activity className="mr-2 text-primary h-8 w-8" />
            Cross-Project Analytics
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Track user flow between your Node12.com projects and services
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <ListFilter className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300 mr-3">Filter by event type:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilterType(null)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      filterType === null
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    All
                  </button>
                  {eventTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-3 py-1 rounded-md text-sm capitalize ${
                        filterType === type
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {type.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </button>
            </div>
            
            {filteredEvents.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">No analytics events found. Browse between projects to generate data.</p>
                <a 
                  href="https://bookmarkconverter.replit.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-primary hover:underline"
                >
                  Go to Bookmark Converter
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Event Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        From
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        To
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Context
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredEvents.map((event, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                            event.type === 'pageview' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                            event.type === 'click' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                            event.type === 'cross_project' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                          }`}>
                            {event.type.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatTimestamp(event.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                          {event.data.fromProject || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                          {event.data.toProject || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {event.data.context || event.data.path || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This analytics dashboard shows cross-project navigations between your Node12.com website and other services like the Bookmark Converter. The data is currently stored in localStorage and is shared between projects.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}