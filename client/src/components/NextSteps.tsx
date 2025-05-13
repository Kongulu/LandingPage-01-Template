export default function NextSteps() {
  return (
    <div className="mt-10 bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Next Steps</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <a href="#" className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
          <h3 className="font-medium text-gray-800 mb-1">View Documentation</h3>
          <p className="text-gray-600 text-sm">Read more about managing multiple Replit projects</p>
        </a>
        <a href="#" className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
          <h3 className="font-medium text-gray-800 mb-1">Get Support</h3>
          <p className="text-gray-600 text-sm">Need help? Contact our support team</p>
        </a>
      </div>
    </div>
  );
}
