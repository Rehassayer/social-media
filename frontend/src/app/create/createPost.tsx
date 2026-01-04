"use client";
import { useState } from "react";
import api from "@/lib/api";

export default function CreatePost({
  onPostCreated,
}: {
  onPostCreated: () => void;
}) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/post", { content }); // Sends text to backend
      setContent(""); // Clears the box
      onPostCreated(); // Tells the main page to refresh the list
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 bg-slate-50 rounded-lg outline-none resize-none border border-transparent focus:border-slate-200"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button className="bg-black text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-800 transition-all">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
