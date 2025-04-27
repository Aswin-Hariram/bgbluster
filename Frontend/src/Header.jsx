import React from 'react';
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between px-8 py-5 shadow-md bg-white">
      <p className="text-2xl font-extrabold text-gray-900 tracking-wide">
        Bg Bluster
      </p>
      <a
        href="https://github.com/Aswin-Hariram/bgbluster"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-xl transition duration-200"
      >
        <FaGithub size={20} />
        <span>GitHub</span>
      </a>
    </header>
  );
};

export default Header;
