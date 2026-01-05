"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import PostCard from "@/components/PostCard";
import CreatePost from "./createPost/createPost";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface UserType {
  name: string;
  email: string;
}

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);

  const fetchUser = async () => {
    try {
      const res = await api.get("/api/user/profile");
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await api.get("/api/post");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUser();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-black selection:text-white">
      {/* 1. Elegant Minimal Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={"/dashboard"}>
            <span className="text-xl font-black tracking-tighter uppercase italic">
              Social Feed.
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href={"/profilePage"}>
              <button className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center text-xs font-black shadow-lg shadow-black/10 hover:scale-105 transition-all active:scale-95">
                {user ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  <Loader2 size={14} className="animate-spin" />
                )}
              </button>{" "}
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* 3. Create Post Section */}
        <section className="mb-16">
          <CreatePost onPostCreated={fetchPosts} />
        </section>

        {/* 4. The Feed */}
        <div className="space-y-12">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-6 h-6 border-2 border-slate-300 border-t-black rounded-full animate-spin" />
            </div>
          ) : posts.length > 0 ? (
            posts.map((post: any) => (
              <div
                key={post.id}
                className="group animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                <PostCard post={post} />
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-400 font-medium text-lg">
                Your feed is quiet today.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
