import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SSLChecker from "@/components/SSLChecker";
import { Shield } from "lucide-react";

export default function SSLPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
            <Shield className="mr-2 text-primary h-8 w-8" />
            SSL Certificate Manager
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Monitor and manage SSL certificates for Node12.com domains
          </p>
        </div>
        
        <SSLChecker />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Why SSL is Important</h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Encrypts data transmission between visitors and your website</li>
              <li>• Improves search engine rankings (Google favors HTTPS sites)</li>
              <li>• Builds trust with users by showing the padlock icon</li>
              <li>• Required for modern web features like PWAs and HTTP/2</li>
              <li>• Protects against man-in-the-middle attacks</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">SSL Best Practices</h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Set up auto-renewal for certificates before they expire</li>
              <li>• Use strong ciphers and disable outdated protocols</li>
              <li>• Implement HTTP Strict Transport Security (HSTS)</li>
              <li>• Redirect HTTP to HTTPS for all traffic</li>
              <li>• Test your SSL setup with tools like SSL Labs</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}