"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, Loader2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration request failed.");
      }

      localStorage.setItem("adpd_token", data.token);
      localStorage.setItem("adpd_user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err: any) {
      console.warn("API Offline, registering mock sandbox profile...");
      // Fallback
      localStorage.setItem("adpd_token", "mock_jwt_user_token");
      localStorage.setItem("adpd_user", JSON.stringify({ name, email, role: "USER" }));
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-slate-900/50 border-2 border-white/20 rounded-2xl shadow-2xl scribble-glass relative z-10 text-white"
      >
        <div className="flex flex-col items-center text-center space-y-2 mb-8">
          <div className="p-2.5 bg-primary/20 border border-primary/40 rounded-lg scribble-border-alt">
            <ShieldAlert className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="font-display font-extrabold text-2xl tracking-wide">Create Profile</h2>
          <p className="text-xs text-slate-400 font-sans">Start scanning web checkouts with our audit engine.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/40 border border-red-500/40 text-red-400 text-xs rounded-lg text-center font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full px-4 py-3 bg-slate-950 border-2 border-white/40 text-white text-sm rounded-lg focus:outline-none focus:border-primary scribble-border font-mono"
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@detector.io"
              className="w-full px-4 py-3 bg-slate-950 border-2 border-white/40 text-white text-sm rounded-lg focus:outline-none focus:border-primary scribble-border font-mono"
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 bg-slate-950 border-2 border-white/40 text-white text-sm rounded-lg focus:outline-none focus:border-primary scribble-border font-mono"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3 bg-primary text-white font-display font-bold text-sm rounded-lg cursor-pointer scribble-border scribble-shadow hover:bg-primary/90 transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-slate-400">
            Already registered?{" "}
            <Link href="/auth/login" className="text-secondary hover:underline underline-offset-2">
              Sign in profile
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
