import React from "react";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utils";
import { Link } from "react-router-dom";
import api from "../lib/axios";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents card link from firing

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((item) => item._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  const handleCardClick = () => {
    navigate(`/notes/${note._id}`);
  };

  return (
    <Link
      to={`/notes/${note._id}`}
      className="group card bg-base-100/60 backdrop-blur-md border border-base-content/10 
        shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out
        relative overflow-hidden before:absolute before:top-0 before:left-0 before:h-full 
        before:w-[4px] before:bg-[#ffea00] before:scale-y-70 hover:before:scale-y-100 
        before:transition-transform before:duration-300 before:origin-top"
    >
      <div className="w-full h-full p-6 card-body">
        {/* Title */}
        <h3 className="text-lg font-semibold tracking-tight card-title text-base-content 
          group-hover:text-[#ffb300] transition-colors duration-200">
          {note.title}
        </h3>
        
        {/* Content */}
        <p className="mt-2 text-sm leading-relaxed text-base-content/70 line-clamp-3">
          {note.content}
        </p>
        
        {/* Footer Actions */}
        <div className="items-center justify-between pt-4 mt-4 border-t border-base-content/5 card-actions">
          <span className="text-xs font-medium tracking-wide uppercase text-base-content/40">
            {formatDate(new Date(note.createdAt))}
          </span>
          
          <div className="flex items-center gap-1">
            {/* Edit Button */}
            <Link
              to={`/notes/${note._id}`}
              onClick={(e) => e.stopPropagation()}
              className="transition-all rounded-md btn btn-ghost btn-xs text-base-content/60 hover:text-info hover:bg-info/10"
              title="Edit Note"
            >
              <PenSquareIcon className="size-4" />
            </Link>
            
            {/* Delete Button */}
            <button
              className="transition-all rounded-md btn btn-ghost btn-xs text-base-content/60 hover:text-error hover:bg-error/10"
              onClick={(e) => handleDelete(e, note._id)}
              title="Delete Note"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
