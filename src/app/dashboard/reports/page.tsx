"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Download, ShieldCheck, AlertTriangle, Search, Printer, Calendar } from "lucide-react";

interface PatternItem {
  category: string;
  text: string;
  severity: string;
  explanation: string;
}

interface ScanReport {
  id: string;
  url: string;
  score: number;
  status: string;
  createdAt: string;
  report?: {
    darkPatterns: PatternItem[];
    recommendations: { pattern: string; fixAdvice: string }[];
  };
}

export default function ReportsHistoryPage() {
  const router = useRouter();
  const [reports, setReports] = useState<ScanReport[]>([]);
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState<ScanReport | null>(null);

  useEffect(() => {
    // Validate session
    const cachedUser = localStorage.getItem("adpd_user");
    if (!cachedUser) {
      router.push("/auth/login");
      return;
    }

    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("adpd_token");
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/api/reports`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item: any) => ({
            id: item.id,
            url: item.url || "Screenshot Audit",
            score: item.score,
            status: item.status,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
            report: item.report ? {
              darkPatterns: item.report.darkPatterns as PatternItem[],
              recommendations: item.report.recommendations as { pattern: string; fixAdvice: string }[]
            } : undefined
          }));
          setReports(formatted);
        } else {
          loadMockHistory();
        }
      } catch (err) {
        console.warn("API Offline, loading history seeds...");
        loadMockHistory();
      }
    };

    fetchReports();
  }, [router]);

  const loadMockHistory = () => {
    setReports([
      {
        id: "1",
        url: "https://sneakycheckout-store.com",
        score: 35,
        status: "danger",
        createdAt: "6/18/2026",
        report: {
          darkPatterns: [
            { category: "Forced Continuity", text: "Subscription option check", severity: "high", explanation: "Pre-checked item hidden inside terms approval." },
            { category: "Hidden Costs", text: "Package care fee $3.99", severity: "medium", explanation: "Appended at final payment confirmation screen." }
          ],
          recommendations: [
            { pattern: "Forced Continuity", fixAdvice: "Remove auto-checked markers and request user consensus." }
          ]
        }
      },
      {
        id: "2",
        url: "https://travel-booking-traps.net",
        score: 55,
        status: "warning",
        createdAt: "6/15/2026",
        report: {
          darkPatterns: [
            { category: "Confirmshaming CTA", text: "No, I hate saving trees", severity: "medium", explanation: "Guilt text link dismissing coupon checks." }
          ],
          recommendations: [
            { pattern: "Confirmshaming CTA", fixAdvice: "Neutralize negative button styling." }
          ]
        }
      },
      {
        id: "3",
        url: "https://ethical-cart.org",
        score: 98,
        status: "safe",
        createdAt: "6/12/2026",
        report: { darkPatterns: [], recommendations: [] }
      }
    ]);
  };

  const handleDownloadPdf = (rep: ScanReport) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to download/print the PDF report.");
      return;
    }

    const reportHtml = `
      <html>
        <head>
          <title>AI Dark Pattern Audit Report - ${rep.url}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #0b1020;
              margin: 40px;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #8b5cf6;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              color: #8b5cf6;
              margin: 0;
            }
            .subtitle {
              font-size: 14px;
              color: #64748b;
              margin-top: 5px;
            }
            .meta-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              background: #f8fafc;
              padding: 20px;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              margin-bottom: 30px;
            }
            .meta-item {
              font-size: 13px;
            }
            .meta-label {
              font-weight: bold;
              color: #475569;
            }
            .score-badge {
              font-size: 18px;
              font-weight: 800;
              color: ${rep.score < 50 ? "#ef4444" : rep.score < 75 ? "#f97316" : "#10b981"};
            }
            .section-title {
              font-size: 15px;
              font-weight: bold;
              color: #0f172a;
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 8px;
              margin-top: 30px;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .pattern-card {
              background: #fff5f5;
              border-left: 4px solid #ef4444;
              padding: 12px 15px;
              margin-bottom: 12px;
              border-radius: 0 8px 8px 0;
            }
            .pattern-card.medium {
              background: #fffbeb;
              border-left-color: #f59e0b;
            }
            .pattern-card.low {
              background: #f0fdf4;
              border-left-color: #10b981;
            }
            .pattern-header {
              font-weight: bold;
              font-size: 13px;
              color: #7f1d1d;
              margin-bottom: 3px;
            }
            .pattern-explanation {
              font-size: 13px;
              color: #451a03;
            }
            .rec-card {
              background: #f0fdf4;
              border-left: 4px solid #10b981;
              padding: 12px 15px;
              margin-bottom: 12px;
              border-radius: 0 8px 8px 0;
            }
            .rec-header {
              font-weight: bold;
              font-size: 13px;
              color: #064e3b;
              margin-bottom: 3px;
            }
            .rec-advice {
              font-size: 13px;
              color: #064e3b;
            }
            .footer {
              text-align: center;
              margin-top: 50px;
              font-size: 11px;
              color: #94a3b8;
              border-top: 1px solid #e2e8f0;
              padding-top: 15px;
            }
            @media print {
              body { margin: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">AI Dark Pattern Detector</div>
            <div class="subtitle">Automated User Interface Integrity & Ethical UX Audit</div>
          </div>
          
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Target Audit Address:</span> <br/>
              <code>${rep.url}</code>
            </div>
            <div class="meta-item">
              <span class="meta-label">Audit Timestamp:</span> <br/>
              ${rep.createdAt}
            </div>
            <div class="meta-item">
              <span class="meta-label">UX Trust Score:</span> <br/>
              <span class="score-badge">${rep.score}%</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Security Classification:</span> <br/>
              <span style="font-weight: bold; color: ${rep.status === "safe" ? "#10b981" : rep.status === "warning" ? "#f59e0b" : "#ef4444"}">
                ${rep.status.toUpperCase()}
              </span>
            </div>
          </div>

          <div class="section-title">Flagged Deceptions & Dark Patterns (${rep.report?.darkPatterns.length || 0})</div>
          ${
            rep.report?.darkPatterns && rep.report.darkPatterns.length > 0
              ? rep.report.darkPatterns
                  .map(
                    (p) => `
                <div class="pattern-card ${p.severity}">
                  <div class="pattern-header">[${p.category.toUpperCase()}] (Severity: ${p.severity})</div>
                  <div class="pattern-explanation">${p.explanation}</div>
                </div>
              `
                  )
                  .join("")
              : '<div style="color: #10b981; font-size: 13px;">✔ UI complies fully with user-centric patterns. No manipulative elements detected.</div>'
          }

          <div class="section-title">Design Recommendations & Remediations</div>
          ${
            rep.report?.recommendations && rep.report.recommendations.length > 0
              ? rep.report.recommendations
                  .map(
                    (r) => `
                <div class="rec-card">
                  <div class="rec-header">Remedy for ${r.pattern}</div>
                  <div class="rec-advice">${r.fixAdvice}</div>
                </div>
              `
                  )
                  .join("")
              : '<div style="color: #475569; font-size: 13px;">No remediations required. Keep maintaining transparent layouts.</div>'
          }

          <div class="footer">
            Report generated automatically by AI Dark Pattern Detector platform. &copy; 2026. All rights reserved.
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(reportHtml);
    printWindow.document.close();
  };

  const filtered = reports.filter((rep) => rep.url.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background text-white p-6 md:p-12 relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="w-full max-w-4xl space-y-8 relative z-10">
        
        {/* Back link */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-display font-extrabold text-white flex items-center gap-2.5">
              <FileText className="w-8 h-8 text-secondary" />
              Audit Reports
            </h1>
            <p className="text-xs text-slate-400 font-sans">
              Manage previous scans, inspect layout variables, and download summaries.
            </p>
          </div>
        </div>

        {/* Filter input */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports by URL..."
            className="w-full pl-12 pr-4 py-3 bg-slate-900 border-2 border-white/40 text-white rounded-lg focus:outline-none focus:border-primary font-mono text-sm scribble-border"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        </div>

        {/* Reports Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* List panel */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 bg-slate-900/60 border border-white/10 rounded-lg font-display font-bold text-xs uppercase tracking-wider text-slate-400">
              Scanned Records List
            </div>

            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
              {filtered.length > 0 ? (
                filtered.map((rep) => (
                  <div
                    key={rep.id}
                    onClick={() => setSelectedReport(rep)}
                    className={`p-4 bg-slate-900/40 border-2 rounded-xl cursor-pointer hover:bg-slate-900 transition-all scribble-shadow flex items-center justify-between ${
                      selectedReport?.id === rep.id ? "border-primary" : "border-white/20"
                    }`}
                  >
                    <div className="space-y-1">
                      <h4 className="font-mono text-xs font-bold text-slate-100 truncate max-w-[200px]">{rep.url}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                        <Calendar className="w-3 h-3" />
                        <span>{rep.createdAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-mono border rounded px-1.5 py-0.5 uppercase ${
                        rep.status === "danger" || rep.status === "dangerous"
                          ? "border-red-500/40 text-red-400 bg-red-950/20"
                          : rep.status === "warning"
                          ? "border-amber-500/40 text-amber-400 bg-amber-950/20"
                          : "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
                      }`}>
                        {rep.status}
                      </span>
                      <span className="font-display font-black text-xs">{rep.score}%</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 border border-dashed border-white/25 rounded-xl text-center text-slate-500 text-xs font-sans">
                  No scan reports match search query.
                </div>
              )}
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-6 bg-slate-950/40 p-6 border-2 border-white/20 rounded-2xl scribble-border min-h-[350px]">
            {selectedReport ? (
              <div className="space-y-6 text-left">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono bg-slate-900 border border-white/20 px-2 py-0.5 rounded text-slate-400">ACTIVE LOG</span>
                    <h3 className="font-mono text-xs font-bold text-white truncate max-w-[220px] mt-1">{selectedReport.url}</h3>
                  </div>
                  
                  <button
                    onClick={() => handleDownloadPdf(selectedReport)}
                    className="p-2 bg-primary hover:bg-primary/90 text-white rounded scribble-border shadow cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report</span>
                  </button>
                </div>

                {/* Score row */}
                <div className="flex justify-between items-center bg-slate-900 p-4 border border-white/10 rounded-lg">
                  <span className="text-xs font-bold text-slate-300">UX Trust Score:</span>
                  <span className={`text-xl font-display font-black ${
                    selectedReport.score < 50 ? "text-red-400" : selectedReport.score < 75 ? "text-amber-400" : "text-emerald-400"
                  }`}>
                    {selectedReport.score}%
                  </span>
                </div>

                {/* Flagged patterns */}
                <div className="space-y-3">
                  <h5 className="font-display font-extrabold text-xs text-slate-300 uppercase tracking-wider">
                    Flagged Deceptions ({selectedReport.report?.darkPatterns.length || 0})
                  </h5>
                  <div className="space-y-2 max-h-[160px] overflow-y-auto">
                    {selectedReport.report?.darkPatterns && selectedReport.report.darkPatterns.length > 0 ? (
                      selectedReport.report.darkPatterns.map((p, idx) => (
                        <div key={idx} className="p-3 bg-red-950/20 border border-red-500/30 rounded text-red-300 text-xs">
                          <strong>[{p.category}]</strong>: {p.explanation}
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-emerald-400">✔ Layout complies with ethical guidelines. No issues found.</div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-3 py-16">
                <Printer className="w-10 h-10 text-slate-500" />
                <h4 className="font-display font-bold text-white text-sm">No Report Selected</h4>
                <p className="text-xs text-slate-500 font-sans max-w-[200px] leading-relaxed">
                  Select a scan log from the list on the left to read detailed audit variables.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
