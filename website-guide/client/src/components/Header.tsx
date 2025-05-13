import ThemeToggle from "./ThemeToggle";
import { Settings, BarChart, Palette, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [currentPath, setCurrentPath] = useState('');
  
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <a href="/" className="text-primary font-bold text-2xl">Node12.com</a>
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded transition-colors duration-300">Project Guide</span>
          </div>
          <div className="flex items-center">
            <nav className="mr-4">
              <ul className="flex space-x-6">
                <li>
                  <a 
                    href="/" 
                    className={`transition-colors duration-300 ${
                      currentPath === "/" 
                        ? "text-primary font-medium" 
                        : "text-gray-600 dark:text-gray-300 hover:text-primary"
                    }`}
                  >
                    Home
                  </a>
                </li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">Documentation</a></li>
                <li><a href="https://bookmarkconverter.replit.app" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">Bookmark Converter</a></li>
                <li>
                  <a 
                    href="/design-system" 
                    className={`flex items-center transition-colors duration-300 ${
                      currentPath === "/design-system" 
                        ? "text-primary font-medium" 
                        : "text-gray-600 dark:text-gray-300 hover:text-primary"
                    }`}
                  >
                    <Palette className="h-4 w-4 mr-1" />
                    Design System
                  </a>
                </li>
                <li>
                  <a 
                    href="/ssl" 
                    className={`flex items-center transition-colors duration-300 ${
                      currentPath === "/ssl" 
                        ? "text-primary font-medium" 
                        : "text-gray-600 dark:text-gray-300 hover:text-primary"
                    }`}
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    SSL Manager
                  </a>
                </li>
                <li>
                  <a 
                    href="/analytics" 
                    className={`flex items-center transition-colors duration-300 ${
                      currentPath === "/analytics" 
                        ? "text-primary font-medium" 
                        : "text-gray-600 dark:text-gray-300 hover:text-primary"
                    }`}
                  >
                    <BarChart className="h-4 w-4 mr-1" />
                    Analytics
                  </a>
                </li>
                <li>
                  <a 
                    href="/admin" 
                    className={`flex items-center transition-colors duration-300 ${
                      currentPath === "/admin" 
                        ? "text-primary font-medium" 
                        : "text-gray-600 dark:text-gray-300 hover:text-primary"
                    }`}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Admin
                  </a>
                </li>
              </ul>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}