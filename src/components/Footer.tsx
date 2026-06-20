"use client";

import { motion } from "framer-motion";
import { Heart, ShieldAlert, Award, Star } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-24 border-t-2 border-dashed border-slate-700/60 bg-slate-950 text-slate-400 py-16 px-4">
      {/* Absolute floating doodles in footer */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 opacity-25 hidden lg:block">
        <Star className="w-6 h-6 text-accent animate-spin-slow" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Info Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-2 text-white cursor-pointer" onClick={scrollToTop}>
            <div className="p-1 bg-primary/20 border border-primary/40 rounded scribble-border-alt">
              <ShieldAlert className="w-5 h-5 text-secondary" />
            </div>
            <span className="font-display font-bold text-lg">
              AI Dark Pattern Detector
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm">
            Empowering web users with automated visual scanning and NLP pattern analysis models to flag deceptive digital practices before they trigger unintended transactions.
          </p>
          <div className="flex items-center space-x-2.5 text-xs text-slate-500 font-handwritten">
            <Award className="w-4 h-4 text-accent" />
            <span>Built for the Global Buildathon 2026 by Team Agastya</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
            Resources
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary hover:underline transition-all">
                Project Documentation
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-secondary hover:underline transition-all">
                How It Works
              </a>
            </li>
            <li>
              <a href="#interactive-demo" className="hover:text-secondary hover:underline transition-all">
                Interactive Scanner
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-secondary hover:underline transition-all">
                AI Detection Core
              </a>
            </li>
          </ul>
        </div>

        {/* Social / Connect Column */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
            Connect
          </h4>
          <div className="flex items-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.1, rotate: -5 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border-2 border-white/60 text-white rounded-md scribble-border scribble-shadow hover:bg-slate-900 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, rotate: 5 }}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border-2 border-white/60 text-white rounded-md scribble-border scribble-shadow hover:bg-slate-900 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </motion.a>
          </div>
          <div className="text-xs text-slate-500 pt-2 flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>by Team Agastya</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
        <div>
          © 2026 AI Dark Pattern Detector. Under MIT License.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-slate-400">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400">Terms of Use</a>
          <a href="#" className="hover:text-slate-400">Ethical UX Standard</a>
        </div>
      </div>
    </footer>
  );
}
