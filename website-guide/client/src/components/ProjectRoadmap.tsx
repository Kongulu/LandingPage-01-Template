import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Calendar, Code, ArrowRight, Target, Check } from "lucide-react";

const steps = [
  {
    title: "Create Node12.com Project",
    description: "Set up a new Replit project dedicated to your main Node12.com website.",
    icon: Code,
    duration: "Day 1",
    tasks: [
      { task: "Create a new Replit project", complete: false },
      { task: "Set up the basic project structure", complete: false },
      { task: "Configure basic React/Node setup", complete: false }
    ]
  },
  {
    title: "Basic Website Setup",
    description: "Implement the core components of your Node12.com website.",
    icon: Target,
    duration: "Days 2-3",
    tasks: [
      { task: "Create landing page", complete: false },
      { task: "Implement navigation", complete: false },
      { task: "Set up responsive layout", complete: false }
    ]
  },
  {
    title: "Domain Configuration",
    description: "Configure domain settings to point to your new project.",
    icon: ArrowRight,
    duration: "Day 4",
    tasks: [
      { task: "Link domain in Replit", complete: false },
      { task: "Configure DNS settings", complete: false },
      { task: "Test domain connection", complete: false }
    ]
  },
  {
    title: "Bookmark Converter Migration",
    description: "Focus the original project solely on the bookmark converter functionality.",
    icon: ArrowRight,
    duration: "Days 5-6",
    tasks: [
      { task: "Remove non-bookmark converter code", complete: false },
      { task: "Optimize bookmark converter UI", complete: false },
      { task: "Set up proper naming and branding", complete: false }
    ]
  },
  {
    title: "Cross-Project Integration",
    description: "Create links between your projects for smooth user navigation.",
    icon: Check,
    duration: "Day 7",
    tasks: [
      { task: "Add links to bookmark converter from Node12.com", complete: false },
      { task: "Add links back to Node12.com from converter", complete: false },
      { task: "Test user flow between projects", complete: false }
    ]
  }
];

export default function ProjectRoadmap() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 my-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
        <Calendar className="mr-2 h-6 w-6 text-primary" />
        Project Separation Roadmap
      </h2>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isExpanded = expandedStep === index;
          const isCompleted = step.tasks.every(task => task.complete);
          const inProgress = !isCompleted && step.tasks.some(task => task.complete);
          
          return (
            <div 
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <button
                onClick={() => toggleStep(index)}
                className="w-full flex items-center justify-between p-4 focus:outline-none transition-colors duration-200"
              >
                <div className="flex items-center">
                  <div className={`mr-4 p-2 rounded-full 
                    ${isCompleted 
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                      : inProgress 
                        ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{step.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{step.duration}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {isCompleted && (
                    <span className="mr-3 text-sm font-medium text-green-600 dark:text-green-400">Completed</span>
                  )}
                  {inProgress && (
                    <span className="mr-3 text-sm font-medium text-yellow-600 dark:text-yellow-400">In Progress</span>
                  )}
                  {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </button>
              
              {isExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200 dark:border-gray-700 px-4 py-3"
                >
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{step.description}</p>
                  <div className="space-y-2">
                    {step.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-start">
                        <div className={`mt-0.5 h-4 w-4 rounded-full border ${task.complete ? 'bg-primary border-primary' : 'border-gray-300 dark:border-gray-600'} mr-2 flex-shrink-0`}>
                          {task.complete && <Check className="h-4 w-4 text-white" />}
                        </div>
                        <span className={`text-sm ${task.complete ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                          {task.task}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Progress indicator */}
              {hoveredStep === index && !isExpanded && (
                <div className="h-1 bg-gray-100 dark:bg-gray-700">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step.tasks.filter(task => task.complete).length / step.tasks.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This roadmap provides a structured approach to separating your Node12.com website and bookmark converter into independent projects.
          Track your progress by expanding each step and marking tasks as complete.
        </p>
      </div>
    </div>
  );
}