"use client";

import { motion } from "framer-motion";
import { Cpu, Scan, RefreshCw, Layers, FileText, Compass, Star } from "lucide-react";

interface FeatureItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
  borderClass: string;
  color: string;
}

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  stars: number;
}

export default function FeaturesTestimonials() {
  const features: FeatureItem[] = [
    {
      title: "AI Detection Engine",
      desc: "Our neural network tagger maps the DOM hierarchy, button dimensions, and label phrasing to calculate vulnerability scores.",
      icon: <Cpu className="w-5 h-5" />,
      borderClass: "scribble-border-primary",
      color: "#8B5CF6",
    },
    {
      title: "Screenshot Analysis",
      desc: "Upload mock interface screens, cookie prompts, or checkouts to run automated bounding box segmentations.",
      icon: <Scan className="w-5 h-5" />,
      borderClass: "scribble-border-secondary",
      color: "#22D3EE",
    },
    {
      title: "Real-Time Scanning",
      desc: "Inspect live sites on-the-fly to parse active scripts, stylesheet parameters, and checkouts in under 10 seconds.",
      icon: <RefreshCw className="w-5 h-5" />,
      borderClass: "scribble-border-accent",
      color: "#F97316",
    },
    {
      title: "Browser Extension Support",
      desc: "A planned Chrome / Firefox companion extension to flag active checkouts and block pre-checked add-ons automatically.",
      icon: <Layers className="w-5 h-5" />,
      borderClass: "scribble-border",
      color: "#FFFFFF",
    },
    {
      title: "Detailed Audit Reports",
      desc: "Export comprehensive PDF/JSON audits documenting flagged selectors, billing rules, and design violations.",
      icon: <FileText className="w-5 h-5" />,
      borderClass: "scribble-border-primary",
      color: "#8B5CF6",
    },
    {
      title: "Ethical UX Guidance",
      desc: "Receive actionable alternative recommendations to modify visual weight hierarchies and comply with consumer laws.",
      icon: <Compass className="w-5 h-5" />,
      borderClass: "scribble-border-secondary",
      color: "#22D3EE",
    },
  ];

  const testimonials: TestimonialItem[] = [
    {
      quote: "The visual screenshot analysis flagged two pre-checked insurance items on a flight booking site that I would have completely missed. Saved me $24!",
      author: "Aditi Rao",
      role: "Consumer Advocate",
      stars: 5,
    },
    {
      quote: "As a product designer, I run our checkout prototypes through the auditor to ensure we aren't accidentally introducing design traps. A must-have tool for ethical product growth.",
      author: "Marcus Chen",
      role: "Lead UX Designer",
      stars: 5,
    },
    {
      quote: "An excellent initiative built for the Global Buildathon. AI Dark Pattern Detector brings much-needed transparency to modern e-commerce checkout flows.",
      author: "Sarah Jenkins",
      role: "Tech Analyst",
      stars: 5,
    },
  ];

  return (
    <section id="features" className="relative py-24 px-4 max-w-7xl mx-auto overflow-hidden">
      
      {/* Features Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-handwritten text-secondary font-semibold">Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">System Features</h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            High-performance detection tools engineered to inspect web content and protect consumers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`p-6 bg-slate-900/60 text-white scribble-shadow flex flex-col space-y-3 cursor-pointer ${feat.borderClass}`}
              style={{ color: feat.color }}
            >
              <div className="p-2 border border-current rounded w-fit bg-slate-950">
                {feat.icon}
              </div>
              <h3 className="font-display font-extrabold text-base text-white tracking-wide">{feat.title}</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials section */}
      <div className="mt-36 space-y-6">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-handwritten text-accent font-semibold">Social Proof</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">What Users Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col space-y-6"
            >
              {/* Testimonial speech bubble */}
              <div className="scribble-speech-bubble bg-slate-900 p-6 text-white min-h-[160px] flex flex-col justify-between shadow-lg">
                <p className="text-xs italic text-slate-300 leading-relaxed font-sans">
                  &ldquo;{test.quote}&rdquo;
                </p>
                {/* Stars */}
                <div className="flex items-center gap-1 mt-4 text-amber-400">
                  {Array.from({ length: test.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              {/* Author metadata */}
              <div className="pl-6 pt-2 space-y-0.5">
                <h4 className="font-display font-bold text-sm text-white">{test.author}</h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
