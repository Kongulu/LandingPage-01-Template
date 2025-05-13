export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Node12.com</h3>
            <p className="text-gray-300 text-sm">Building innovative solutions for developers and businesses.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="https://node12.com" className="text-gray-300 hover:text-white text-sm">Main Site</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Tutorials</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Bookmark Converter</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Other Tools</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-sm text-gray-400 text-center">
          <p>© {new Date().getFullYear()} Node12.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}