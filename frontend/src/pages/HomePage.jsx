import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";

import NoteCard from "../components/NoteCard";
import { LoaderIcon } from "lucide-react";
import NotFoundPage from "../components/NotFoundPage";

const HomePage = ({user, setUser}) => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/api/notes");
        setNotes(res.data);
        setIsRateLimited(false);
        
      } catch (error) {
        console.log("Error fetching notes");
        if (error.response?.status === 429) {
          setIsRateLimited(true);
          toast.error("Rate limit exceeded. Please try again later.");
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar user={user} setUser={setUser} />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-4xl p-4 mx-auto mt-6">
        {loading && (
          <div className="flex items-center justify-center min-h-screen">
            <LoaderIcon className="w-12 h-12 text-yellow-500 animate-spin" />
          </div>
        )}

{!loading && !isRateLimited && notes.length === 0 && (
          <div className="py-12 text-center text-neutral-content/60">
            <p className="text-lg font-medium">Your vault is empty.</p>
            <p className="mt-1 text-sm">Start by capturing your first thought!</p>
          </div>
        )}
        
        {notes.length > 0 && !isRateLimited && (
          <div className="grid w-full grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3"
>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
