import React from 'react'

const Footer = () => {
  return (
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
  )
}

export default Footer