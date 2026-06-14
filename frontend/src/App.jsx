import { useState , useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import api from "./lib/axios.js";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetail from "./pages/NoteDetail.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import toast , { Toaster } from 'react-hot-toast';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("mindvault-theme") || "dark");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. Synchronize selection state globally to the document layout tree
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  
  // Check if a session exists when the app opens
  useEffect(() => {
    api.get('/auth/profile')
      .then((res) => {
        if (res.data.authenticated) {
          setUser(res.data.user);
          const loggedInFlag = sessionStorage.getItem("logged-in-toast");
          if (!loggedInFlag) {
            toast.success(`Welcome back, ${res.data.user.name || "User"}!`, { icon: '👋' });
            sessionStorage.setItem("logged-in-toast", "true");
          }
        } else {
          setUser(null);
          sessionStorage.removeItem("logged-in-toast"); // Resets on logout
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const pendingToast = sessionStorage.getItem("theme-changed-toast");
    if (pendingToast) {
      toast.success(pendingToast);
      sessionStorage.removeItem("theme-changed-toast"); // Clears data footprint immediately
    }
  }, []);
  
   // Show a clean loading state while verifying cookies
   if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-emerald-400">
        <span className="loading loading-spinner loading-lg">Loading MindVault...</span>
      </div>
    );
  }
  return (
    <div className="relative min-h-screen overflow-hidden">

{theme === "dark" ? (
        <div className="absolute inset-0 items-center w-full h-full px-5 py-24 -z-10 bg-slate-900" />
      ) : (
        <div className="absolute inset-0 w-full h-full -z-10 bg-slate-300" />
      )}
      
      
      <Toaster position="top-center" reverseOrder={false} />
      
      
      <Routes>
        {/* Unauthenticated Route */}
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />

        
        {/* Authenticated Routes: Redirect to /login if there is no active session */}
        <Route path="/" element={user ? <HomePage user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path="/create" element={user ? <CreatePage /> : <Navigate to="/login" />} />
        <Route path="/notes/:id" element={user ? <NoteDetail /> : <Navigate to="/login" />} />


        {/* Catch-all route to suppress extension noise and handle real 404s */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
