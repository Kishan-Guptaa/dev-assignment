"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, UploadCloud, Terminal, Award } from "lucide-react";
import DemoScanner from "./DemoScanner";
import ScreenshotAnalyzer from "./ScreenshotAnalyzer";

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<"url" | "screenshot">("url");

  useEffect(() => {
    // Listen for custom trigger events from Hero buttons
    const handleSetMode = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === "url" || detail === "screenshot") {
        setActiveTab(detail);
      }
    };

    window.addEventListener("set-demo-mode", handleSetMode);
    return () => window.removeEventListener("set-demo-mode", handleSetMode);
  }, []);

  return (
    <section id="interactive-demo" className="relative py-24 px-4 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest font-handwritten text-secondary font-semibold"
        >
          Interactive Playground
        </motion.span>
        <motion.h2
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-display font-extrabold text-white"
        >
          Detect in Real-Time
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 text-sm sm:text-base font-sans"
        >
          Test our detection core directly. Choose to scan a website URL or analyze checkout layouts for confirmation-shaming patterns.
        </motion.p>
      </div>

      {/* Main card panel */}
      <div className="max-w-4xl mx-auto bg-slate-900/40 p-6 md:p-8 rounded-2xl border-2 border-white/20 shadow-2xl scribble-glass relative z-10">
        
        {/* Tab triggers */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-10 border-b border-white/10 pb-8">
          
          <button
            onClick={() => setActiveTab("url")}
            className={`flex items-center justify-center gap-2.5 px-6 py-3 font-display font-bold text-sm rounded-lg border-2 cursor-pointer transition-all ${
              activeTab === "url"
                ? "border-primary bg-primary/10 text-white scribble-shadow"
                : "border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Globe className="w-4 h-4 text-secondary" />
            <span>Simulate URL Scan</span>
          </button>

          <button
            onClick={() => setActiveTab("screenshot")}
            className={`flex items-center justify-center gap-2.5 px-6 py-3 font-display font-bold text-sm rounded-lg border-2 cursor-pointer transition-all ${
              activeTab === "screenshot"
                ? "border-accent bg-accent/10 text-white scribble-shadow"
                : "border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200"
            }`}
          >
            <UploadCloud className="w-4 h-4 text-accent" />
            <span>Analyze Screenshot</span>
          </button>

        </div>

        {/* Tab content rendering */}
        <div className="relative">
          {activeTab === "url" ? (
            <motion.div
              key="url-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DemoScanner />
            </motion.div>
          ) : (
            <motion.div
              key="screenshot-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ScreenshotAnalyzer />
            </motion.div>
          )}
        </div>

        {/* Audit footer note */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 font-mono gap-4">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>Audit engine running models: Random Forest v1.2, Tesseract OCR OCR, SpaCy NLP</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-accent" />
            <span>Buildathon 2026 Sandbox Environment</span>
          </div>
        </div>

      </div>
    </section>
  );
}
