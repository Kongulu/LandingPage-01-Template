import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <span className="text-primary font-bold text-2xl">Node12.com</span>
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded transition-colors duration-300">Project Guide</span>
          </div>
          <div className="flex items-center">
            <nav className="mr-4">
              <ul className="flex space-x-6">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">Home</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">Documentation</a></li>
                <li><a href="https://bookmarkconverter.replit.app" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">Bookmark Converter</a></li>
              </ul>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}