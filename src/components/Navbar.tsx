"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, Zap } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("adpd_token");
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 flex justify-center ${
        scrolled ? "top-4 px-4 sm:px-6" : "top-0 px-0"
      }`}
    >
      <div 
        className={`transition-all duration-500 flex items-center justify-between w-full ${
          scrolled 
            ? "max-w-4xl px-6 py-2.5 bg-slate-950/80 border border-white/15 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.4)] backdrop-blur-xl shadow-primary/5" 
            : "max-w-full px-8 py-4.5 bg-slate-950/30 border-b border-white/5 backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <div 
          className="flex items-center space-x-2.5 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="p-1.5 bg-primary/20 border border-primary/40 rounded-lg group-hover:scale-105 transition-transform duration-300 shrink-0">
            <ShieldAlert className="w-5 h-5 text-secondary" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm leading-tight tracking-wide flex items-center gap-1.5 whitespace-nowrap text-white">
              AI Dark Pattern Detector
            </span>
            <span className="text-[9px] text-accent font-sans font-medium tracking-wider uppercase -mt-0.5 whitespace-nowrap">
              Team Agastya • Buildathon &apos;26
            </span>
          </div>
        </div>
 
        {/* Links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-300">
          <button
            onClick={() => scrollToSection("problem")}
            className="hover:text-secondary hover:underline underline-offset-4 decoration-wavy transition-colors cursor-pointer"
          >
            Why It Matters
          </button>
          <button
            onClick={() => scrollToSection("solution")}
            className="hover:text-secondary hover:underline underline-offset-4 decoration-wavy transition-colors cursor-pointer"
          >
            Our Solution
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="hover:text-secondary hover:underline underline-offset-4 decoration-wavy transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("interactive-demo")}
            className="hover:text-secondary hover:underline underline-offset-4 decoration-wavy transition-colors cursor-pointer text-cyan-300 font-bold"
          >
            Interactive Demo
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="hover:text-secondary hover:underline underline-offset-4 decoration-wavy transition-colors cursor-pointer"
          >
            Features
          </button>
        </nav>
 
        {/* CTA Button */}
        <div className="flex items-center space-x-4 shrink-0">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="text-[10px] font-display font-bold px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full transition-all cursor-pointer shadow-md hover:opacity-90 flex items-center gap-1"
            >
              <Zap className="w-3 h-3 fill-white" />
              <span>Go to Dashboard</span>
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-xs font-display font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Sign In
              </Link>
              <button
                onClick={() => scrollToSection("interactive-demo")}
                className="hidden sm:flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white font-display font-semibold text-[10px] rounded-full cursor-pointer shadow-md hover:opacity-90 transition-all"
              >
                <Zap className="w-3 h-3 fill-white" />
                <span>Analyze Now</span>
              </button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
