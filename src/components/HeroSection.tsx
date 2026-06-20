"use client";

import { motion } from "framer-motion";
import { ArrowRight, Upload, Play, Shield, CircleDot, AlertTriangle } from "lucide-react";
import { StarDoodle, ArrowDoodle, CircleDoodle, ScribbleRobot, SketchBrowser } from "./Doodles";

export default function HeroSection() {
  const scrollToDemo = (mode?: "url" | "screenshot") => {
    const demoElement = document.getElementById("interactive-demo");
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: "smooth" });
      // If a specific mode is clicked, we can trigger a custom event or let it auto-select
      if (mode) {
        const event = new CustomEvent("set-demo-mode", { detail: mode });
        window.dispatchEvent(event);
      }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Floating Background Doodles */}
      <div className="absolute top-12 left-10 md:left-24 text-secondary/30 pointer-events-none hidden md:block">
        <StarDoodle delay={0.2} />
      </div>
      <div className="absolute bottom-16 left-6 md:left-16 text-accent/30 pointer-events-none hidden md:block">
        <ArrowDoodle delay={1} className="-rotate-12" />
      </div>
      <div className="absolute top-1/3 right-12 text-primary/30 pointer-events-none hidden lg:block">
        <Shield className="w-10 h-10 stroke-[2] animate-bounce-slow" />
      </div>
      <div className="absolute bottom-24 right-1/4 text-secondary/30 pointer-events-none hidden md:block">
        <CircleDot className="w-8 h-8 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
        
        {/* Left Text content */}
        <div className="lg:col-span-6 flex flex-col space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex self-center lg:self-start items-center space-x-2 px-3 py-1 bg-slate-900 border-2 border-white/20 rounded-full text-xs text-secondary scribble-border-alt"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="font-semibold uppercase tracking-wider">AI Detection Core Live</span>
          </motion.div>

          <div className="relative">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white leading-tight"
            >
              Spot{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent relative">
                Dark Patterns
                {/* Scribble circle around Dark Patterns */}
                <CircleDoodle className="text-accent/60 -bottom-2 -left-2 w-[110%] h-[120%] pointer-events-none" delay={0.8} />
              </span>{" "}
              Before They Manipulate You
            </motion.h1>
          </div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed"
          >
            An AI-powered defense system analyzing website interfaces and mobile applications to detect deceptive, coercive, or manipulative UI patterns. Reclaim control of your digital choices.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToDemo("url")}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-primary text-white font-display font-bold rounded-lg cursor-pointer scribble-border scribble-shadow hover:bg-primary/95 transition-all text-sm group"
            >
              <span>Analyze Website</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToDemo("screenshot")}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-slate-900 border-2 border-dashed border-white/60 text-white font-display font-semibold rounded-lg cursor-pointer scribble-shadow hover:bg-slate-800 transition-all text-sm"
            >
              <Upload className="w-4 h-4 text-secondary" />
              <span>Upload Screenshot</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right Graphic Content */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative mt-8 lg:mt-0">
          {/* Curly Arrow pointing from text to browser mockup */}
          <div className="absolute -top-10 -left-10 text-accent/50 rotate-[60deg] hidden xl:block z-20">
            <ArrowDoodle delay={1.2} />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="w-full max-w-lg relative"
          >
            {/* Robot Mascot sitting on top/behind the browser window */}
            <div className="absolute -top-36 -right-6 z-0 transform rotate-6 opacity-80 scale-[0.85] hidden sm:block">
              <ScribbleRobot className="text-white hover:rotate-12 transition-transform duration-500" />
            </div>

            {/* Mockup Browser Window */}
            <SketchBrowser className="w-full relative z-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">checkout_v2.html</span>
                  <div className="px-2 py-0.5 border border-red-500/50 rounded bg-red-950/20 text-red-400 text-[10px] flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>2 Manipulative Elements Found</span>
                  </div>
                </div>

                {/* Simulated Order Items */}
                <div className="border border-white/10 rounded-md p-3 bg-slate-950/50 relative overflow-hidden">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-white/10">
                    <span className="font-semibold">Items in Cart (1)</span>
                    <span className="text-slate-400">$89.99</span>
                  </div>

                  {/* Pre-checked addon - Dark Pattern 1 */}
                  <div className="mt-2.5 flex items-start justify-between text-xs p-2 rounded bg-red-950/30 border-2 border-dashed border-red-500/60 relative">
                    <div className="flex gap-2">
                      <input type="checkbox" defaultChecked className="mt-0.5 accent-primary h-3.5 w-3.5 border-2 border-red-500" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-200">Continuous Support Plan</span>
                        <span className="text-[10px] text-slate-400">Rebills $12.99 monthly after 7 days</span>
                      </div>
                    </div>
                    <span className="text-red-400 font-bold">$0.00</span>
                    
                    {/* Bounding box marker label */}
                    <div className="absolute -top-2.5 right-2 px-1.5 py-0.5 bg-red-500 text-white text-[8px] uppercase tracking-wider font-bold rounded scribble-shadow shadow-red-950">
                      Forced Continuity
                    </div>
                  </div>

                  {/* Hidden Shipping Fee - Dark Pattern 2 */}
                  <div className="mt-2 flex items-center justify-between text-xs p-2 rounded bg-amber-950/30 border-2 border-dashed border-amber-500/60 relative">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span className="font-semibold text-slate-200">Environmental Recovery Fee</span>
                    </div>
                    <span className="text-amber-400 font-bold">$4.95</span>

                    <div className="absolute -top-2.5 right-2 px-1.5 py-0.5 bg-amber-500 text-white text-[8px] uppercase tracking-wider font-bold rounded scribble-shadow">
                      Sneak Into Basket
                    </div>
                  </div>
                </div>

                {/* Purchase Button */}
                <div className="pt-2 flex flex-col space-y-2">
                  <div className="w-full py-2.5 bg-red-600 font-semibold text-xs text-center border-2 border-white/60 rounded scribble-border shadow-lg">
                    Confirm Order ($94.94)
                  </div>
                  <div className="text-[10px] text-center text-slate-500 underline cursor-pointer hover:text-slate-400">
                    No thanks, I choose not to support environmental restoration
                  </div>
                </div>
              </div>
            </SketchBrowser>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
