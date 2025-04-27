import React from "react";
import Header from "./Header";
import Hero from "./HeroSection";
import HowItWorks from "./HowItWorks";
import DND from "./DND";
import Footer from "./footer";


export default function BackgroundRemovalApp() {
  

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col">
      {/* Header */}
     <Header/>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Hero Section - Removed fixed height for mobile */}
        <Hero/>

        {/* Upload Section - Added ID and fixed spacing */}
       <DND/>

        {/* How It Works Section */}
      <HowItWorks />
      </main>

      {/* Footer */}
     <Footer />
    </div>
  );
}