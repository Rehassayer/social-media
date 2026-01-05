"use client";
import api from "@/lib/api";
import {
  ArrowLeft,
  ChevronRight,
  Edit3,
  Loader2,
  LogOut,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  //user state
  const [user, setUser] = useState({ name: "", email: "" });
  //form state for editing
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/user/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  //handle update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.put("/api/user/profile", formData);
      setUser(res.data.data); //update main ui
      setIsEditModalOpen(false); //close modal
    } catch (err) {
      console.error({ message: "Updated failed !" });
    }
  };

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-400" />
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto pt-12 pb-24 px-4">
      {/* NAVIGATION BACK BAR */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => router.back()} // Uses Next.js navigation to go back
          className="group flex items-center gap-2 text-slate-400 hover:text-black transition-colors"
        >
          <div className="p-2 rounded-full group-hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span className="text-sm font-bold">Back to Feed</span>
        </button>
      </div>
      {/* HEADER */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-24 h-24 rounded-[32px] bg-black text-white flex items-center justify-center text-3xl font-black mb-4 shadow-xl">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-2xl font-black text-slate-900">{user.name}</h1>
        <p className="text-slate-400 text-sm font-medium">{user.email}</p>
      </div>

      {/* Menu */}
      <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors border-b border-slate-50 group"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-500">
              <Edit3 size={20} />
            </div>
            <span className="font-bold text-slate-700">Edit Profile</span>
          </div>
          <ChevronRight
            size={18}
            className="text-slate-300 group-hover:translate-x-1 transition-transform"
          />
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-6 hover:bg-red-50 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-red-100 rounded-xl text-red-500">
              <LogOut size={20} />
            </div>
            <span className="font-bold text-red-600">Sign Out</span>
          </div>
        </button>
      </div>

      {/* Edit modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900">
                Edit Profile
              </h2>
              <button onClick={() => setIsEditModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full mt-1 bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full mt-1 bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white rounded-2xl py-4 font-bold hover:bg-slate-800 transition-all"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
