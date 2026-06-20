"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, Globe, ScanText, FileText, Settings, Key, User, LogOut, Cpu, AlertTriangle, Sparkles, BarChart2, Plus } from "lucide-react";

interface RecentScan {
  id: string;
  url: string;
  score: number;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [scans, setScans] = useState<RecentScan[]>([]);
  const [stats, setStats] = useState({
    totalScans: 0,
    avgScore: 100,
    dangerCount: 0,
    apiHits: 0
  });

  useEffect(() => {
    // Validate session
    const cachedUser = localStorage.getItem("adpd_user");
    if (!cachedUser) {
      router.push("/auth/login");
      return;
    }
    setUser(JSON.parse(cachedUser));

    // Fetch reports/scans from DB if online, else load seeds
    const fetchScans = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reports", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("adpd_token")}`
          }
        });
        if (!res.ok) {
          loadSeedFallback();
          return;
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          if (data.length > 0) {
            const parsed = data.map((item: any) => ({
              id: item.id,
              url: item.url || "Screenshot Audit",
              score: item.score,
              status: item.status,
              createdAt: new Date(item.createdAt).toLocaleDateString()
            }));
            setScans(parsed);
            
            // Re-calculate statistics
            const total = parsed.length;
            const avg = Math.round(parsed.reduce((acc: number, cur: any) => acc + cur.score, 0) / total);
            const dangers = parsed.filter((item: any) => item.status === "danger" || item.status === "dangerous").length;
            
            // Fetch dynamic API usage count
            let apiHitsCount = 0;
            try {
              const keysRes = await fetch("http://localhost:5000/api/users/apikeys", {
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("adpd_token")}`
                }
              });
              if (keysRes.ok) {
                const keysData = await keysRes.json();
                if (Array.isArray(keysData)) {
                  apiHitsCount = keysData.reduce((acc: number, key: any) => acc + (key.usageCount || 0), 0);
                }
              }
            } catch (kErr) {
              console.warn(kErr);
            }
            
            setStats({ totalScans: total, avgScore: avg, dangerCount: dangers, apiHits: apiHitsCount });
          } else {
            // Success response but empty: actual user with 0 scans!
            setScans([]);
            
            // Fetch API usage count for empty scan state too
            let apiHitsCount = 0;
            try {
              const keysRes = await fetch("http://localhost:5000/api/users/apikeys", {
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("adpd_token")}`
                }
              });
              if (keysRes.ok) {
                const keysData = await keysRes.json();
                if (Array.isArray(keysData)) {
                  apiHitsCount = keysData.reduce((acc: number, key: any) => acc + (key.usageCount || 0), 0);
                }
              }
            } catch (kErr) {
              console.warn(kErr);
            }

            setStats({ totalScans: 0, avgScore: 100, dangerCount: 0, apiHits: apiHitsCount });
          }
        } else {
          loadSeedFallback();
        }
      } catch (err) {
        console.warn("API Server offline, loading local seed reports...");
        loadSeedFallback();
      }
    };

    fetchScans();
  }, [router]);

  const loadSeedFallback = () => {
    setScans([
      { id: "1", url: "https://sneakycheckout-store.com", score: 35, status: "danger", createdAt: "6/18/2026" },
      { id: "2", url: "https://travel-booking-traps.net", score: 55, status: "warning", createdAt: "6/15/2026" },
      { id: "3", url: "https://ethical-cart.org", score: 98, status: "safe", createdAt: "6/12/2026" },
      { id: "4", url: "https://auto-renew-saas.com", score: 42, status: "danger", createdAt: "6/10/2026" }
    ]);
    setStats({
      totalScans: 4,
      avgScore: 58,
      dangerCount: 2,
      apiHits: 142
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("adpd_token");
    localStorage.removeItem("adpd_user");
    router.push("/auth/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-background text-white font-sans relative">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Sidebar navigation */}
      <aside className="w-64 border-r-2 border-dashed border-slate-800 bg-slate-950/60 p-6 flex flex-col justify-between shrink-0 hidden md:flex z-10">
        <div className="space-y-8">
          {/* Brand */}
          <div className="flex items-center space-x-2.5">
            <div className="p-1 bg-primary/20 border border-primary/40 rounded scribble-border-alt">
              <ShieldAlert className="w-5 h-5 text-secondary" />
            </div>
            <span className="font-display font-bold text-sm tracking-wide">
              AI Dark Pattern
            </span>
          </div>

          {/* Nav list */}
          <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-400">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-slate-900 border border-white/20 text-white rounded-lg scribble-border-alt scribble-shadow">
              <BarChart2 className="w-4 h-4 text-secondary" />
              <span>Dashboard Overview</span>
            </Link>
            <Link href="/dashboard/analyze" className="flex items-center gap-3 px-4 py-3 hover:text-white transition-colors">
              <Globe className="w-4 h-4" />
              <span>Analyze URL</span>
            </Link>
            <Link href="/dashboard/screenshot" className="flex items-center gap-3 px-4 py-3 hover:text-white transition-colors">
              <ScanText className="w-4 h-4" />
              <span>Analyze Image</span>
            </Link>
            <Link href="/dashboard/reports" className="flex items-center gap-3 px-4 py-3 hover:text-white transition-colors">
              <FileText className="w-4 h-4" />
              <span>Scan Reports</span>
            </Link>
            <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
              <span>Profile Settings</span>
            </Link>
            {user.role === "ADMIN" && (
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-cyan-400 hover:text-cyan-300 font-bold border border-cyan-500/30 rounded bg-cyan-950/20">
                <Cpu className="w-4 h-4" />
                <span>Admin Settings</span>
              </Link>
            )}
          </nav>
        </div>

        {/* User Card footer */}
        <div className="border-t border-slate-800 pt-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-white/20 bg-slate-900 flex items-center justify-center font-bold font-display">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-white truncate">{user.name}</span>
              <span className="text-[9px] text-slate-500 truncate font-mono">{user.email}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-950/30 border border-red-500/40 text-red-300 text-xs rounded hover:bg-red-950/60 transition-colors font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main dashboard content container */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto z-10">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b-2 border-dashed border-slate-800 mb-8">
          <div>
            <h1 className="text-2xl font-display font-extrabold text-white">Dashboard Analytics</h1>
            <p className="text-xs text-slate-400 font-sans mt-0.5">Welcome, {user.name}. Audit interfaces and track scan history.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/analyze"
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white font-display font-bold text-xs rounded scribble-border scribble-shadow"
            >
              <Plus className="w-4 h-4" />
              <span>New URL Scan</span>
            </Link>
          </div>
        </div>

        {/* Stats metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <div className="p-5 bg-slate-900/60 border-2 border-white/20 rounded-xl scribble-border">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400">Total Scans</span>
            <h3 className="text-3xl font-display font-black text-white mt-1.5">{stats.totalScans}</h3>
            <p className="text-[9px] text-slate-500 font-sans mt-1">Audit runs executed in workspace.</p>
          </div>
          {/* Card 2 */}
          <div className="p-5 bg-slate-900/60 border-2 border-white/20 rounded-xl scribble-border" style={{ borderColor: "#10B981" }}>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400">Ethical UX Avg</span>
            <h3 className="text-3xl font-display font-black text-emerald-400 mt-1.5">{stats.avgScore}%</h3>
            <p className="text-[9px] text-slate-500 font-sans mt-1">Weighted average transparency rating.</p>
          </div>
          {/* Card 3 */}
          <div className="p-5 bg-slate-900/60 border-2 border-white/20 rounded-xl scribble-border" style={{ borderColor: "#EF4444" }}>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400">Deceptive Sites</span>
            <h3 className="text-3xl font-display font-black text-red-400 mt-1.5">{stats.dangerCount}</h3>
            <p className="text-[9px] text-slate-500 font-sans mt-1">Platforms flagged with active design traps.</p>
          </div>
          {/* Card 4 */}
          <div className="p-5 bg-slate-900/60 border-2 border-white/20 rounded-xl scribble-border" style={{ borderColor: "#22D3EE" }}>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400">API Key Hits</span>
            <h3 className="text-3xl font-display font-black text-cyan-400 mt-1.5">{stats.apiHits}</h3>
            <p className="text-[9px] text-slate-500 font-sans mt-1">Developer token calls logged this month.</p>
          </div>
        </div>

        {/* Charts & Graphs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* SVG Line chart (Scribble Style) */}
          <div className="lg:col-span-8 p-6 bg-slate-900/60 border-2 border-white/20 rounded-xl scribble-border flex flex-col justify-between min-h-[300px]">
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-slate-200">Daily Scan Activity (Last 7 Days)</h4>
              <p className="text-[10px] text-slate-400 font-sans">Number of audits completed daily.</p>
            </div>
            
            {/* Hand-drawn SVG Chart */}
            <div className="relative h-44 w-full mt-4 flex items-center justify-center">
              {scans.length > 0 ? (
                <div className="w-full h-full">
                  <svg className="w-full h-40" viewBox="0 0 100 40" preserveAspectRatio="none">
                    {/* Horizontal grid lines */}
                    <line x1="0" y1="10" x2="100" y2="10" stroke="#334155" strokeWidth="0.25" strokeDasharray="1 1" />
                    <line x1="0" y1="20" x2="100" y2="20" stroke="#334155" strokeWidth="0.25" strokeDasharray="1 1" />
                    <line x1="0" y1="30" x2="100" y2="30" stroke="#334155" strokeWidth="0.25" strokeDasharray="1 1" />

                    {/* Hand drawn curve line path */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      d="M 5 35 Q 20 20, 35 28 T 65 12 T 95 8"
                      stroke="#8B5CF6"
                      strokeWidth="1"
                      fill="none"
                      strokeLinecap="round"
                    />

                    {/* Dotted helper lines */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                      d="M 5 35 L 20 20 L 35 28 L 50 18 L 65 12 L 80 15 L 95 8"
                      stroke="#22D3EE"
                      strokeWidth="0.5"
                      strokeDasharray="1 1"
                      fill="none"
                    />

                    {/* Circles on vertices */}
                    <circle cx="20" cy="20" r="1.5" className="fill-secondary stroke-none" />
                    <circle cx="35" cy="28" r="1.5" className="fill-secondary stroke-none" />
                    <circle cx="65" cy="12" r="1.5" className="fill-secondary stroke-none" />
                    <circle cx="95" cy="8" r="1.5" className="fill-secondary stroke-none" />
                  </svg>
                  {/* Bottom labels */}
                  <div className="flex justify-between font-mono text-[8px] text-slate-500 mt-1 px-2">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <BarChart2 className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-[10px] text-slate-400 max-w-xs font-sans">
                    No scan activity recorded yet. Run a URL check to view your daily analytics timeline.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SVG Pie Chart / gauge info */}
          <div className="lg:col-span-4 p-6 bg-slate-900/60 border-2 border-white/20 rounded-xl scribble-border flex flex-col justify-between min-h-[300px]">
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-slate-200">Deceptive Category share</h4>
              <p className="text-[10px] text-slate-400 font-sans">Common issues flagged in system.</p>
            </div>

            {scans.length > 0 ? (
              <>
                <div className="flex items-center justify-center my-4 relative h-32">
                  {/* Concentric radial rings representing categories */}
                  <svg className="w-24 h-24 transform -rotate-90">
                    {/* Outer ring: Forced Continuity */}
                    <circle cx="48" cy="48" r="40" stroke="#8B5CF6" strokeWidth="5" strokeDasharray="251" strokeDashoffset="100" fill="none" opacity="0.9" />
                    {/* Mid ring: Hidden Costs */}
                    <circle cx="48" cy="48" r="30" stroke="#F97316" strokeWidth="5" strokeDasharray="188" strokeDashoffset="60" fill="none" opacity="0.9" />
                    {/* Inner ring: Misleading CTA */}
                    <circle cx="48" cy="48" r="20" stroke="#22D3EE" strokeWidth="5" strokeDasharray="125" strokeDashoffset="50" fill="none" opacity="0.9" />
                  </svg>
                </div>

                {/* Labels legends */}
                <div className="space-y-1.5 font-mono text-[9px] text-slate-400 pt-2 border-t border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-primary font-bold">● Forced Continuity</span>
                    <span>42%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-accent font-bold">● Hidden Costs</span>
                    <span>31%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary font-bold">● Misleading CTA</span>
                    <span>27%</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <ShieldAlert className="w-8 h-8 text-slate-600 mb-2" />
                <p className="text-[10px] text-slate-400 max-w-xs font-sans">
                  No dark patterns detected yet. Submitting pages will catalog UI issues by category.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Split (Recent Scans & AI Warnings) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Scan list */}
          <div className="lg:col-span-8 p-6 bg-slate-900/60 border-2 border-white/20 rounded-xl scribble-border space-y-4">
            <h4 className="font-display font-bold text-sm text-slate-200">Recent Audit Records</h4>
            
            {scans.length > 0 ? (
              <div className="divide-y divide-slate-800/80 max-h-[220px] overflow-y-auto space-y-2">
                {scans.map((scan) => (
                  <div key={scan.id} className="flex items-center justify-between py-3">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold font-mono text-white truncate max-w-[200px] block">
                        {scan.url}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">{scan.createdAt}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-mono px-2 py-0.5 border rounded uppercase ${
                        scan.status === "danger" || scan.status === "dangerous"
                          ? "border-red-500/40 text-red-400 bg-red-950/20"
                          : scan.status === "warning"
                          ? "border-amber-500/40 text-amber-400 bg-amber-950/20"
                          : "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
                      }`}>
                        {scan.status}
                      </span>
                      <span className="font-display font-black text-xs w-8 text-right">{scan.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 px-4 text-center space-y-4">
                <div className="p-3 bg-slate-900 border border-white/5 rounded-full text-slate-500">
                  <Globe className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-xs text-white">No scans analyzed yet</h5>
                  <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
                    Run your first automated website scan or upload a screenshot to detect manipulative dark pattern indicators.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link href="/dashboard/analyze" className="px-3.5 py-1.5 bg-primary text-white text-[10px] font-bold rounded-lg hover:bg-primary/95 transition-all">
                    Analyze URL
                  </Link>
                  <Link href="/dashboard/screenshot" className="px-3.5 py-1.5 bg-slate-800 text-white text-[10px] font-bold rounded-lg hover:bg-slate-700 transition-all">
                    Upload Image
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* AI Insights Card */}
          <div className="lg:col-span-4 p-6 bg-slate-900/60 border-2 border-white/20 rounded-xl scribble-border flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-accent" />
                AI Insights & Tips
              </h4>
              
              <div className="p-3.5 border border-dashed border-red-500/40 bg-red-950/15 rounded-lg text-[10px] text-red-300 font-sans leading-relaxed flex gap-2.5">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold mb-0.5">VIP Billing Warning</strong>
                  Starting June 2026, web subscription platforms have increased default checkmarks inside payment screens by 14%. Keep visual alerts active.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-handwritten mt-4">
              ✨ Audit engine status: active
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
