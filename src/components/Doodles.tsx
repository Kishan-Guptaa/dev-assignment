"use client";

import { motion } from "framer-motion";

interface DoodleProps {
  className?: string;
  delay?: number;
}

// Sparkle/Star Doodle
export const StarDoodle = ({ className = "", delay = 0 }: DoodleProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-12 h-12 stroke-current fill-none ${className}`}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay, ease: "easeInOut" }}
        d="M 50 10 Q 52 38 80 40 Q 52 42 50 80 Q 48 42 20 40 Q 48 38 50 10 Z"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeInOut" }}
        d="M 50 25 L 50 55 M 35 40 L 65 40"
        strokeWidth="1.5"
        opacity="0.6"
      />
    </svg>
  );
};

// Hand-Drawn Arrow (Curly/Sketchy pointing down-right)
export const ArrowDoodle = ({ className = "", delay = 0.5 }: DoodleProps) => {
  return (
    <svg
      viewBox="0 0 120 80"
      className={`w-24 h-16 stroke-current fill-none ${className}`}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay, ease: "easeOut" }}
        d="M 10 15 C 40 10, 80 5, 95 30 C 105 45, 80 65, 50 60 C 40 58, 45 42, 60 45 C 80 48, 95 62, 108 68"
      />
      {/* Arrow head strokes */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: delay + 1.2 }}
        d="M 95 55 L 108 68 L 105 50"
      />
    </svg>
  );
};

// Simple Circle Loop Doodle (to highlight text)
export const CircleDoodle = ({ className = "", delay = 0.2 }: DoodleProps) => {
  return (
    <svg
      viewBox="0 0 150 60"
      className={`absolute stroke-current fill-none ${className}`}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay, ease: "easeInOut" }}
        d="M 10 30 C 10 10, 140 8, 142 28 C 144 48, 5 52, 8 32 C 10 20, 95 18, 135 22"
      />
    </svg>
  );
};

// Security/Shield Doodle
export const ShieldDoodle = ({ className = "", delay = 0.4 }: DoodleProps) => {
  return (
    <svg
      viewBox="0 0 100 120"
      className={`w-16 h-20 stroke-current fill-none ${className}`}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Hand-drawn double shield outline */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay }}
        d="M 50 15 C 70 12, 85 20, 85 45 C 85 75, 50 105, 50 105 C 50 105, 15 75, 15 45 C 15 20, 30 12, 50 15 Z"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: delay + 0.3 }}
        d="M 50 25 C 65 23, 75 30, 75 48 C 75 70, 50 93, 50 93 C 50 93, 25 70, 25 48 C 25 30, 35 23, 50 25 Z"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      {/* Checkmark in the middle */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: delay + 1 }}
        d="M 38 58 L 47 67 L 65 45"
        strokeWidth="3.5"
        className="stroke-success"
      />
    </svg>
  );
};

// Warn Icon Doodle
export const WarningDoodle = ({ className = "", delay = 0.1 }: DoodleProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-12 h-12 stroke-current fill-none ${className}`}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay }}
        d="M 50 15 L 85 80 C 86 82, 85 85, 82 85 L 18 85 C 15 85, 14 82, 15 80 Z"
        className="stroke-warning"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.8 }}
        d="M 50 38 L 50 60"
        strokeWidth="4"
        className="stroke-warning"
      />
      <motion.circle
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: delay + 1.2 }}
        cx="50"
        cy="72"
        r="4.5"
        className="fill-warning stroke-none"
      />
    </svg>
  );
};

