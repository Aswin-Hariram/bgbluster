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

import React from 'react'

const HeroSection = () => {
  return (
    <div className="py-12 lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
             {/* For laptop - original layout with diagonal images */}
             <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center my-12">
               {/* Left Text */}
               <div>
                 <div className="inline-flex items-center bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm mb-6 font-medium">
                   <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                   AI-Powered Technology
                 </div>
   
                 <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                   Transform Your Images with One Click
                 </h1>
   
                 <p className="text-gray-600 text-lg mb-8">
                   Remove backgrounds instantly with our advanced AI technology. Perfect for e-commerce, professional portfolios, and creative projects.
                 </p>
   
                 <div className="flex items-center space-x-6">
                   <button
                     className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg text-lg"
                     onClick={() => document.getElementById('upload-area').scrollIntoView({ behavior: 'smooth' })}
                   >
                     Remove Background Now
                   </button>
   
                   <div className="flex items-center space-x-3">
                     <div className="flex -space-x-2 overflow-hidden">
                       <img src={man} alt="User 1" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                       <img src={women} alt="User 2" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                       <img src={women} alt="User 3" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                       <img src={man} alt="User 4" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                     </div>
                     <span className="text-sm text-gray-600">1M+ happy users</span>
                   </div>
                 </div>
               </div>
   
               {/* Right Diagonal Images for laptop view */}
               <div className="relative w-full h-[600px] flex items-center justify-center">
                 <div className="absolute top-0 left-16 w-44 h-64 bg-white rounded-2xl shadow-lg p-2">
                   <img src={imag1} alt="Image 1" className="object-cover w-full h-full rounded-lg" />
                 </div>
                 <div className="absolute top-12 right-16 w-44 h-64 bg-white rounded-2xl shadow-lg p-2">
                   <img src={imag3} alt="Image 2" className="object-cover w-full h-full rounded-lg" />
                 </div>
                 <div className="absolute bottom-12 left-16 w-44 h-64 bg-white rounded-2xl shadow-lg p-2">
                   <img src={imag2} alt="Image 3" className="object-cover w-full h-full rounded-lg" />
                 </div>
                 <div className="absolute bottom-0 right-16 w-44 h-64 bg-white rounded-2xl shadow-lg p-2">
                   <img src={imag4} alt="Image 4" className="object-cover w-full h-full rounded-lg" />
                 </div>
               </div>
             </div>
   
             {/* For mobile and tablet - hero section followed by images in rows */}
             <div className="lg:hidden">
               {/* Hero content */}
               <div className="py-8">
                 <div className="inline-flex items-center bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm mb-6 font-medium">
                   <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                   AI-Powered Technology
                 </div>
   
                 <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                   Transform Your Images with One Click
                 </h1>
   
                 <p className="text-gray-600 text-lg mb-8">
                   Remove backgrounds instantly with our advanced AI technology. Perfect for e-commerce, professional portfolios, and creative projects.
                 </p>
   
                 <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                   <button
                     className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg text-lg"
                     onClick={() => document.getElementById('upload-area').scrollIntoView({ behavior: 'smooth' })}
                   >
                     Remove Background Now
                   </button>
   
                   <div className="flex items-center space-x-3">
                     <div className="flex -space-x-2 overflow-hidden">
                       <img src={man} alt="User 1" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                       <img src={women} alt="User 2" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                       <img src={women} alt="User 3" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                       <img src={man} alt="User 4" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                     </div>
                     <span className="text-sm text-gray-600">1M+ happy users</span>
                   </div>
                 </div>
               </div>
   
               {/* Images section for mobile and tablet */}
               <div className="py-6">
                 {/* First Row */}
                 <div className="flex flex-col sm:flex-row gap-4 mb-4">
                   <div className="w-full sm:w-1/2 bg-white rounded-2xl shadow-lg p-2">
                     <img src={imag1} alt="Image 1" className="w-full h-48 object-cover rounded-lg" />
                   </div>
                   <div className="w-full sm:w-1/2 bg-white rounded-2xl shadow-lg p-2 mt-4 sm:mt-0">
                     <img src={imag3} alt="Image 3" className="w-full h-48 object-cover rounded-lg" />
                   </div>
                 </div>
                 
                 {/* Second Row */}
                 <div className="flex flex-col sm:flex-row gap-4">
                   <div className="w-full sm:w-1/2 bg-white rounded-2xl shadow-lg p-2">
                     <img src={imag2} alt="Image 2" className="w-full h-48 object-cover rounded-lg" />
                   </div>
                   <div className="w-full sm:w-1/2 bg-white rounded-2xl shadow-lg p-2 mt-4 sm:mt-0">
                     <img src={imag4} alt="Image 4" className="w-full h-48 object-cover rounded-lg" />
                   </div>
                 </div>
               </div>
             </div>
           </div>
  )
}

export default HeroSection