import { useState } from "react";
import imag from "./assets/img.svg";
import imag1 from "./assets/image1.svg";
import imag2 from "./assets/image2.svg";
import imag3 from "./assets/image3.svg";
import imag4 from "./assets/image4.svg";
import cloud from "./assets/cloud.svg";
import man from "./assets/man.svg";
import women from "./assets/women.svg";
import Footer from "./footer";
import Header from "./Header";
import Hero from "./HeroSection";
import HowItWorks from "./HowItWorks";
import DND from "./DND";


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