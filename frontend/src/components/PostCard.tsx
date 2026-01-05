"use client";
import api from "@/lib/api";
import {
  Heart,
  MessageCircle,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

interface PostProps {
  post: {
    id: number;
    content: string;
    createdAt: string;
    user: {
      name: string;
    };
  };
}

export default function PostCard({ post }: any) {
  const [likes, setLikes] = useState<number>(post._count?.likes || 0);
  const [isLiked, setIsLiked] = useState<boolean>(post.isLikedByUser || false);
  const [loading, setLoading] = useState(false);

  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<any[]>(post.comments || []); //initial comments if any

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return past.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  const handleLike = async () => {
    if (loading) return; //prevent double clicking
    setLoading(true);

    try {
      //calling api from backend
      const res = await api.post(`/newlike/${post.id}`);

      console.log("Backend responses data: ", res.data);

      //upadte ui based on backend response
      if (res.data.status === "liked") {
        setLikes((prev) => prev + 1);
        setIsLiked(true);
      } else if (res.data.status === "unliked") {
        setLikes((prev) => Math.max(0, prev - 1));
        setIsLiked(false);
      }
    } catch (error) {
      console.error("like failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      const res = await api.post(`/comments/${post.id}`, {
        content: commentText,
      });

      const newComment = {
        ...res.data,
        createdAt: res.data.createdAt || new Date().toISOString(),
      };

      setComments((prev) => [...prev, newComment]);
      setCommentText("");
    } catch (error) {
      console.error("Comment Failed", error);
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm flex flex-col">
      {/* 1. POST BODY SECTION */}
      <div className="p-6">
        {/* TOP: Minimalist Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              <span className="font-bold text-slate-400">
                {post.user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 tracking-tight">
                {post.user?.name}
              </p>
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.15em] mt-0.5">
                {new Date(post.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <MoreHorizontal className="text-slate-300" size={18} />
          </button>
        </div>

        {/* MIDDLE: Content Area */}
        <div className="mb-6">
          <p className="text-slate-700 text-[15px] leading-[1.8] font-medium tracking-wide mb-4">
            {post.content}
          </p>

          {/* IMAGE SECTION: Added this to handle  new upload feature */}
          {post.imageUrl && (
            <div className="rounded-2xl overflow-hidden border border-slate-50 bg-slate-50">
              <img
                src={`http://localhost:8010/${post.imageUrl}`}
                alt="Post"
                className="w-full h-auto max-h-[400px] object-cover"
              />
            </div>
          )}
        </div>

        {/* BOTTOM: Interactions Row */}
        <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
          <button
            onClick={handleLike}
            disabled={loading}
            className="flex items-center gap-2 group"
          >
            <div className="p-2 rounded-xl group-hover:bg-red-50 transition-colors">
              <Heart
                size={20}
                className={`transition-all ${
                  isLiked
                    ? "text-red-500 fill-red-500"
                    : "text-slate-400 group-hover:text-red-500"
                }`}
              />
            </div>
            <span
              className={`text-xs font-bold ${
                isLiked ? "text-red-500" : "text-slate-400"
              }`}
            >
              {likes}
            </span>
          </button>

          <button
            onClick={() => setShowComment(!showComment)}
            className="flex items-center gap-2 group/comment"
          >
            <div
              className={`p-2 rounded-xl transition-colors ${
                showComment ? "bg-blue-50" : "group-hover/comment:bg-blue-50"
              }`}
            >
              <MessageCircle
                size={20}
                className={
                  showComment
                    ? "text-blue-500"
                    : "text-slate-400 group-hover/comment:text-blue-500"
                }
              />
            </div>
            <span className="text-xs font-bold text-slate-400 group-hover:text-blue-500">
              {comments.length}
            </span>
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC COMMENT SECTION: Moved OUTSIDE the padding for a split-level look */}
      {showComment && (
        <div className="w-full bg-slate-50/50 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-6">
            <div className="space-y-5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {comments.length > 0 ? (
                comments.map((c: any, index: number) => (
                  <div key={c.id || index} className="flex gap-3 group/item">
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex-shrink-0 flex items-center justify-center shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400">
                        {c.user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-black text-slate-900">
                          {c.user?.name}
                        </span>
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">
                          {formatRelativeTime(c.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed bg-white/50 p-2 rounded-lg inline-block">
                        {c.content}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-center py-4 text-slate-400 font-medium italic">
                  No thoughts yet.
                </p>
              )}
            </div>

            <form onSubmit={handleCommentsSubmit} className="mt-6 relative">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a thought..."
                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs outline-none focus:border-black focus:ring-1 focus:ring-black/5 transition-all pr-16 shadow-sm"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-black hover:text-slate-600 disabled:text-slate-300 p-2"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
