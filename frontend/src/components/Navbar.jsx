import React, { useState, useEffect } from 'react';
import { PlusCircle, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [theme, setTheme] = useState('cmyk');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme((prev) => (prev === 'cmyk' ? 'dracula' : 'cmyk'));
  };

  return (
    <header className="px-4 shadow-md navbar bg-base-100">
      {/* Brand Logo */}
      <div className="navbar-start">
        <a className="text-xl font-bold tracking-wide normal-case btn btn-ghost text-primary">
          MindVault
        </a>
      </div>

      {/* Action Buttons */}
      <div className="gap-4 navbar-end">
        <Link to={'/create'} className="gap-2 btn btn-warning btn-sm md:btn-md">
          <PlusCircle size={20} />
          <span className="hidden sm:inline">New</span>
        </Link>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-ghost btn-sm md:btn-md"
          aria-label="Toggle theme"
        >
          {theme === 'cmyk' ? (
            <Moon size={20} className="text-base-content" />
          ) : (
            <Sun size={20} className="text-warning" />
          )}
        </button>
              
        <a className="btn btn-neutral btn-sm md:btn-md">Login</a>
      </div>
    </header>
  );
}
