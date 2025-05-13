import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';

export default function TestPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Test Page
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            This is a simple test page to verify routing is working correctly
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Navigation Links</h2>
          <div className="flex flex-col space-y-2">
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Home</Link>
            <Link href="/ssl" className="text-blue-600 dark:text-blue-400 hover:underline">SSL Manager</Link>
            <Link href="/analytics" className="text-blue-600 dark:text-blue-400 hover:underline">Analytics</Link>
            <Link href="/design-system" className="text-blue-600 dark:text-blue-400 hover:underline">Design System</Link>
            <Link href="/test" className="text-blue-600 dark:text-blue-400 hover:underline">Test Page (this page)</Link>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              <strong>Current URL:</strong> {window.location.href}
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-2">
              <strong>Current Path:</strong> {window.location.pathname}
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}