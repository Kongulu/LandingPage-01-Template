import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";
import CurrentSituation from "@/components/CurrentSituation";
import StepCard from "@/components/StepCard";
import Conclusion from "@/components/Conclusion";
import NextSteps from "@/components/NextSteps";
import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <PageTitle 
          title="Separating Your Projects"
          description="Follow this guide to separate your Node12.com website and Bookmark Converter into two distinct Replit projects"
        />
        
        <CurrentSituation />
        
        <StepCard 
          number={1}
          title="Create a New Project for Node12.com"
          content={
            <>
              <ol className="list-decimal list-inside space-y-3">
                <li className="text-gray-700">From your Replit dashboard, click "<span className="font-medium text-primary">+ Create Repl</span>"</li>
                <li className="text-gray-700">Select "<span className="font-medium">Node.js</span>" or "<span className="font-medium">React</span>" template (depending on what you want for Node12.com)</li>
                <li className="text-gray-700">Name it "<span className="font-medium">Node12Domain</span>"</li>
                <li className="text-gray-700">Click "<span className="font-medium">Create Repl</span>"</li>
              </ol>
              <div className="mt-4">
                <a href="https://replit.com/new" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-primary hover:bg-indigo-700 text-white font-medium rounded-md transition-colors">
                  Go to Replit Dashboard
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </>
          }
        />
        
        <StepCard 
          number={2}
          title="Set Up the Node12.com Site in the New Project"
          content={
            <>
              <p className="text-gray-700">In the new project, create a basic website structure.</p>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-2">Option 1: Copy Your Existing Landing Page</h3>
                <p className="text-gray-700 mb-2">Copy the landing page code from your original project to the new project. This preserves your current design.</p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono text-gray-800">
                  <code>LandingPage.tsx → Copy to new project</code>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-4">
                <h3 className="font-medium text-gray-800 mb-2">Option 2: Create a Placeholder Page</h3>
                <p className="text-gray-700">If you prefer, you can create a simple placeholder page for now.</p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono text-gray-800">
                  <code>
                    {`// index.js or index.html
// Create a basic structure with your existing design elements`}
                  </code>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mt-4">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700">Make sure to maintain the visual identity and design of your existing landing page.</p>
                </div>
              </div>
            </>
          }
        />
        
        <StepCard 
          number={3}
          title="Configure Domain for the New Project"
          content={
            <>
              <ol className="list-decimal list-inside space-y-3">
                <li className="text-gray-700">Once the new project is created and running</li>
                <li className="text-gray-700">Go to the "<span className="font-medium">Resources</span>" tab in the new project</li>
                <li className="text-gray-700">Click "<span className="font-medium">Link a domain</span>" in the Domains section</li>
                <li className="text-gray-700">Add both "<span className="font-medium">node12.com</span>" and "<a href="http://www.node12.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">www.node12.com</a>"</li>
                <li className="text-gray-700">Update your DNS records in GoDaddy to point to this new project</li>
              </ol>
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-4">
                <h3 className="font-medium text-gray-800 mb-2">DNS Configuration Example:</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-700">Type</th>
                        <th className="px-4 py-2 text-left text-gray-700">Name</th>
                        <th className="px-4 py-2 text-left text-gray-700">Value</th>
                        <th className="px-4 py-2 text-left text-gray-700">TTL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 text-gray-700">CNAME</td>
                        <td className="px-4 py-2 text-gray-700">@</td>
                        <td className="px-4 py-2 font-mono text-gray-700">[your-repl-name].repl.co</td>
                        <td className="px-4 py-2 text-gray-700">1 hour</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-gray-700">CNAME</td>
                        <td className="px-4 py-2 text-gray-700">www</td>
                        <td className="px-4 py-2 font-mono text-gray-700">[your-repl-name].repl.co</td>
                        <td className="px-4 py-2 text-gray-700">1 hour</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-4">
                <a href="https://www.godaddy.com/login" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-primary hover:bg-indigo-700 text-white font-medium rounded-md transition-colors">
                  Go to GoDaddy
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </>
          }
        />
        
        <StepCard 
          number={4}
          title="Keep the Bookmark Converter in the Original Project"
          content={
            <>
              <ol className="list-decimal list-inside space-y-3">
                <li className="text-gray-700">The current project can remain focused on just the bookmark converter functionality</li>
                <li className="text-gray-700">You can rename it to "<span className="font-medium">BookmarkConverter</span>" for clarity</li>
                <li className="text-gray-700">The bookmark converter will have its own Replit URL (bookmarkconverter.replit.app)</li>
              </ol>
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-4">
                <h3 className="font-medium text-gray-800 mb-2">How to Rename Your Replit Project:</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li className="text-gray-700">Open your original project</li>
                  <li className="text-gray-700">Click on the project name in the top-left corner</li>
                  <li className="text-gray-700">Enter the new name "BookmarkConverter"</li>
                  <li className="text-gray-700">Press Enter to save</li>
                </ol>
              </div>
            </>
          }
        />
        
        <StepCard 
          number={5}
          title="Link Between Projects (Optional)"
          content={
            <>
              <div className="text-gray-700">
                <p className="mb-3">In the Node12.com site, you can include links to the bookmark converter:</p>
                <ol className="list-decimal list-inside space-y-3">
                  <li>Add a navigation link or button to the bookmark converter</li>
                  <li>This creates a network of microservices with separate deployments</li>
                </ol>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-4">
                <h3 className="font-medium text-gray-800 mb-2">Example Link Implementation:</h3>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono text-gray-800">
                  <code>
                    {`<a href="https://bookmarkconverter.replit.app" 
  class="text-primary hover:underline">
  Try Our Bookmark Converter Tool
</a>`}
                  </code>
                </div>
              </div>
            </>
          }
        />
        
        <Conclusion />
        
        <NextSteps />
      </main>
      
      <Footer />
    </div>
  );
}
