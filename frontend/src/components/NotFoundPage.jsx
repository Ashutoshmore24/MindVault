import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden select-none bg-transparent-950 text-slate-100">
  {/* 🌌 Background Image Layer */}
  <img 
    src="/not_found_page.avif" 
    alt="Page Not Found Background" 
    className="absolute inset-0 object-cover w-full h-full opacity-100 pointer-events-none "
  />

  {/* 🎛 Dark Backdrop Overlay to ensure text stays highly readable */}
  <div className="absolute inset-0 pointer-events-none bg from-transparent/40 via-transparent/80 to-transparent" />

  {/* 📝 Content Layer (Positioned safely above the background grid) */}
  <div className="relative z-10 flex flex-col items-center max-w-md text-center backdrop-blur-[2px] p-6 rounded-2xl border border-slate-50/5 shadow-2xl">
    
    <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white-200 sm:text-5xl drop-shadow-md">
      404 - Not Found
    </h1>
    
    <p className="mb-6 text-sm leading-relaxed text-slate-300 sm:text-base drop-shadow">
      The mind vault link you are looking for does not exist or has been permanently deleted. Let's get you back to safety.
    </p>

    <Link 
      to="/" 
      className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold transition-all duration-200 bg-yellow-400 rounded-lg shadow-lg hover:bg-yellow-300 active:scale-95 text-slate-950 shadow-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-950"
    >
      Return to MindVault
    </Link>
  </div>
</div>

  );
};
export default NotFoundPage;