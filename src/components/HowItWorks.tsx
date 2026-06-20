"use client";

import { motion } from "framer-motion";
import { UploadCloud, Layers, Cpu, ShieldAlert, FileCheck, ArrowRight } from "lucide-react";

interface StepItem {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  accentClass: string;
}

export default function HowItWorks() {
  const steps: StepItem[] = [
    {
      step: "01",
      title: "Provide URL or Upload Screenshot",
      desc: "Input any active site address or submit screen captures of app purchase forms, cookie options, or checkout pathways.",
      icon: <UploadCloud className="w-5 h-5" />,
      color: "#22D3EE",
      accentClass: "from-cyan-500/20 to-cyan-500/0",
    },
    {
      step: "02",
      title: "Extract Text & UI Elements",
      desc: "Our engine executes visual segmentations to index DOM nodes, buttons, input shapes, and OCR text fragments.",
      icon: <Layers className="w-5 h-5" />,
      color: "#8B5CF6",
      accentClass: "from-violet-500/20 to-violet-500/0",
    },
    {
      step: "03",
      title: "Run AI Detection Models",
      desc: "Deep learning vision algorithms and text models parse contextual phrasing and layouts to detect manipulative setups.",
      icon: <Cpu className="w-5 h-5" />,
      color: "#F97316",
      accentClass: "from-orange-500/20 to-orange-500/0",
    },
    {
      step: "04",
      title: "Classify Dark Patterns",
      desc: "Flagged components are categorized into specific types (e.g. Sneak in Basket, Forced Continuity, Roaming CTAs, Privacy Traps).",
      icon: <ShieldAlert className="w-5 h-5" />,
      color: "#EF4444",
      accentClass: "from-red-500/20 to-red-500/0",
    },
    {
      step: "05",
      title: "Generate Ethical UX Report",
      desc: "Review your comprehensive interface score, safe elements validation list, and descriptive advice to bypass manipulations.",
      icon: <FileCheck className="w-5 h-5" />,
      color: "#10B981",
      accentClass: "from-emerald-500/20 to-emerald-500/0",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 px-4 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center space-y-4 max-w-2xl mx-auto mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest font-sans text-secondary font-semibold"
        >
          Operation Flow
        </motion.span>
        <motion.h2
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-display font-extrabold text-white"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 text-sm sm:text-base font-sans"
        >
          Analyze web platforms and desktop captures in under 10 seconds.
        </motion.p>
      </div>

      {/* Clean Timeline List */}
      <div className="relative max-w-4xl mx-auto pl-8 sm:pl-12">
        {/* Modern side-timeline gradient connecting line */}
        <div className="absolute left-[13px] sm:left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-400 via-violet-500 to-emerald-500 rounded" />

        <div className="space-y-6">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex gap-6 sm:gap-8 items-start group"
            >
              {/* Timeline circle badge */}
              <div 
                className="absolute -left-[27px] sm:-left-[39px] top-2.5 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-slate-955 border-2 flex items-center justify-center font-mono text-[9px] sm:text-xs font-extrabold z-10 shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{ 
                  borderColor: item.color, 
                  color: item.color,
                  backgroundColor: "#0B1020"
                }}
              >
                {item.step}
              </div>

              {/* Step Card with modern layout */}
              <div 
                className="flex-1 p-5 sm:p-6 bg-slate-900/30 backdrop-blur-sm border rounded-xl hover:bg-slate-900/60 transition-all flex flex-col md:flex-row md:items-center gap-4 relative overflow-hidden"
                style={{ 
                  borderColor: "rgba(255, 255, 255, 0.06)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)"
                }}
              >
                {/* Microgradient corner background glow */}
                <div 
                  className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.accentClass} blur-xl opacity-40`} 
                />

                {/* Left Side: Icon block */}
                <div 
                  className="p-3 rounded-lg border w-fit bg-slate-950/80 shrink-0 self-start md:self-center transition-colors"
                  style={{ 
                    borderColor: `${item.color}30`, 
                    color: item.color 
                  }}
                >
                  {item.icon}
                </div>

                {/* Center Side: Title and description */}
                <div className="space-y-1.5 flex-1 relative z-10">
                  <h3 className="font-display font-extrabold text-base tracking-wide text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Right Side: Arrow highlight on desktop */}
                <div className="hidden md:block pr-2 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <ArrowRight className="w-5 h-5" style={{ color: item.color }} />
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
