import ThemeToggle from "./ThemeToggle";
import { Settings, BarChart, Palette, Shield, Home as HomeIcon, FileCode } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [currentPath, setCurrentPath] = useState('');
  
  useEffect(() => {
    setCurrentPath(window.location.pathname);
    console.log("Header mounted - Current path:", window.location.pathname);
  }, []);
  
  return (
    <>
      {/* Very visible top navigation bar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center font-bold text-lg md:text-xl mb-2">
            Node12.com Project Separation
          </div>
          <nav className="flex flex-wrap justify-center gap-2 md:gap-6">
            <a 
              href="/" 
              className={`px-3 py-1 rounded-md flex items-center gap-1 transition-all ${
                currentPath === "/" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
              }`}
            >
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </a>
            <a 
              href="/ssl" 
              className={`px-3 py-1 rounded-md flex items-center gap-1 transition-all ${
                currentPath === "/ssl" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>SSL</span>
            </a>
            <a 
              href="/analytics" 
              className={`px-3 py-1 rounded-md flex items-center gap-1 transition-all ${
                currentPath === "/analytics" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
              }`}
            >
              <BarChart className="h-4 w-4" />
              <span>Analytics</span>
            </a>
            <a 
              href="/design-system" 
              className={`px-3 py-1 rounded-md flex items-center gap-1 transition-all ${
                currentPath === "/design-system" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
              }`}
            >
              <Palette className="h-4 w-4" />
              <span>Design System</span>
            </a>
            <a 
              href="/admin" 
              className={`px-3 py-1 rounded-md flex items-center gap-1 transition-all ${
                currentPath === "/admin" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </a>
            <a 
              href="https://bookmarkconverter.replit.app" 
              className="px-3 py-1 rounded-md flex items-center gap-1 transition-all hover:bg-white/10"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileCode className="h-4 w-4" />
              <span>Bookmark Converter</span>
            </a>
          </nav>
        </div>
      </div>
      
      {/* Original header with ThemeToggle */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <a href="/" className="text-primary font-bold text-2xl">Node12.com</a>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded transition-colors duration-300">Project Guide</span>
            </div>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}