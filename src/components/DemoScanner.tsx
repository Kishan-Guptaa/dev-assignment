"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ShieldCheck, AlertTriangle, RefreshCw, Sparkles, ExternalLink, HelpCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface ScanResult {
  url: string;
  ethicalScore: number;
  riskyScore: number;
  status: "safe" | "warning" | "dangerous";
  elements: {
    type: "safe" | "warning" | "danger";
    pattern: string;
    description: string;
    location: string;
  }[];
}

const PRESET_SCANS: Record<string, ScanResult> = {
  "https://sneaky-store.com/checkout": {
    url: "https://sneaky-store.com/checkout",
    ethicalScore: 35,
    riskyScore: 65,
    status: "dangerous",
    elements: [
      {
        type: "danger",
        pattern: "Forced Continuity",
        description: "Automatic enrollment in a $14.99/mo 'Super Premium Saver' VIP club hidden inside the purchase checkbox.",
        location: "VIP Checkbox at line 142",
      },
      {
        type: "danger",
        pattern: "Sneak into Basket",
        description: "A $2.99 'Eco Packaging' charge automatically appended to the cart without user authorization.",
        location: "Cart summary container",
      },
      {
        type: "warning",
        pattern: "Confirmshaming CTA",
        description: "The opt-out option reads: 'No, I hate the environment and don't want to plant trees'.",
        location: "Footer popup dismiss button",
      },
      {
        type: "safe",
        pattern: "Refund Policy Visibility",
        description: "Standard terms and refund guidelines clearly visible in footer.",
        location: "Footer site-map links",
      },
    ],
  },
  "https://honest-shop.org": {
    url: "https://honest-shop.org",
    ethicalScore: 100,
    riskyScore: 0,
    status: "safe",
    elements: [
      {
        type: "safe",
        pattern: "Explicit Opt-In",
        description: "All newsletters and marketing campaigns require explicit customer checkmark validation.",
        location: "Account form page",
      },
      {
        type: "safe",
        pattern: "Transparent Price Breakdown",
        description: "Base fees, delivery options, and taxes detailed upfront in the primary display.",
        location: "Cart side panel",
      },
      {
        type: "safe",
        pattern: "Simple Subscription Cancellation",
        description: "A clear one-click cancellation path visible inside the profile dashboard.",
        location: "Settings menu tab",
      },
    ],
  },
  "https://dark-travels.net/booking": {
    url: "https://dark-travels.net/booking",
    ethicalScore: 60,
    riskyScore: 40,
    status: "warning",
    elements: [
      {
        type: "warning",
        pattern: "Fake Urgency Countdown",
        description: "A ticking timer stating 'Room held for 5:00 minutes' that resets upon page reload.",
        location: "Booking header panel",
      },
      {
        type: "warning",
        pattern: "Visual Interference",
        description: "The 'Add Travel Insurance ($24)' button is colored vibrant green, while the 'Skip' link is written in tiny light-grey text.",
        location: "Insurance choice card",
      },
      {
        type: "safe",
        pattern: "Clear Pricing",
        description: "Total price is updated immediately upon selection changes.",
        location: "Order breakdown widget",
      },
    ],
  },
};

