import ThemeToggle from "./ThemeToggle";
import { Link, useLocation } from "wouter";
import { Settings, BarChart, Palette } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <a className="text-primary font-bold text-2xl">Node12.com</a>
            </Link>
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded transition-colors duration-300">Project Guide</span>
          </div>
          <div className="flex items-center">
            <nav className="mr-4">
              <ul className="flex space-x-6">
                <li>
                  <Link href="/">
                    <a className={`transition-colors duration-300 ${
                      location === "/" 
                        ? "text-primary font-medium" 
                        : "text-gray-600 dark:text-gray-300 hover:text-primary"
                    }`}>
                      Home
                    </a>
                  </Link>
                </li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">Documentation</a></li>
                <li><a href="https://bookmarkconverter.replit.app" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">Bookmark Converter</a></li>
                <li>
                  <Link href="/design-system">
                    <a className={`flex items-center transition-colors duration-300 ${
                      location === "/design-system" 
                        ? "text-primary font-medium" 
                        : "text-gray-600 dark:text-gray-300 hover:text-primary"
                    }`}>
                      <Palette className="h-4 w-4 mr-1" />
                      Design System
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/analytics">
                    <a className={`flex items-center transition-colors duration-300 ${
                      location === "/analytics" 
                        ? "text-primary font-medium" 
                        : "text-gray-600 dark:text-gray-300 hover:text-primary"
                    }`}>
                      <BarChart className="h-4 w-4 mr-1" />
                      Analytics
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin">
                    <a className={`flex items-center transition-colors duration-300 ${
                      location === "/admin" 
                        ? "text-primary font-medium" 
                        : "text-gray-600 dark:text-gray-300 hover:text-primary"
                    }`}>
                      <Settings className="h-4 w-4 mr-1" />
                      Admin
                    </a>
                  </Link>
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