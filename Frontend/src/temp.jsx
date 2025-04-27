import { useState } from "react";
import imag from "./assets/img.svg";
import imag1 from "./assets/image1.svg";
import imag2 from "./assets/image2.svg";
import imag3 from "./assets/image3.svg";
import imag4 from "./assets/image4.svg";
import cloud from "./assets/cloud.svg";
import man from "./assets/man.svg";
import women from "./assets/women.svg";


export default function BackgroundRemovalApp() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [processedImages, setProcessedImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectionMode, setSelectionMode] = useState(true); // True = selection mode, False = comparison mode
  const [error, setError] = useState("");

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileSelect({ target: { files } });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validFiles = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload valid image files only.");
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        setError("Each file should be less than 15MB.");
        return;
      }
      validFiles.push({
        url: URL.createObjectURL(file),
        name: file.name,
      });
    }

    setError("");
    setUploadedImages([...uploadedImages, ...validFiles]);
    setSelectionMode(true); // Stay in selection mode after upload
  };

  const processImages = () => {
    setIsProcessing(true);
    setSelectionMode(false); // Switch to comparison mode

    // Simulate background removal process
    setTimeout(() => {
      const processed = uploadedImages.map((file) => file.url); // In real case, here you replace background
      setProcessedImages(processed);
      setIsProcessing(false);
    }, 2000);
  };

  const clearImages = () => {
    setUploadedImages([]);
    setProcessedImages([]);
    setIsProcessing(false);
    setError("");
    setSelectionMode(true);
  };

  const removeImage = (indexToRemove) => {
    setUploadedImages(uploadedImages.filter((_, index) => index !== indexToRemove));
    setProcessedImages(processedImages.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-5">
        <p className="text-2xl font-bold text-gray-800">Bg Bluster</p>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg">
          Github 
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Hero Section - Removed fixed height for mobile */}
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
            <div className="relative w-full h-96 flex items-center justify-center">
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

        {/* Upload Section */}
        <div id="upload-area" className="mt-12 mb-16">
          {uploadedImages.length === 0 ? (
            <div
              className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all cursor-pointer ${isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-400"
                }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input
                type="file"
                id="file-input"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={handleFileSelect}
              />

              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <img src={cloud} alt="Upload Icon" className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Drop your images here</h3>
              <p className="text-gray-500 text-sm mb-6">or click to browse files</p>

              <div className="flex items-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm">
                <span className="mr-2"><img src={imag} alt="" /></span>
                Supported formats: PNG, JPG - Max file size: 15MB each
              </div>

              {error && (
                <div className="mt-4 text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl overflow-hidden shadow-lg">
              {/* Header bar with actions */}
              <div className="bg-white px-8 py-6 flex items-center justify-between border-b border-indigo-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-600 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Magic Transform</h2>
                  <div className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-1.5"></span>
                    {isProcessing ? "Processing" : selectionMode ? "Ready" : "Complete"}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => document.getElementById('file-input').click()}
                    className="flex items-center text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Upload More
                  </button>

                  <input
                    type="file"
                    id="file-input"
                    className="hidden"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    onChange={handleFileSelect}
                  />

                  <button 
                    onClick={clearImages}
                    className="flex items-center text-gray-600 hover:text-red-600 text-sm font-medium transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear All
                  </button>

                  {selectionMode && (
                    <button 
                      onClick={processImages}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium px-6 py-2 rounded-lg text-sm shadow-md hover:shadow-lg transition-shadow"
                      disabled={isProcessing || uploadedImages.length === 0}
                    >
                      {isProcessing ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Process All Images"
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Selection mode - Show uploaded images grid */}
              {selectionMode && (
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Selected Images</h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden relative group">
                        <div className="aspect-square overflow-hidden">
                          <img 
                            src={img.url} 
                            alt={`Image ${index + 1}`} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="p-3 border-t border-gray-100">
                          <p className="text-sm font-medium text-gray-800 truncate">{img.name}</p>
                        </div>
                        <button 
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <button 
                      onClick={processImages}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium px-8 py-3 rounded-lg text-base shadow-md hover:shadow-lg transition-shadow flex items-center"
                      disabled={isProcessing || uploadedImages.length === 0}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Start Background Removal
                    </button>
                  </div>
                </div>
              )}

              {/* Comparison mode - Processing gallery */}
              {!selectionMode && (
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Results</h3>
                    <button 
                      onClick={() => setSelectionMode(true)}
                      className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to Selection
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        {/* Image header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="bg-indigo-100 text-indigo-600 rounded-full h-8 w-8 flex items-center justify-center font-semibold">
                              {index + 1}
                            </div>
                            <h3 className="font-medium text-gray-800 truncate max-w-xs">{img.name}</h3>
                          </div>

                          <div className="text-xs font-medium text-gray-500">
                            {isProcessing ? "Processing..." : "Complete"}
                          </div>
                        </div>

                        {/* Image comparison container */}
                        <div className="flex flex-col md:flex-row">
                          {/* Original Image */}
                          <div className="flex-1 p-6">
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Original</div>
                            <div className="bg-gray-50 rounded-xl h-64 flex items-center justify-center overflow-hidden p-2">
                              <img src={img.url} alt={`Original ${index}`} className="max-w-full max-h-full object-contain rounded-lg" />
                            </div>
                          </div>

                          {/* Arrow divider for desktop */}
                          <div className="hidden md:flex items-center justify-center px-2">
                            <div className="bg-indigo-100 rounded-full p-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                          </div>

                          {/* Arrow divider for mobile */}
                          <div className="flex md:hidden items-center justify-center py-2">
                            <div className="bg-indigo-100 rounded-full p-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>

                          {/* Processed Image */}
                          <div className="flex-1 p-6">
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Transparent Background</div>
                            <div className="bg-gray-50 rounded-xl h-64 flex items-center justify-center overflow-hidden p-2 relative">
                              {/* Checkerboard pattern background for transparency */}
                              <div className="absolute inset-0 bg-opacity-50" style={{
                                backgroundImage: `
                                  linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                                  linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
                                  linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
                                  linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
                                `,
                                backgroundSize: '20px 20px',
                                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                              }}></div>

                              {isProcessing ? (
                                <div className="flex flex-col items-center z-10">
                                  <div className="w-16 h-16 relative">
                                    <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-medium text-indigo-600">
                                      AI
                                    </div>
                                  </div>
                                  <p className="text-indigo-600 font-medium mt-4">Processing image...</p>
                                  <p className="text-gray-500 text-xs mt-1">This may take a few seconds</p>
                                </div>
                              ) : (
                                processedImages[index] ? (
                                  <img src={processedImages[index]} alt={`Processed ${index}`} className="max-w-full max-h-full object-contain rounded-lg z-10" />
                                ) : (
                                  <div className="text-red-500 bg-red-50 px-4 py-3 rounded-lg z-10">
                                    <p className="font-medium">Processing error</p>
                                    <p className="text-xs mt-1">Please try again</p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-4">
                              <button className="text-gray-500 hover:text-indigo-600 text-sm font-medium flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Retry
                              </button>
                              <button className="text-gray-500 hover:text-indigo-600 text-sm font-medium flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Edit
                              </button>
                            </div>

                            {!isProcessing && processedImages[index] && (
                              <a
                                href={processedImages[index]}
                                download={`transparent-${img.name}`}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center shadow-sm hover:shadow transition-shadow"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* How It Works Section */}
        <div className="py-16 bg-gray-50 rounded-2xl px-8 my-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our powerful AI technology makes background removal simple and efficient. Follow these easy steps to transform your images instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Upload Your Image</h3>
              <p className="text-gray-600">
                Drag and drop your image files or browse to select them from your device. We support JPG and PNG formats up to 15MB per file.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Processing</h3>
              <p className="text-gray-600">
                Our advanced AI algorithms analyze your image and intelligently separate the foreground from the background in seconds.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Download Results</h3>
              <p className="text-gray-600">
                Preview your processed image and download the transparent background version ready for use in your projects.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => document.getElementById('upload-area').scrollIntoView({ behavior: 'smooth' })}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg text-lg"
            >
              Try It Now
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 px-6">
          <p>© 2024 Bg Bluster. All rights reserved.</p>
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