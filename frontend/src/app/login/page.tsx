"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/login", { email, password });
      router.push("/");
      router.refresh();
    } catch (error) {
      alert("Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDFDFD] text-slate-900 px-4">
      <div className="w-full max-w-md">
        {/* Brand Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-black rounded-xl shadow-lg shadow-black/20">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-slate-500 mt-2">
            Enter your credentials to access your feed.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 border border-slate-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5 ml-1 text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all placeholder:text-slate-400"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <Link
                  href="/forgetPassword"
                  className="text-xs font-bold text-black hover:underline underline-offset-4"
                >
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
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
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              New to Social Feed?{" "}
              <Link
                href="/register"
                className="font-bold text-black hover:underline underline-offset-4"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Secure encrypted login
        </p>
      </div>
    </div>
  );
}
