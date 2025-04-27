import React from "react";
import Header from "./Header";
import Hero from "./HeroSection";
import HowItWorks from "./HowItWorks";
import DND from "./DND";



export default function BackgroundRemovalApp() {


  return (
    <div className="min-h-screen w-screen bg-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Hero Section - Removed fixed height for mobile */}
        <Hero />

        {/* Upload Section - Added ID and fixed spacing */}
        <DND />

        {/* How It Works Section */}
        <HowItWorks />
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 px-6">
          <p>© 2024 BackgroundBegone. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
            <a href="#" className="hover:text-gray-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}