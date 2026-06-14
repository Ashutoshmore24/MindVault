import React from "react";
import { LogInIcon } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      {/* Login Card Wrapper */}
      <div className="flex flex-col items-center w-full max-w-md gap-6 p-8 text-center border shadow-2xl bg-neutral/80 backdrop-blur-md border-emerald-500/20 rounded-2xl shadow-emerald-950/50">
        
        {/* Animated Icon / Brand Identity */}
        <div className="relative group">
          <div className="absolute transition duration-500 rounded-full opacity-75 -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 blur group-hover:opacity-100 animate-pulse"></div>
          <div className="relative p-4 bg-black border rounded-full border-emerald-400/30">
            <LogInIcon className="w-12 h-12 text-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Headings */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Mind<span className="shadow-sm text-emerald-400">Vault</span>
          </h1>
          <p className="max-w-xs mx-auto mt-2 text-sm text-neutral-content/70">
            Your ideas, thoughts, and fragments of knowledge. Encrypted and secured.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full my-1 border-t border-emerald-500/10"></div>

        {/* OAuth Anchor Button */}
        <a
          href="http://localhost:5000/auth/google"
          className="btn btn-block bg-white hover:bg-neutral-100 text-neutral font-semibold border-none rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
        >
          {/* Flat Google SVG Icon */}
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            xmlns="http://w3.org"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </a>

        {/* Footer Note */}
        <span className="text-xs tracking-widertext-neutral-content/40">
          Please Sign in with your Google account to access your secure vault.
        </span>
      </div>
    </div>
  );
}
