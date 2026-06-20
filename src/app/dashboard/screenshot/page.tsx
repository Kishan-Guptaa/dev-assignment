"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ScanText } from "lucide-react";
import ScreenshotAnalyzer from "@/components/ScreenshotAnalyzer";

export default function ScreenshotAuditPage() {
  const router = useRouter();

  useEffect(() => {
    // Validate session
    const cachedUser = localStorage.getItem("adpd_user");
    if (!cachedUser) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background text-white p-6 md:p-12 relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="w-full max-w-3xl space-y-8 relative z-10">
        
        {/* Back navigation */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-3xl font-display font-extrabold text-white flex items-center justify-center sm:justify-start gap-2.5">
            <ScanText className="w-8 h-8 text-accent" />
            Audit UI Screenshot
          </h1>
          <p className="text-xs text-slate-400 font-sans">
            Submit captures of checkouts or privacy option lists to run layout segmentations and text OCR extractions.
          </p>
        </div>

        {/* Embed visual segmenter */}
        <div className="bg-slate-900/40 p-6 border-2 border-white/20 rounded-2xl scribble-glass">
          <ScreenshotAnalyzer />
        </div>

      </div>
    </div>
  );
}
