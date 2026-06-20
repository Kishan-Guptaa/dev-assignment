"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Key, Shield, Plus, Copy, Check, Info } from "lucide-react";
import confetti from "canvas-confetti";

interface ApiKey {
  id: string;
  key: string;
  hits: number;
  createdAt: string;
}

export default function ProfileSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  useEffect(() => {
    // Validate session
    const cachedUser = localStorage.getItem("adpd_user");
    if (!cachedUser) {
      router.push("/auth/login");
      return;
    }
    setUser(JSON.parse(cachedUser));

    // Fetch API keys
    const fetchKeys = async () => {
      try {
        const token = localStorage.getItem("adpd_token");
        const res = await fetch("http://localhost:5000/api/users/apikeys", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setKeys(data);
        } else {
          loadMockKey();
        }
      } catch (err) {
        console.warn("API Offline, loading fallback API keys...");
        loadMockKey();
      }
    };

    fetchKeys();
  }, [router]);

  const loadMockKey = () => {
    setKeys([
      { id: "k-1", key: "adpd_live_a89fd92bc9f20109ae9bc", hits: 142, createdAt: "2026-06-12" }
    ]);
  };

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    try {
      const token = localStorage.getItem("adpd_token");
      const res = await fetch("http://localhost:5000/api/users/apikeys", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setKeys((prev) => [...prev, data]);
        confetti({
          particleCount: 40,
          colors: ["#22D3EE", "#8B5CF6"]
        });
      }
    } catch (err) {
      // Mock create local key
      const newKey = {
        id: `k-${Date.now()}`,
        key: `adpd_live_${Math.random().toString(36).substring(2) + Date.now().toString(36)}`,
        hits: 0,
        createdAt: new Date().toISOString().split("T")[0]
      };
      setKeys((prev) => [...prev, newKey]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 1500);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-white p-6 md:p-12 relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="w-full max-w-4xl space-y-8 relative z-10">
        
        {/* Back Link */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-3xl font-display font-extrabold text-white flex items-center justify-center sm:justify-start gap-2.5">
            <User className="w-8 h-8 text-secondary" />
            Profile & Developer Settings
          </h1>
          <p className="text-xs text-slate-400 font-sans">
            Manage your credentials, subscription level, and active API keys.
          </p>
        </div>

        {/* Profiles grids */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* User info & billing */}
          <div className="md:col-span-5 space-y-6">
            {/* User card */}
            <div className="p-6 bg-slate-900/60 border-2 border-white/20 rounded-2xl scribble-border space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-200">Account Details</h3>
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-slate-500 block">NAME</span>
                  <span className="text-slate-100 text-sm font-bold">{user.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">EMAIL ADDRESS</span>
                  <span className="text-slate-100 text-sm font-bold">{user.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">ACCOUNT ROLE</span>
                  <span className="text-cyan-400 font-black uppercase text-sm tracking-wider">{user.role}</span>
                </div>
              </div>
            </div>

            {/* Billing card */}
            <div className="p-6 bg-slate-900/60 border-2 border-white/20 rounded-2xl scribble-border space-y-4" style={{ borderColor: "#8B5CF6" }}>
              <div className="flex justify-between items-center">
                <h3 className="font-display font-bold text-sm text-slate-200">Subscription Tier</h3>
                <span className="text-[9px] font-mono bg-primary/20 border border-primary text-primary px-2 py-0.5 rounded uppercase font-bold">
                  Active
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-display font-black text-white">Free Sandbox Plan</h4>
                <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                  Allows up to 25 page crawls/month and 5 screenshot uploads. Access developer APIs with rate-limited keys.
                </p>
              </div>
              <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border-2 border-white/40 scribble-border shadow cursor-pointer">
                Upgrade to Professional ($19/mo)
              </button>
            </div>
          </div>

          {/* Developer API keys */}
          <div className="md:col-span-7 p-6 bg-slate-950/40 border-2 border-white/20 rounded-2xl scribble-border space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="font-display font-bold text-sm text-slate-200 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-accent" />
                Developer API Tokens
              </h3>
              <button
                onClick={handleGenerateKey}
                className="px-3 py-1.5 bg-accent hover:bg-accent/90 text-white rounded scribble-border shadow cursor-pointer text-xs font-bold flex items-center gap-1"
                disabled={isGenerating}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Key</span>
              </button>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {keys.length > 0 ? (
                keys.map((k) => (
                  <div key={k.id} className="p-4 bg-slate-900 border border-white/10 rounded-xl flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-slate-500">LIVE KEY</span>
                      <div className="flex items-center gap-4 text-[9px] font-mono text-slate-400">
                        <span>Hits: <strong className="text-white font-bold">{k.hits}</strong></span>
                        <span>Created: {k.createdAt}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between bg-slate-950 p-2 border border-white/10 rounded font-mono text-xs text-slate-300">
                      <span className="truncate max-w-[240px]">{k.key}</span>
                      <button
                        onClick={() => handleCopy(k.id, k.key)}
                        className="p-1 hover:bg-slate-900 rounded text-slate-400 hover:text-white"
                      >
                        {copiedKeyId === k.id ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 border border-dashed border-white/20 rounded-xl text-center text-slate-500 text-xs font-sans">
                  No active developer API tokens generated yet.
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-sans flex gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="leading-normal">
                Use your generated token headers (`x-api-key: your_key`) to integrate AI Dark Pattern Detector metrics inside custom scripts.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
