export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <span className="text-primary font-bold text-2xl">Node12.com</span>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Project Guide</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-600 hover:text-primary">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Support</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