export default function DemoScanner() {
  const [urlInput, setUrlInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#8B5CF6", "#22D3EE", "#10B981", "#F97316"],
    });
  };

  const startScan = async (url: string) => {
    if (!url) return;
    
    // Normalize URL
    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = "https://" + targetUrl;
    }

    setIsScanning(true);
    setResult(null);

    const steps = [
      "Establishing connection & fetching DOM trees...",
      "Analyzing layout vectors & boundary coordinates...",
      "Extracting text headers with Computer Vision OCR...",
      "Parsing linguistic context & button strings with NLP models...",
      "Predicting dark pattern vectors using Random Forest classifiers...",
      "Compiling final UX Audit Report...",
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, i === 0 ? 1000 : 700));
    }

    // Match preset or generate a randomized result
    let scanResult: ScanResult;
    const matchedPreset = Object.keys(PRESET_SCANS).find((key) =>
      targetUrl.toLowerCase().includes(key.toLowerCase().replace("https://", "").split("/")[0])
    );

    if (matchedPreset) {
      scanResult = PRESET_SCANS[matchedPreset];
    } else {
      // Generate randomized result
      const score = Math.floor(Math.random() * 40) + 40; // 40-80
      const risky = 100 - score;
      scanResult = {
        url: targetUrl,
        ethicalScore: score,
        riskyScore: risky,
        status: score > 75 ? "safe" : score > 50 ? "warning" : "dangerous",
        elements: [
          {
            type: "warning",
            pattern: "Attention Distraction",
            description: "High visual contrast disparity guiding users away from privacy configurations.",
            location: "Cookie preferences banner",
          },
          {
            type: score < 60 ? "danger" : "warning",
            pattern: score < 60 ? "Sneak into Basket" : "Unlabeled charges",
            description: "Default checking of newsletter subscriptions and auto-billing options.",
            location: "Footer details container",
          },
          {
            type: "safe",
            pattern: "Standard SSL encryption",
            description: "Correct certificates and encryption validation checked.",
            location: "Site secure transport",
          },
        ],
      };
    }

    setResult(scanResult);
    setIsScanning(false);
    triggerConfetti();
  };

  const handleQuickSelect = (presetUrl: string) => {
    setUrlInput(presetUrl);
    startScan(presetUrl);
  };

  return (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <div className="space-y-4">
        <div className="relative flex items-center">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && startScan(urlInput)}
            placeholder="Enter web page address (e.g. sneaky-store.com, honest-shop.org)"
            className="w-full pl-12 pr-28 py-4 bg-slate-900 border-2 border-white/60 text-white rounded-lg focus:outline-none focus:border-primary font-mono text-sm scribble-border shadow-inner"
            disabled={isScanning}
          />
          <Search className="absolute left-4 w-5 h-5 text-slate-400" />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => startScan(urlInput)}
            className="absolute right-2 px-5 py-2.5 bg-secondary text-slate-950 font-display font-extrabold text-xs rounded uppercase tracking-wider scribble-border shadow cursor-pointer"
            disabled={isScanning || !urlInput}
          >
            {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : "Scan Page"}
          </motion.button>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-handwritten text-slate-400">Try Sample Sites:</span>
          <button
            onClick={() => handleQuickSelect("https://sneaky-store.com/checkout")}
            className="text-xs px-3 py-1 bg-red-950/30 border border-red-500/40 text-red-300 rounded-full hover:bg-red-950/60 transition-colors"
          >
            🚨 Sneaky Checkout
          </button>
          <button
            onClick={() => handleQuickSelect("https://dark-travels.net/booking")}
            className="text-xs px-3 py-1 bg-amber-950/30 border border-amber-500/40 text-amber-300 rounded-full hover:bg-amber-950/60 transition-colors"
          >
            ✈ Dark Booking Form
          </button>
          <button
            onClick={() => handleQuickSelect("https://honest-shop.org")}
            className="text-xs px-3 py-1 bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 rounded-full hover:bg-emerald-950/60 transition-colors"
          >
            🛡 Clean & Honest Shop
          </button>
        </div>
      </div>

      {/* Audit Result Display */}
      <div className="relative min-h-[250px] bg-slate-950/40 border-2 border-white/20 rounded-xl p-6 scribble-border flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {/* Scanning State */}
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center text-center space-y-4 py-8"
            >
              <div className="p-4 bg-primary/20 border-2 border-dashed border-primary rounded-full animate-spin-slow">
                <RefreshCw className="w-8 h-8 text-secondary" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-display font-bold text-white text-sm">AI Agent scanning site...</h4>
                <p className="text-xs text-slate-400 font-mono max-w-sm animate-pulse">{currentStep}</p>
              </div>
            </motion.div>
          )}

          {/* Idle State */}
          {!isScanning && !result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 max-w-md space-y-3"
            >
              <div className="inline-flex p-3 border border-white/20 rounded bg-slate-900/60 text-slate-400">
                <HelpCircle className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-white text-sm">No Active Scan</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Enter a target URL above or click one of the pre-loaded sample websites to run the AI classification pipeline.
              </p>
            </motion.div>
          )}

          {/* Report Result State */}
          {!isScanning && result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-full space-y-6"
            >
              {/* Score Header Panel */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="space-y-2 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="text-[10px] font-mono bg-slate-900 border border-white/20 px-2 py-0.5 rounded text-slate-300">TARGET</span>
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-xs text-secondary font-mono hover:underline inline-flex items-center gap-1">
                      {result.url} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-white flex items-center gap-2 justify-center md:justify-start">
                    {result.status === "safe" && (
                      <>
                        <ShieldCheck className="w-5 h-5 text-success" />
                        <span className="text-success">Clean & Ethical Design</span>
                      </>
                    )}
                    {result.status === "warning" && (
                      <>
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        <span className="text-amber-500">Suspicious Elements Detected</span>
                      </>
                    )}
                    {result.status === "dangerous" && (
                      <>
                        <AlertTriangle className="w-5 h-5 text-red-500 animate-bounce" />
                        <span className="text-red-500 font-black">Manipulative Patterns Confirmed</span>
                      </>
                    )}
                  </h3>
                </div>

                {/* Ring score dial */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Ring background */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
                      {/* Ethical Arc */}
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="34"
                        stroke={result.status === "safe" ? "#10B981" : result.status === "warning" ? "#F97316" : "#EF4444"}
                        strokeWidth="6"
                        strokeDasharray="213.6"
                        initial={{ strokeDashoffset: 213.6 }}
                        animate={{ strokeDashoffset: 213.6 - (213.6 * result.ethicalScore) / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        fill="none"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-lg font-display font-black text-white">{result.ethicalScore}%</span>
                      <p className="text-[7px] uppercase tracking-wider text-slate-400 font-bold -mt-0.5">Ethical</p>
                    </div>
                  </div>
                  <div className="space-y-1 font-mono text-[10px] text-slate-400">
                    <div>🏆 Ethical UX Score: <span className="text-white font-bold">{result.ethicalScore}%</span></div>
                    <div>⚠️ Risky Patterns: <span className="text-white font-bold">{result.riskyScore}%</span></div>
                  </div>
                </div>
              </div>

              {/* Elements List */}
              <div className="space-y-4">
                <h4 className="font-display font-extrabold text-xs text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-secondary" />
                  Audit Breakdown
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.elements.map((el, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 border rounded bg-slate-950/60 flex items-start gap-3 relative ${
                        el.type === "danger"
                          ? "border-red-500/40 text-red-400"
                          : el.type === "warning"
                          ? "border-amber-500/40 text-amber-400"
                          : "border-emerald-500/40 text-emerald-400"
                      }`}
                    >
                      <div className="p-1 rounded bg-slate-900 border border-white/10 mt-0.5">
                        {el.type === "danger" && <AlertTriangle className="w-4 h-4 text-red-500" />}
                        {el.type === "warning" && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                        {el.type === "safe" && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-xs text-white">{el.pattern}</span>
                          <span className="text-[8px] font-mono uppercase bg-slate-900 px-1.5 py-0.5 border border-white/15 rounded text-slate-400">
                            {el.location}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                          {el.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
