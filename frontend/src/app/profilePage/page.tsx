"use client";
import { useState } from "react";
import { Settings, User, LogOut, Edit3, ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // Example User State (Replace with your global user context)
  const [userData, setUserData] = useState({
    name: "Alex Rivera",
    email: "alex@example.com",
    bio: "Digital minimalist and designer.",
  });

  const handleLogout = () => {
    localStorage.removeItem("token"); // or your specific logout logic
    router.push("/login");
  };

  return (
    <div className="max-w-2xl mx-auto pt-12 pb-24 px-4">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-24 h-24 rounded-[32px] bg-black text-white flex items-center justify-center text-3xl font-black mb-4 shadow-xl">
          {userData.name.charAt(0)}
        </div>
        <h1 className="text-2xl font-black text-slate-900">{userData.name}</h1>
        <p className="text-slate-400 text-sm font-medium">{userData.email}</p>
      </div>

      {/* 2. ACTIONS LIST */}
      <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
        {/* Edit Profile */}
        <button
          onClick={() => setEditModalOpen(true)}
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

        {/* Settings */}
        <button className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors border-b border-slate-50 group">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-slate-100 rounded-xl text-slate-500">
              <Settings size={20} />
            </div>
            <span className="font-bold text-slate-700">Account Settings</span>
          </div>
          <ChevronRight
            size={18}
            className="text-slate-300 group-hover:translate-x-1 transition-transform"
          />
        </button>

        {/* Logout */}
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

      {/* 3. EDIT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black">Edit Profile</h2>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <form className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={userData.name}
                  className="w-full mt-1 bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-black transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={userData.email}
                  className="w-full mt-1 bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-black transition-all"
                />
              </div>
              <button className="w-full bg-black text-white rounded-2xl py-4 font-bold hover:bg-slate-800 transition-all shadow-lg shadow-black/10">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
