import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetail from "./pages/NoteDetail.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
// import toast , { Toaster } from 'react-hot-toast';

function App() {
  const notify = () => toast("Here is your toast.");
  return (
    <div data-theme="cupcake" className="min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/notes/:id" element={<NoteDetail />} />

        {/* Catch-all route to suppress extension noise and handle real 404s */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
