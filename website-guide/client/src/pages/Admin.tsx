import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminDashboard from "@/components/AdminDashboard";
import { feedback } from "@/components/FeedbackSystem";
import { useEffect } from "react";

export default function Admin() {
  useEffect(() => {
    // Show welcome message when admin dashboard loads
    feedback.success("Admin Dashboard loaded successfully");
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Administration Dashboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Manage all your Node12.com related projects from a single interface</p>
        </div>
        
        <AdminDashboard />
      </main>
      
      <Footer />
    </div>
  );
}