// Hand-Drawn Browser Window
export const SketchBrowser = ({
  children,
  className = "",
  title = "ai-dark-pattern-scanner.io",
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) => {
  return (
    <div className={`relative scribble-border-thick bg-slate-900/90 text-slate-100 flex flex-col p-1 overflow-hidden shadow-2xl scribble-shadow-lg ${className}`}>
      {/* Top browser bar */}
      <div className="flex items-center justify-between border-b-2 border-slate-700/80 px-4 py-3 bg-slate-950/40">
        <div className="flex items-center space-x-2">
          {/* Hand drawn circles */}
          <div className="w-3.5 h-3.5 rounded-full border border-white/60 bg-red-500/80 flex items-center justify-center text-[7px]" />
          <div className="w-3.5 h-3.5 rounded-full border border-white/60 bg-yellow-500/80 flex items-center justify-center text-[7px]" />
          <div className="w-3.5 h-3.5 rounded-full border border-white/60 bg-green-500/80 flex items-center justify-center text-[7px]" />
        </div>
        {/* Address Bar */}
        <div className="flex-1 max-w-md mx-6 px-4 py-1.5 rounded-md border border-white/30 text-xs text-slate-400 bg-slate-900 flex items-center justify-center space-x-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{title}</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 border border-white/20 rounded">HTTPS</span>
        </div>
      </div>
      {/* Content Area */}
      <div className="relative flex-1 p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

// Scribble AI Robot Mascot
export const ScribbleRobot = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 200 220"
      className={`w-48 h-52 fill-none stroke-current ${className}`}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Robot Antenna */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
        d="M 100 50 L 100 20"
      />
      <motion.circle
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        cx="100"
        cy="15"
        r="8"
        className="fill-accent stroke-accent"
      />

      {/* Head */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        d="M 60 50 C 65 48, 135 48, 140 50 C 145 75, 145 95, 140 100 C 135 102, 65 102, 60 100 C 55 95, 55 75, 60 50 Z"
      />

      {/* Robot Eyes (Goggles style) */}
      <motion.ellipse
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        cx="82"
        cy="75"
        rx="14"
        ry="10"
        className="stroke-secondary fill-secondary/10"
      />
      <motion.ellipse
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        cx="118"
        cy="75"
        rx="14"
        ry="10"
        className="stroke-secondary fill-secondary/10"
      />
      {/* Glowing pupils */}
      <motion.circle
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0.9, 1] }}
        transition={{ duration: 0.5, delay: 1.4 }}
        cx="82"
        cy="75"
        r="4"
        className="fill-cyan-400 stroke-none"
      />
      <motion.circle
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0.9, 1] }}
        transition={{ duration: 0.5, delay: 1.5 }}
        cx="118"
        cy="75"
        r="4"
        className="fill-cyan-400 stroke-none"
      />

      {/* Robot Smile (Scribble curve) */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        d="M 85 92 Q 100 102 115 92"
      />

      {/* Neck */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        d="M 90 100 L 90 112 M 110 100 L 110 112"
      />

      {/* Body */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        d="M 45 112 C 55 110, 145 110, 155 112 C 160 145, 160 175, 155 185 C 145 188, 55 188, 45 185 C 40 175, 40 145, 45 112 Z"
      />

      {/* Robot Heart/Scanner Screen */}
      <motion.rect
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        x="65"
        y="125"
        width="70"
        height="45"
        rx="5"
        className="stroke-primary fill-primary/5"
      />
      {/* Scanning laser line in body screen */}
      <motion.line
        initial={{ y: 130 }}
        animate={{ y: [130, 165, 130] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        x1="70"
        y1="130"
        x2="130"
        y2="130"
        className="stroke-cyan-400"
        strokeWidth="2"
      />

      {/* Left Shoulder & Arm */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        d="M 40 125 Q 20 140, 15 160 L 12 175"
      />
      {/* Hand Claw */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 2.2 }}
        d="M 6 175 C 8 185, 20 180, 20 175"
      />

      {/* Right Shoulder & Arm (holding a magnifying glass or scanning tool) */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1.7 }}
        d="M 160 125 Q 180 135, 185 155 L 180 170"
      />
      {/* Warning/Alert Light held in hand */}
      <motion.circle
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.4 }}
        cx="180"
        cy="175"
        r="8"
        className="fill-warning stroke-warning"
      />
    </svg>
  );
};
