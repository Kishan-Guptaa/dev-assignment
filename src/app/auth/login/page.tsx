"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, Key, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // API Login
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login validation failed.");
      }

      // Cache token
      localStorage.setItem("adpd_token", data.token);
      localStorage.setItem("adpd_user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err: any) {
      console.warn("API Offline, fallback to local login...");
      // Standard demo credential bypass
      if (email === "user@detector.io" && password === "userpassword123") {
        localStorage.setItem("adpd_token", "mock_jwt_user_token");
        localStorage.setItem("adpd_user", JSON.stringify({ name: "Jane Doe", email, role: "USER" }));
        router.push("/dashboard");
      } else if (email === "admin@detector.io" && password === "adminpassword123") {
        localStorage.setItem("adpd_token", "mock_jwt_admin_token");
        localStorage.setItem("adpd_user", JSON.stringify({ name: "Agastya Admin", email, role: "ADMIN" }));
        router.push("/admin");
      } else {
        setError(err.message || "Invalid credentials. Use user@detector.io / userpassword123");
      }
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
        {/* Logo header */}
        <div className="flex flex-col items-center text-center space-y-2 mb-8">
          <div className="p-2.5 bg-primary/20 border border-primary/40 rounded-lg scribble-border-alt">
            <ShieldAlert className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="font-display font-extrabold text-2xl tracking-wide">Welcome Back</h2>
          <p className="text-xs text-slate-400 font-sans">Enter credentials to access your dark pattern portal.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/40 border border-red-500/40 text-red-400 text-xs rounded-lg text-center font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
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
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-3">
          <p className="text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-secondary hover:underline underline-offset-2">
              Create free profile
            </Link>
          </p>
          <div className="p-3 bg-slate-950/40 border border-dashed border-white/10 rounded-lg text-[10px] text-slate-500 font-mono space-y-1 text-left leading-relaxed">
            <div className="flex items-center gap-1 text-slate-400 font-bold uppercase">
              <Key className="w-3.5 h-3.5 text-accent" />
              <span>Sandbox Access keys:</span>
            </div>
            <div>User login: <strong className="text-white">user@detector.io</strong> / <strong className="text-white">userpassword123</strong></div>
            <div>Admin login: <strong className="text-white">admin@detector.io</strong> / <strong className="text-white">adminpassword123</strong></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
