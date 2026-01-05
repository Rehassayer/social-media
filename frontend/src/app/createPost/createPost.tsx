"use client";
import { useRef, useState } from "react";
import api from "@/lib/api";
import { ImageIcon, Loader2, X } from "lucide-react";

export default function CreatePost({
  onPostCreated,
}: {
  onPostCreated: () => void;
}) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && !image) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      await api.post("/api/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }); // Sends text to backend
      setContent(""); // Clears the box
      setImage(null);
      setPreview(null);
      onPostCreated(); // Tells the main page to refresh the list
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setUploading(false);
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
          rows={3}
        />
        {/* Image Preview Area */}
        {preview && (
          <div className="relative mt-4 mb-4 rounded-2xl overflow-hidden group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setPreview(null);
              }}
              className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-50">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 text-slate-400 hover:text-black transition-colors font-bold text-sm"
          >
            <ImageIcon size={20} />
            <span>Photo</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
          <button
            disabled={uploading || (!content.trim() && !image)}
            className="bg-black text-white px-8 py-2.5 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
          >
            {uploading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Post"
            )}{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
