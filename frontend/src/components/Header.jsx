import React from "react";
import { Web3Button } from "@web3modal/react";

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-sm text-gray-400 hover:text-white transition duration-300 hover:bg-white/5 px-4 py-2 rounded-lg"
  >
    {children}
  </a>
);

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="text-2xl">⛽</span>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            FuelBase
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#order">Order Now</NavLink>
          <NavLink href="#history">Track Orders</NavLink>
          <a
            href="https://docs.base.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-gray-700 hover:border-purple-500/50 transition duration-300"
          >
            Documentation
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Web3Button />
          <button className="md:hidden text-gray-400 hover:text-white transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
