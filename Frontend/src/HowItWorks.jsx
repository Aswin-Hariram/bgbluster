import React from 'react'

const HowItWorks = () => {
  return (
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
       className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg text-lg">
        Try It Now
      </button>
    </div>
  </div>
  )
}

export default HowItWorks