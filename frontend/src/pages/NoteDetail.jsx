import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { ArrowLeftIcon, Loader2Icon, Trash2Icon, CloudLightning, SaveIcon } from "lucide-react";
import NotFoundPage from "../components/NotFoundPage.jsx";

export default function NoteDetail() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/api/notes/${id}`);
        console.log("Fetched note:", res.data);
        setNote(res.data.existingNote);
      } catch (error) {
        console.log("Error fetching note");
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/api/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note", error);
      toast.error("Failed to delete the note");
    }
  };

  const handleSave = async () => {
    if (!note?.title?.trim() || !note?.content?.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }
    setSaving(true);
    
    try {
      await api.put(`/api/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error updating note", error);
      toast.error("Failed to update the note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 bg-slate-50">
        <Loader2Icon className="w-10 h-10 text-indigo-600 animate-spin" />
        <span className="text-sm font-medium text-slate-500">Loading your note...</span>
      </div>
    );
  }

  if (!note) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen antialiased bg-base-200 text-base-content">
      {/* Top Floating Navigation Header */}
      <header className="sticky top-0 z-10 border-b backdrop-blur-md bg-base-100/80 border-base-300">
        <div className="flex items-center justify-between h-16 max-w-4xl px-6 mx-auto">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-3 py-1.5 rounded-btn text-base-content/80 hover:text-primary hover:bg-base-300/50 transition-all duration-200 text-sm font-medium group"
          >
            <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Notes</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 btn btn-ghost btn-sm text-error hover:bg-error/10"
            >
              <Trash2Icon className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </button>
            
            <button 
              onClick={handleSave} 
              className="flex items-center gap-2 btn btn-info btn-sm"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <SaveIcon className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl px-6 py-10 mx-auto">
        <div className="p-8 space-y-6 border shadow-sm bg-base-100 rounded-box border-base-300 md:p-12">
          
          {/* Title Input */}
          <div className="space-y-1">
            <input
              type="text"
              placeholder={note?.title || "Title"}
              className="w-full p-0 text-2xl font-bold tracking-tight bg-transparent border-none outline-none resize-none md:text-3xl text-base-content focus:ring-0 placeholder:text-base-content/30 focus:outline-none"
              value={note.title || ""}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
            {/* Elegant separation line utilizing the primary color scheme subtly */}
            <div className="h-[4px] w-full bg-gradient-to-r from-warning/30 to-transparent mt-2" />
          </div>

          {/* Content Textarea */}
          <div>
            <textarea
              placeholder={note?.content || "Content..."}
              className="w-full min-h-[450px] text-base md:text-lg leading-relaxed text-base-content/90 border-none outline-none focus:ring-0 placeholder:text-base-content/40 bg-transparent resize-none p-0 focus:outline-none"
              value={note.content || ""}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
          </div>
          
        </div>
      </main>
    </div>
  );
}
