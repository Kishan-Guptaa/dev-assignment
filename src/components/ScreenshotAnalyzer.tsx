"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, AlertTriangle, CheckCircle, Info, RefreshCw, X } from "lucide-react";
import confetti from "canvas-confetti";

interface Hotspot {
  id: string;
  top: string;
  left: string;
  width: string;
  height: string;
  type: string;
  title: string;
  desc: string;
  exploit: string;
}

interface ScreenshotTemplate {
  name: string;
  title: string;
  description: string;
  hotspots: Hotspot[];
  mockUi: React.ReactNode;
}

export default function ScreenshotAnalyzer() {
  const [activeTemplate, setActiveTemplate] = useState<"checkout" | "cookie" | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [customFile, setCustomFile] = useState<string | null>(null);

  const checkoutTemplate: ScreenshotTemplate = {
    name: "checkout",
    title: "Deceptive Shopping Cart Checkout Page",
    description: "Checkout flow with automated pre-checked subscriptions and secondary fees sneakily added to the basket.",
    hotspots: [
      {
        id: "hs-sneak",
        top: "35%",
        left: "4%",
        width: "92%",
        height: "22%",
        type: "Sneak into Basket",
        title: "Default Shipping Protection Fee",
        desc: "A $3.99 'Secure Transport Cover' charge automatically appended to the cart without user authorization.",
        exploit: "Exploits default bias (users rarely read and uncheck pre-selected additions before finalizing order).",
      },
      {
        id: "hs-continuity",
        top: "60%",
        left: "4%",
        width: "92%",
        height: "18%",
        type: "Forced Continuity",
        title: "Auto-Billing VIP Subscription",
        desc: "Pre-checked VIP club enrollment charging $9.99 monthly after a 10-day period.",
        exploit: "Capitalizes on inattention and inertia (many customers buy without realizing a recurring billing starts).",
      },
    ],
    mockUi: (
      <div className="border border-white/20 rounded-lg p-5 bg-slate-900 text-white font-sans text-xs space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span className="font-bold text-sm tracking-wide">CART ITEMS (1)</span>
          <span className="text-slate-400 font-mono">ID: #92842</span>
        </div>
        
        {/* Core Item */}
        <div className="flex justify-between items-center py-1">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded bg-slate-800 border border-white/10 flex items-center justify-center font-bold">🎧</span>
            <div>
              <p className="font-semibold text-slate-200">Ultra-Bass Wireless Headphones</p>
              <p className="text-[10px] text-slate-400">Color: Charcoal Black</p>
            </div>
          </div>
          <span className="font-bold font-mono">$69.99</span>
        </div>

        {/* Sneak in Basket Item */}
        <div className="p-3.5 bg-red-950/20 border-2 border-red-500/40 rounded flex items-center justify-between text-red-300">
          <div className="flex items-start gap-2.5">
            <input type="checkbox" defaultChecked className="mt-0.5 accent-primary h-3.5 w-3.5" />
            <div>
              <p className="font-bold text-slate-100">Secure Transport & Package Protection</p>
              <p className="text-[10px] text-slate-400">Guarantees replacement for lost, broken, or stolen items.</p>
            </div>
          </div>
          <span className="font-bold font-mono text-red-400">$3.99</span>
        </div>

        {/* Forced Continuity Item */}
        <div className="p-3.5 bg-red-950/20 border-2 border-red-500/40 rounded flex items-center justify-between text-red-300">
          <div className="flex items-start gap-2.5">
            <input type="checkbox" defaultChecked className="mt-0.5 accent-primary h-3.5 w-3.5" />
            <div>
              <p className="font-bold text-slate-100">10-Day VIP Pass (Auto-Renewal)</p>
              <p className="text-[10px] text-slate-400">Join the Premium Club. Renews at $9.99/month unless cancelled.</p>
            </div>
          </div>
          <span className="font-bold font-mono text-red-400">$0.00</span>
        </div>

        {/* Totals */}
        <div className="border-t border-white/10 pt-3 space-y-1.5 font-mono">
          <div className="flex justify-between text-slate-400">
            <span>Subtotal:</span>
            <span>$69.99</span>
          </div>
          <div className="flex justify-between text-red-400">
            <span>Add-ons (2):</span>
            <span>$3.99</span>
          </div>
          <div className="flex justify-between text-sm text-white font-bold border-t border-dashed border-white/20 pt-1.5">
            <span>Total Charge:</span>
            <span>$73.98</span>
          </div>
        </div>
      </div>
    ),
  };

  const cookieTemplate: ScreenshotTemplate = {
    name: "cookie",
    title: "Attention Distraction Cookie Banner",
    description: "Cookie consent dialog designed to bypass opt-out preferences using asymmetrical button weights and small text.",
    hotspots: [
      {
        id: "hs-cta",
        top: "46%",
        left: "5%",
        width: "90%",
        height: "18%",
        type: "Misleading CTA",
        title: "Pre-Weighted Option Button",
        desc: "The 'Accept All' action is highly emphasized in a vibrant solid block, while refusing data shares is buried in text links.",
        exploit: "Exploits visual weight biases (users reflexively press the most visually outstanding action to dismiss a block quickly).",
      },
      {
        id: "hs-distract",
        top: "68%",
        left: "5%",
        width: "90%",
        height: "12%",
        type: "Visual Interference",
        title: "Buried Privacy Settings",
        desc: "The options config and decline links are presented as micro-sized, low-contrast text in a secondary footer row.",
        exploit: "Uses size-difference to hide privacy control mechanisms.",
      },
    ],
    mockUi: (
      <div className="border border-white/20 rounded-lg p-6 bg-slate-900 text-white font-sans text-xs space-y-4 shadow-xl">
        <div className="space-y-1 text-center">
          <span className="text-xl">🍪</span>
          <h3 className="font-display font-extrabold text-base text-slate-100">We Value Your Cookie Settings!</h3>
          <p className="text-[10px] text-slate-400 leading-relaxed px-4">
            We and our 620 advertising partners use tracking technologies to personalize ads, analyze platform loads, and store browser cookies.
          </p>
        </div>

        {/* Primary CTA button */}
        <div className="border-2 border-red-500/40 p-1.5 rounded-lg bg-red-950/10">
          <button className="w-full py-3 bg-secondary text-slate-950 font-bold rounded hover:opacity-90 transition-opacity uppercase tracking-wider text-xs">
            Accept All & Proceed
          </button>
        </div>

        {/* Lower row options */}
        <div className="border-2 border-dashed border-red-500/40 p-1 rounded-lg bg-red-950/10 flex justify-between items-center text-[10px] text-slate-400 px-4 py-2 font-medium">
          <button className="hover:text-white underline">Reject Optional Partners</button>
          <button className="hover:text-white underline">Configure Preferences</button>
        </div>
      </div>
    ),
  };

  const handleSelectTemplate = (name: "checkout" | "cookie") => {
    setActiveTemplate(name);
    setShowResults(false);
    setHoveredHotspot(null);
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ["#8B5CF6", "#22D3EE"],
      });
    }, 2500);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomFile(event.target.result as string);
          setActiveTemplate("checkout"); // Map to checkout mock engine
          setShowResults(false);
          setHoveredHotspot(null);
          setIsScanning(true);

          setTimeout(() => {
            setIsScanning(false);
            setShowResults(true);
            confetti({
              particleCount: 40,
              colors: ["#8B5CF6", "#F97316"],
            });
          }, 2500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const currentTpl = activeTemplate === "cookie" ? cookieTemplate : checkoutTemplate;

  return (
    <div className="space-y-8">
      {/* Selector and Dropzone grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Templates */}
        <div className="md:col-span-8 flex flex-col justify-between p-5 bg-slate-900/60 border-2 border-white/20 rounded-xl scribble-border">
          <div className="space-y-3">
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">
              Select Interactive Mock Interface
            </h4>
            <p className="text-xs text-slate-400">
              Run audits on representative page designs flagged for aggressive compliance practices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div
              onClick={() => handleSelectTemplate("checkout")}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex flex-col justify-between min-h-[120px] ${
                activeTemplate === "checkout"
                  ? "border-primary bg-primary/10"
                  : "border-slate-800 bg-slate-950/60 hover:border-slate-600"
              }`}
            >
              <div className="space-y-1.5">
                <h5 className="font-bold text-xs text-white">🛍 Checkout Auto-Billing Card</h5>
                <p className="text-[10px] text-slate-400 leading-tight">Pre-selected subscriptions & environmental packaging fees.</p>
              </div>
              <span className="text-[9px] uppercase tracking-wider font-mono text-primary font-bold mt-3">Select Demo</span>
            </div>

            <div
              onClick={() => handleSelectTemplate("cookie")}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex flex-col justify-between min-h-[120px] ${
                activeTemplate === "cookie"
                  ? "border-secondary bg-secondary/10"
                  : "border-slate-800 bg-slate-950/60 hover:border-slate-600"
              }`}
            >
              <div className="space-y-1.5">
                <h5 className="font-bold text-xs text-white">🍪 Tricky Cookie Dialog Box</h5>
                <p className="text-[10px] text-slate-400 leading-tight">Asymmetric button layout burying preferences.</p>
              </div>
              <span className="text-[9px] uppercase tracking-wider font-mono text-secondary font-bold mt-3">Select Demo</span>
            </div>
          </div>
        </div>

        {/* Dropzone File */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-950/60 border-2 border-dashed border-white/30 rounded-xl scribble-border text-center hover:bg-slate-900/40 transition-colors relative cursor-pointer group">
          <input
            type="file"
            accept="image/*"
            onChange={handleCustomUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="w-8 h-8 text-slate-500 group-hover:text-primary group-hover:scale-115 transition-all mb-3" />
          <h5 className="font-display font-bold text-white text-xs">Drop Any Screenshot</h5>
          <p className="text-[10px] text-slate-400 mt-1 max-w-[150px] mx-auto leading-relaxed">
            Drag file here to simulate a scan or click to browse.
          </p>
        </div>
      </div>

      {/* Main Sandbox Sandbox Screen */}
      <div className="relative min-h-[400px] border-2 border-white/20 bg-slate-950/40 rounded-2xl overflow-hidden scribble-border flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {/* Scanning Overlay */}
          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center text-center z-40 p-4"
            >
              {/* Scan lasers */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#EF4444] animate-scanline" />
              <div className="p-4 bg-red-950/20 border-2 border-dashed border-red-500 rounded-full animate-spin-slow mb-4">
                <RefreshCw className="w-8 h-8 text-red-400" />
              </div>
              <h4 className="font-display font-bold text-white text-sm">Visual Scanner Engaged</h4>
              <p className="text-xs text-slate-400 mt-1 font-mono">Analyzing layout pixels & OCR element bounding boxes...</p>
            </motion.div>
          )}

          {/* Idle screen */}
          {!activeTemplate && !customFile && !isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center max-w-sm space-y-3 py-16"
            >
              <div className="inline-flex p-3.5 border border-white/20 bg-slate-900/60 rounded text-slate-400">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-white text-sm">Screenshot Playground</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Choose a preloaded template above or upload your own mockup to see how the detector identifies and overlays dark pattern boxes.
              </p>
            </motion.div>
          )}

          {/* Results Screen */}
          {showResults && activeTemplate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-xl mx-auto flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-display font-black text-sm text-white uppercase tracking-wide">
                    {currentTpl.title}
                  </h4>
                  <p className="text-[10px] text-slate-400">{currentTpl.description}</p>
                </div>
                <button
                  onClick={() => {
                    setActiveTemplate(null);
                    setCustomFile(null);
                    setShowResults(false);
                  }}
                  className="p-1 border border-white/20 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Render Area */}
              <div className="relative border-2 border-white/60 bg-slate-950 rounded-lg p-6 scribble-border shadow-inner">
                {customFile ? (
                  <div className="relative flex justify-center items-center">
                    <img src={customFile} alt="Custom upload" className="max-h-[300px] object-contain rounded opacity-40 border border-white/10" />
                    {/* Inject overlays on top of customized user file */}
                    <div className="absolute inset-0 p-4">
                      {checkoutTemplate.hotspots.map((hs) => (
                        <div
                          key={hs.id}
                          className="absolute border-2 border-dashed border-red-500 bg-red-500/10 rounded cursor-help animate-pulse hover:border-solid hover:bg-red-500/20"
                          style={{
                            top: hs.top,
                            left: hs.left,
                            width: hs.width,
                            height: hs.height,
                          }}
                          onMouseEnter={() => setHoveredHotspot(hs)}
                          onMouseLeave={() => setHoveredHotspot(null)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Render standard UI */}
                    {currentTpl.mockUi}

                    {/* Hotspot bounding overlays */}
                    <div className="absolute inset-0">
                      {currentTpl.hotspots.map((hs) => (
                        <div
                          key={hs.id}
                          className="absolute border-2 border-dashed border-red-500 bg-red-500/10 rounded cursor-help hover:border-solid hover:bg-red-500/20 transition-all flex items-center justify-center"
                          style={{
                            top: hs.top,
                            left: hs.left,
                            width: hs.width,
                            height: hs.height,
                          }}
                          onMouseEnter={() => setHoveredHotspot(hs)}
                          onMouseLeave={() => setHoveredHotspot(null)}
                        >
                          {/* Pulsing Alert Icon inside bounding box */}
                          <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold shadow-lg border border-white animate-bounce-slow">
                            !
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hotspot Speech-bubble Tooltip overlay */}
                <AnimatePresence>
                  {hoveredHotspot && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 10 }}
                      className="absolute z-50 bottom-4 left-4 right-4 bg-slate-900 text-white p-4 rounded-xl border-2 border-red-500 scribble-shadow shadow-2xl flex items-start gap-3"
                    >
                      <div className="p-2 bg-red-950 border border-red-500/50 rounded text-red-400">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 text-left flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-display font-extrabold text-xs text-red-400 uppercase tracking-wider">
                            🚨 Flagged: {hoveredHotspot.type}
                          </span>
                          <span className="text-[8px] bg-slate-800 border border-white/20 rounded px-1.5 py-0.5 text-slate-400">
                            Confidence: 94%
                          </span>
                        </div>
                        <h5 className="font-bold text-xs text-white mt-0.5">{hoveredHotspot.title}</h5>
                        <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                          {hoveredHotspot.desc}
                        </p>
                        <p className="text-[10px] text-slate-400 font-handwritten italic pt-1 border-t border-slate-800/80 mt-1">
                          🧠 {hoveredHotspot.exploit}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tips footer */}
              <div className="flex items-center gap-2 p-3 bg-slate-900 border border-white/10 rounded-lg text-slate-400 text-xs">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <p className="font-sans leading-tight">
                  Hover over the flashing <strong className="text-red-400 font-bold">!</strong> red highlight boxes to analyze the deceptive design parameters.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
