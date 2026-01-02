"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/register", { name, email, password });
      alert("Registration successful! Welcome to Social Feed.");
      router.push("/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDFDFD] text-slate-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-black rounded-xl shadow-lg shadow-black/20">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="text-slate-500 mt-2">
            Join the next generation of social connection.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 border border-slate-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5 ml-1 text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all placeholder:text-slate-400"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 ml-1 text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all placeholder:text-slate-400"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 ml-1 text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all placeholder:text-slate-400"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xl shadow-black/10 disabled:opacity-50 mt-2"
            >
              {loading ? "Creating account..." : "Get Started"}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Already a member?{" "}
              <Link
                href="/login"
                className="font-bold text-black hover:underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-xs text-slate-400">
          By registering, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
