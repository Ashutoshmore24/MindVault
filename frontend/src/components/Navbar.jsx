import React from 'react';
import { PlusCircle, Sun, Moon, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import toast from 'react-hot-toast';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem("mindvault-theme", nextTheme);
    
    sessionStorage.setItem("theme-changed-toast", `Switched to ${nextTheme} mode workspace`);
    
    navigate(0); 
  };

  // Handle killing the session cookie on backend and clearing state
  const handleLogout = async () => {
    try {
      await api.get('/auth/logout');
      setUser(null); 
      toast.success('Logged out securely');
      navigate('/login'); 
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out cleanly');
    }
  };

  return (
    <header className="sticky top-0 z-50 px-4 shadow-md navbar bg-base-100/90 backdrop-blur-md">
    {/* Brand Logo */}
    <div className="navbar-start">
      <Link to="/" className="text-xl font-bold tracking-wide normal-case btn btn-ghost text-primary">
        MindVault
      </Link>
    </div>

      {/* Action Buttons */}
      <div className="gap-2 sm:gap-4 navbar-end">
        {user && (
          <Link to={'/create'} className="gap-2 btn btn-warning btn-sm md:btn-md">
            <PlusCircle size={20} />
            <span className="hidden sm:inline">New Note</span>
          </Link>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-ghost btn-sm md:btn-md"
          aria-label="Toggle theme"
        >
          {/* 4. FIXED: Renders Moon icon during Light Mode, and Sun icon during Dark Mode */}
          {currentTheme === 'light' ? (
            <Moon size={20} className="text-neutral" />
          ) : (
            <Sun size={20} className="text-warning animate-pulse" />
          )}
        </button>
              
        {/* Dynamic Auth Section Layout */}
        {user ? (
          <div className="flex items-center gap-4">
            {/* User Google Avatar Image Display */}
            <div className="avatar tooltip tooltip-bottom" data-tip={user.name}>
              <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 md:w-10 md:h-10">
                <img 
                  src={user.avatar || "https://unsplash.com"} 
                  alt={user.name} 
                  referrerPolicy="no-referrer" 
                />
              </div>
            </div>

            {/* Logout Trigger Button */}
            <button 
              onClick={handleLogout}
              className="gap-1 btn btn-primary btn-sm md:btn-md"
            >
              <LogOut size={16} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-neutral btn-sm md:btn-md">Login</Link>
        )}
      </div>
    </header>
  );
}
