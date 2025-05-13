import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DesignSystem from "@/components/DesignSystem";
import { feedback } from "@/components/FeedbackSystem";
import { useEffect } from "react";
import { Palette } from "lucide-react";

export default function DesignSystemPage() {
  useEffect(() => {
    // Show welcome message when design system page loads
    feedback.info("Design System page loaded. You can copy styles to use across projects.");
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
            <Palette className="mr-2 text-primary h-8 w-8" />
            Shared Design System
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Use this consistent design system across all Node12.com projects to maintain brand cohesion
          </p>
        </div>
        
        <DesignSystem />
      </main>
      
      <Footer />
    </div>
  );
}