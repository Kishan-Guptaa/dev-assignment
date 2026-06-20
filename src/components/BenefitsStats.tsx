"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Eye, Compass, Heart, Users, Percent, Shield, ArrowUpRight } from "lucide-react";

interface BenefitCard {
  title: string;
  desc: string;
  icon: React.ReactNode;
  borderClass: string;
  color: string;
}

interface StatItem {
  number: string;
  label: string;
  desc: string;
}

export default function BenefitsStats() {
  const benefits: BenefitCard[] = [
    {
      title: "Consumer Protection",
      desc: "Prevent unapproved monthly charges, hidden cart items, and subscription renewals before payment gateways authenticate them.",
      icon: <ShieldCheck className="w-5 h-5" />,
      borderClass: "scribble-border-primary",
      color: "#8B5CF6",
    },
    {
      title: "Absolute Transparency",
      desc: "Audit digital interfaces and terms of use to review price breakdowns, privacy agreements, and true shipping expenses.",
      icon: <Eye className="w-5 h-5" />,
      borderClass: "scribble-border-secondary",
      color: "#22D3EE",
    },
    {
      title: "User Awareness",
      desc: "Educate consumers on cognitive bias exploits, trick checkboxes, and psychological triggers built into digital sites.",
      icon: <Compass className="w-5 h-5" />,
      borderClass: "scribble-border-accent",
      color: "#F97316",
    },
    {
      title: "Ethical UX Design",
      desc: "Help startups and designers audit their workflows to adhere to regulatory compliances and maintain consumer trust.",
      icon: <Heart className="w-5 h-5" />,
      borderClass: "scribble-border",
      color: "#FFFFFF",
    },
  ];

  const stats: StatItem[] = [
    {
      number: "500+",
      label: "Platforms Audited",
      desc: "Web checkouts and SaaS templates indexed.",
    },
    {
      number: "95%",
      label: "Detection Accuracy",
      desc: "Verified classification precision score.",
    },
    {
      number: "10K+",
      label: "Consumers Guided",
      desc: "Active users protected from hidden charges.",
    },
    {
      number: "50+",
      label: "Deceptive Pattern Types",
      desc: "Distinct UI vulnerabilities categorized.",
    },
  ];

  return (
    <section className="relative py-24 px-4 max-w-7xl mx-auto overflow-hidden">
      {/* Benefits grid */}
      <div className="space-y-6">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-handwritten text-accent font-semibold">Value Proposition</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Benefits</h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            How our automated UI/UX scanner helps customers and developers verify transaction integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ rotate: 1, scale: 1.02 }}
              className={`p-6 bg-slate-900/60 text-white scribble-shadow flex flex-col justify-between min-h-[220px] cursor-pointer ${item.borderClass}`}
              style={{ color: item.color }}
            >
              <div className="space-y-4">
                <div className="p-2 border border-current rounded w-fit bg-slate-950">
                  {item.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-base text-white tracking-wide">{item.title}</h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[10px] text-slate-400">
                <span>Learn Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Impact & Infographic grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-32 items-center">
        
        {/* Left Infographic Circle */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="w-full max-w-[320px] aspect-square relative flex items-center justify-center">
            
            {/* Concentric Hand-drawn-like SVGs */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Outer Layer: Safer Digital Ecosystem */}
              <motion.circle
                cx="50" cy="50" r="44" stroke="#8B5CF6" strokeWidth="4" strokeDasharray="276"
                initial={{ strokeDashoffset: 276 }}
                whileInView={{ strokeDashoffset: 60 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
                fill="none"
                opacity="0.8"
              />
              {/* Mid-Outer Layer: Regulatory Support */}
              <motion.circle
                cx="50" cy="50" r="36" stroke="#22D3EE" strokeWidth="4" strokeDasharray="226"
                initial={{ strokeDashoffset: 226 }}
                whileInView={{ strokeDashoffset: 45 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
                fill="none"
                opacity="0.8"
              />
              {/* Mid-Inner Layer: Better Decisions */}
              <motion.circle
                cx="50" cy="50" r="28" stroke="#F97316" strokeWidth="4" strokeDasharray="176"
                initial={{ strokeDashoffset: 176 }}
                whileInView={{ strokeDashoffset: 35 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: "easeOut", delay: 0.4 }}
                fill="none"
                opacity="0.8"
              />
              {/* Inner Layer: Reduced Fraud */}
              <motion.circle
                cx="50" cy="50" r="20" stroke="#10B981" strokeWidth="4" strokeDasharray="125"
                initial={{ strokeDashoffset: 125 }}
                whileInView={{ strokeDashoffset: 20 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.6 }}
                fill="none"
                opacity="0.8"
              />
            </svg>

            {/* Centered shield element */}
            <div className="z-10 w-16 h-16 rounded-full bg-slate-950 border border-white/20 flex items-center justify-center shadow-2xl">
              <Shield className="w-6 h-6 text-white animate-pulse" />
            </div>

            {/* Labels pointing to concentric arcs */}
            <div className="absolute -top-4 -right-16 text-right hidden sm:block">
              <span className="text-[10px] font-mono text-primary font-bold">● Safer Digital Ecosystem</span>
            </div>
            <div className="absolute top-1/4 -left-12 text-left hidden sm:block">
              <span className="text-[10px] font-mono text-secondary font-bold">● Regulatory Support</span>
            </div>
            <div className="absolute bottom-1/4 -right-10 text-right hidden sm:block">
              <span className="text-[10px] font-mono text-accent font-bold">● Better Decisions</span>
            </div>
            <div className="absolute -bottom-4 -left-8 text-left hidden sm:block">
              <span className="text-[10px] font-mono text-success font-bold">● Reduced Fraud</span>
            </div>
          </div>
        </div>

        {/* Right text detailing impact */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <span className="text-xs uppercase tracking-widest font-handwritten text-secondary font-semibold">Ecosystem Impact</span>
          <h3 className="text-3xl font-display font-extrabold text-white">Projected Core Impact</h3>
          <p className="text-slate-300 text-sm font-sans leading-relaxed">
            Our platform goes beyond individual protection. By scanning websites at scale, we collect data logs that can support legal regulators, empower ethical business models, and create a safer digital environment.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4 text-left">
            <div className="p-4 bg-slate-900 border border-white/10 rounded-lg">
              <h5 className="font-bold text-xs text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                reduced fraud
              </h5>
              <p className="text-[10px] text-slate-400 font-sans leading-tight">Drop in hidden add-ons and unauthorized recurring payments.</p>
            </div>
            <div className="p-4 bg-slate-900 border border-white/10 rounded-lg">
              <h5 className="font-bold text-xs text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                better decisions
              </h5>
              <p className="text-[10px] text-slate-400 font-sans leading-tight">Consumers purchase voluntarily without design coercion.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section Counters */}
      <div className="mt-32 border-2 border-dashed border-white/20 rounded-2xl bg-slate-950/40 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative scribble-border">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center space-y-2 relative">
            <h4 className="text-4xl font-display font-black text-white tracking-tight flex justify-center items-center gap-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {stat.number}
              </span>
            </h4>
            <div className="space-y-1">
              <h5 className="font-display font-bold text-xs text-slate-200 uppercase tracking-wider">{stat.label}</h5>
              <p className="text-[10px] text-slate-500 font-sans max-w-[150px] mx-auto leading-tight">{stat.desc}</p>
            </div>
            {idx < 3 && (
              <div className="absolute right-0 top-1/4 bottom-1/4 w-0.5 border-r border-dashed border-slate-800 hidden lg:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
