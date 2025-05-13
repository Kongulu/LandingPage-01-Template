import { useState } from "react";
import { ChevronRight, ChevronLeft, HelpCircle, Lightbulb, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QuickTips() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const tips = [
    {
      title: "Start with the Node12.com Project",
      description: "Begin by creating a new Replit project for your main website to ensure the domain will point to the right place.",
      link: "https://replit.com/new"
    },
    {
      title: "Use the Resources Tab",
      description: "Navigate to the Resources tab in Replit to set up your custom domain and other project configurations.",
      link: null
    },
    {
      title: "Update DNS Records",
      description: "Remember to update your DNS records at GoDaddy or your domain provider to point to your new Replit project.",
      link: "https://www.godaddy.com/help/manage-dns-records-680"
    },
    {
      title: "Linking Projects",
      description: "Consider adding links between your projects to create a cohesive user experience across your microservices.",
      link: null
    },
    {
      title: "Keep Code Separate",
      description: "Each project should have its own complete codebase. Don't share files between projects to maintain true separation.",
      link: null
    }
  ];

  return (
    <div className="fixed right-0 top-1/3 transform -translate-y-1/2 z-40">
      <div className="relative flex items-start">
        {/* Sidebar toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-8 h-24 bg-primary text-white rounded-l-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          aria-label={isOpen ? "Close quick tips" : "Open quick tips"}
        >
          <span className="sr-only">{isOpen ? "Close quick tips" : "Open quick tips"}</span>
          {isOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>

        {/* Sidebar content */}
        <div
          className={cn(
            "bg-white dark:bg-gray-800 shadow-lg rounded-l-lg transition-all duration-300 transform",
            isOpen ? "translate-x-0 w-72" : "translate-x-full w-0 opacity-0"
          )}
        >
          <div className="p-4">
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
              <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Quick Tips</h3>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Click on a tip for more details. These tips will help you successfully separate your projects.
            </div>

            <ul className="space-y-2">
              {tips.map((tip, index) => (
                <li key={index}>
                  <button
                    onClick={() => setActiveStep(activeStep === index ? null : index)}
                    className={cn(
                      "w-full text-left p-2 rounded-md transition-colors flex items-start justify-between",
                      activeStep === index
                        ? "bg-primary bg-opacity-10 text-primary"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <span className="font-medium">{tip.title}</span>
                    <HelpCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                  </button>
                  
                  {activeStep === index && (
                    <div className="mt-2 ml-2 pl-2 border-l-2 border-primary text-sm text-gray-600 dark:text-gray-300">
                      <p className="mb-2">{tip.description}</p>
                      {tip.link && (
                        <a 
                          href={tip.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          Learn more
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}