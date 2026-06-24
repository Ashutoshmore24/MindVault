import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";

import NoteCard from "../components/NoteCard";
import { LoaderIcon, SearchIcon } from "lucide-react";
import NotFoundPage from "../components/NotFoundPage";

const HomePage = ({ user, setUser }) => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredNotes = notes.filter((note) => {
    let lowerCaseQuery = searchQuery.toLowerCase();

    return (
      note.title.toLowerCase().includes(lowerCaseQuery) ||
      note.content.toLowerCase().includes(lowerCaseQuery)
    );
  });

  

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/*Navbar*/}
      <Navbar user={user} setUser={setUser} />

      {isRateLimited && <RateLimitedUI />}

      {/* Search Bar */}
      <div className="flex-shrink-0 w-full max-w-md px-4 mx-auto mt-6 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Notes by title or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all shadow-inner"
          />
          <SearchIcon className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3 bg-gray-700 hover:bg-gray-600 rounded-full w-5 h-5 text-xs flex items-center justify-center transition-colors text-gray-300"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 3. THE MAGIC WRAPPER: Isolated Scrollable Container Viewport */}
      <div className="flex-grow w-full pb-12 overflow-y-auto no-scrollbar">
        <div className="w-full max-w-4xl px-4 mx-auto">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <LoaderIcon className="w-12 h-12 text-yellow-500 animate-spin" />
            </div>
          )}

          {!loading && !isRateLimited && notes.length === 0 && (
            <div className="py-12 text-center text-neutral-content/60">
              <p className="text-lg font-medium">Your vault is empty.</p>
              <p className="mt-1 text-sm">
                Start by capturing your first thought!
              </p>
            </div>
          )}

          {/* Notes Grid Renders Inside the Scroll Zone */}
          {!loading && !isRateLimited && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <NoteCard key={note._id} note={note} />
                ))
              ) : (
                <div className="col-span-3 py-12 text-center border border-gray-700 border-dashed bg-gray-800/50 rounded-xl">
                  <p className="text-gray-400">
                    No matching thoughts found in your vault.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
