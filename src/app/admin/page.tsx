"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Cpu, Users, Layers, AlertCircle, ShieldCheck, Server, RefreshCw, BarChart2, Plus, Terminal } from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [usersList, setUsersList] = useState<UserItem[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 1420,
    totalScans: 12042,
    avgScore: 68,
    serverUptime: "99.98%"
  });

  useEffect(() => {
    // Validate role
    const cachedUser = localStorage.getItem("adpd_user");
    if (!cachedUser) {
      router.push("/auth/login");
      return;
    }
    const parsed = JSON.parse(cachedUser);
    if (parsed.role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }
    setIsAdmin(true);

    // Fetch database admin values
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("adpd_token");
        const res = await fetch("http://localhost:5000/api/admin/stats", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setStats({
            totalUsers: data.totalUsers || 1420,
            totalScans: data.totalScans || 12042,
            avgScore: data.averageScore || 68,
            serverUptime: "99.99%"
          });
        }
      } catch (err) {
        console.warn("API Offline, loaded mock database items.");
      }
    };

    fetchAdminData();

    setUsersList([
      { id: "1", name: "Agastya Admin", email: "admin@detector.io", role: "ADMIN", createdAt: "2026-05-10" },
      { id: "2", name: "Jane Doe", email: "user@detector.io", role: "USER", createdAt: "2026-06-12" },
      { id: "3", name: "John Smith", email: "john@smith.com", role: "USER", createdAt: "2026-06-14" },
      { id: "4", name: "Alice Cooper", email: "alice@cooper.com", role: "USER", createdAt: "2026-06-18" }
    ]);
  }, [router]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-red-400 font-mono text-sm">
        🔒 Error. Access Denied. Administrator credentials required. Redirecting...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white p-6 md:p-12 relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="w-full max-w-5xl space-y-8 relative z-10">
        
        {/* Back Link */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-3xl font-display font-extrabold text-cyan-400 flex items-center justify-center sm:justify-start gap-2.5">
            <Cpu className="w-8 h-8 text-cyan-400" />
            Admin Operations Panel
          </h1>
          <p className="text-xs text-slate-400 font-sans">
            Monitor API platform traffic, inspect user tables, and toggle global rate parameters.
          </p>
        </div>

        {/* Global metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-slate-900/60 border-2 border-white/20 rounded-xl scribble-border flex gap-4 items-center">
            <div className="p-2 border border-cyan-400 rounded bg-slate-950 text-cyan-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-mono text-slate-500 font-bold">Total users</span>
              <h4 className="text-xl font-display font-black text-white">{stats.totalUsers}</h4>
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border-2 border-white/20 rounded-xl scribble-border flex gap-4 items-center">
            <div className="p-2 border border-primary rounded bg-slate-950 text-primary">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-mono text-slate-500 font-bold">Total scans</span>
              <h4 className="text-xl font-display font-black text-white">{stats.totalScans}</h4>
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border-2 border-white/20 rounded-xl scribble-border flex gap-4 items-center">
            <div className="p-2 border border-emerald-400 rounded bg-slate-950 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-mono text-slate-500 font-bold">Ethical avg</span>
              <h4 className="text-xl font-display font-black text-white">{stats.avgScore}%</h4>
            </div>
          </div>

          <div className="p-5 bg-slate-900/60 border-2 border-white/20 rounded-xl scribble-border flex gap-4 items-center">
            <div className="p-2 border border-accent rounded bg-slate-950 text-accent">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-mono text-slate-500 font-bold">Server status</span>
              <h4 className="text-xl font-display font-black text-white">{stats.serverUptime}</h4>
            </div>
          </div>
        </div>

        {/* Dashboard Charts & Splitting */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* User management list */}
          <div className="lg:col-span-7 p-6 bg-slate-905/60 border-2 border-white/20 rounded-2xl scribble-border space-y-4">
            <h3 className="font-display font-bold text-sm text-slate-200">Registered Accounts</h3>
            
            <div className="divide-y divide-slate-800 space-y-2.5 max-h-[300px] overflow-y-auto pr-2">
              {usersList.map((usr) => (
                <div key={usr.id} className="flex justify-between items-center py-2 text-xs">
                  <div className="space-y-0.5">
                    <h5 className="font-bold text-white">{usr.name}</h5>
                    <span className="text-[10px] text-slate-500 font-mono">{usr.email}</span>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-[10px]">
                    <span className={`px-2 py-0.5 border rounded uppercase font-bold ${
                      usr.role === "ADMIN" ? "border-cyan-500/40 text-cyan-400 bg-cyan-950/20" : "border-slate-800 text-slate-400"
                    }`}>
                      {usr.role}
                    </span>
                    <span className="text-slate-500">{usr.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Config parameters settings */}
          <div className="lg:col-span-5 p-6 bg-slate-950/40 border-2 border-white/20 rounded-2xl scribble-border space-y-6">
            <h3 className="font-display font-bold text-sm text-slate-200">Rate Limiting Parameters</h3>
            
            <div className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <span className="text-slate-400 block font-semibold">Max Daily Scans per IP:</span>
                <input type="number" defaultValue={100} className="w-full px-3 py-2 bg-slate-900 border border-white/20 rounded text-white font-mono" />
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block font-semibold">Image file weight limit (MB):</span>
                <input type="number" defaultValue={5} className="w-full px-3 py-2 bg-slate-900 border border-white/20 rounded text-white font-mono" />
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block font-semibold">Audit Model Target Engine:</span>
                <select className="w-full px-3 py-2 bg-slate-900 border border-white/20 rounded text-white font-mono">
                  <option>gpt-4o-mini (Current)</option>
                  <option>gpt-4 (High Cost)</option>
                  <option>Local Random Forest (Offline)</option>
                </select>
              </div>
            </div>

            <button className="w-full py-2 bg-cyan-400 text-slate-950 text-xs font-display font-black rounded scribble-border shadow cursor-pointer uppercase tracking-wider">
              Save configurations
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
