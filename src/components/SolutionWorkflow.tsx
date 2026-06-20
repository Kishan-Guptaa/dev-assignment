"use client";

import { motion } from "framer-motion";
import { Globe, Database, ScanText, Cpu, Eye, ShieldCheck, FileText } from "lucide-react";

interface WorkflowStep {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  color: string;
  borderColorClass: string;
}

export default function SolutionWorkflow() {
  const steps: WorkflowStep[] = [
    {
      label: "Website/App URL",
      sublabel: "Target Input",
      icon: <Globe className="w-5 h-5" />,
      color: "#22D3EE",
      borderColorClass: "scribble-border-secondary",
    },
    {
      label: "Data Collection",
      sublabel: "DOM & Media Scraping",
      icon: <Database className="w-5 h-5" />,
      color: "#8B5CF6",
      borderColorClass: "scribble-border-primary",
    },
    {
      label: "OCR Extraction",
      sublabel: "Visual Text Scraping",
      icon: <ScanText className="w-5 h-5" />,
      color: "#F97316",
      borderColorClass: "scribble-border-accent",
    },
    {
      label: "NLP Processing",
      sublabel: "Syntactic Context Parsing",
      icon: <Cpu className="w-5 h-5" />,
      color: "#10B981",
      borderColorClass: "scribble-border",
    },
    {
      label: "AI Analysis",
      sublabel: "Deceptive Design Check",
      icon: <Eye className="w-5 h-5" />,
      color: "#8B5CF6",
      borderColorClass: "scribble-border-primary",
    },
    {
      label: "Detection Engine",
      sublabel: "Dark Pattern Classification",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "#EF4444",
      borderColorClass: "scribble-border-accent",
    },
    {
      label: "User Report",
      sublabel: "Interactive UX Review",
      icon: <FileText className="w-5 h-5" />,
      color: "#22D3EE",
      borderColorClass: "scribble-border-secondary",
    },
  ];

  return (
    <section id="solution" className="relative py-24 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center space-y-4 max-w-2xl mx-auto mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest font-handwritten text-secondary font-semibold"
        >
          Process Pipeline
        </motion.span>
        <motion.h2
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-display font-extrabold text-white"
        >
          Our AI Solution
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 text-sm sm:text-base font-sans"
        >
          Our engine combines visual processing, page structural maps, and language analysis to spot deceptive patterns in real time.
        </motion.p>
      </div>

      {/* Horizontal workflow timeline for desktop / large screens */}
      <div className="hidden lg:block relative z-10 py-8">
        {/* Animated Connector SVG background line */}
        <div className="absolute top-[52px] left-[5%] right-[5%] h-2 pointer-events-none z-0">
          <svg className="w-full h-full" fill="none">
            <line
              x1="0"
              y1="4"
              x2="100%"
              y2="4"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="3"
              strokeDasharray="8 8"
            />
            {/* Flowing overlay line */}
            <line
              x1="0"
              y1="4"
              x2="100%"
              y2="4"
              stroke="#22D3EE"
              strokeWidth="3"
              className="flow-line"
            />
          </svg>
        </div>

        <div className="grid grid-cols-7 gap-4 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center space-y-3"
            >
              {/* Node Circle */}
              <div
                className={`w-14 h-14 rounded-full border-2 bg-slate-950 flex items-center justify-center relative z-10 shadow-lg cursor-pointer hover:scale-110 transition-transform ${step.borderColorClass}`}
                style={{ color: step.color }}
              >
                {step.icon}
                {/* Step Number Badge */}
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-900 border border-white/20 text-[9px] font-bold text-white flex items-center justify-center font-mono">
                  {idx + 1}
                </div>
              </div>

              {/* Node Info */}
              <div className="space-y-1 px-1">
                <h4 className="font-display font-bold text-xs text-white uppercase tracking-wide">
                  {step.label}
                </h4>
                <p className="text-[10px] text-slate-400 font-sans leading-tight">
                  {step.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vertical workflow timeline for mobile/tablets */}
      <div className="block lg:hidden relative z-10 max-w-md mx-auto space-y-8 pl-8 border-l-2 border-dashed border-slate-700/60">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative flex items-start space-x-4"
          >
            {/* Dot placement on timeline */}
            <div
              className={`absolute -left-[53px] w-10 h-10 rounded-full border-2 bg-slate-950 flex items-center justify-center ${step.borderColorClass}`}
              style={{ color: step.color }}
            >
              {step.icon}
            </div>

            {/* Content card */}
            <div className="bg-slate-900/60 p-4 border border-white/10 rounded-lg flex-1 scribble-shadow" style={{ color: step.color }}>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold bg-slate-950 text-white border border-white/10 px-2 py-0.5 rounded-full">
                  STEP 0{idx + 1}
                </span>
              </div>
              <h4 className="font-display font-extrabold text-sm text-white mt-1.5 uppercase tracking-wide">
                {step.label}
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                {step.sublabel}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
