"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertCircle, HelpCircle, ChevronDown, Award, Sparkles, Check, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionWorkflow from "@/components/SolutionWorkflow";
import TechStackSection from "@/components/TechStackSection";
import HowItWorks from "@/components/HowItWorks";
import InteractiveDemo from "@/components/InteractiveDemo";
import BenefitsStats from "@/components/BenefitsStats";
import FeaturesTestimonials from "@/components/FeaturesTestimonials";
import Footer from "@/components/Footer";

// Custom FAQ Accordion component
const AccordionRow = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-white/20 rounded-xl bg-slate-900/60 scribble-border overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm text-white hover:text-secondary transition-colors cursor-pointer"
      >
        <span>{question}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="p-5 pt-0 border-t border-white/10 text-xs text-slate-400 font-sans leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const faqs = [
    {
      question: "What are visual digital dark patterns?",
      answer: "Deceptive user interfaces designed to manipulate actions, such as pre-checking recurring insurance options, hiding cancellation links, or adding environmental care fees late in cart transactions."
    },
    {
      question: "How accurate is the automated AI audit engine?",
      answer: "The platform achieves a 95% accuracy score by parsing layout node trees via Computer Vision OCR and cross-referencing wording context with natural language processing models."
    },
    {
      question: "How do I load the Manifest V3 Browser Extension?",
      answer: "Open Chrome, navigate to chrome://extensions/, toggle Developer Mode in the top-right corner, click Load Unpacked in the top-left, and select the unpacked extension/ folder included in our build workspace."
    },
    {
      question: "Does the system support mobile viewport analyses?",
      answer: "Yes, by uploading screenshots of mobile checkouts or booking routes, our segmenter highlights hotspots using exact screen layout dimensions."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      {/* Background stars / patterns floating layout wrapper */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      
      <Navbar />
      <main className="flex-1 flex flex-col w-full relative z-10">
        <HeroSection />
        <div className="border-b-2 border-dashed border-slate-800/80 w-full" />
        <ProblemSection />
        <div className="border-b-2 border-dashed border-slate-800/80 w-full" />
        <SolutionWorkflow />
        <div className="border-b-2 border-dashed border-slate-800/80 w-full" />
        <TechStackSection />
        <div className="border-b-2 border-dashed border-slate-800/80 w-full" />
        <HowItWorks />
        <div className="border-b-2 border-dashed border-slate-800/80 w-full" />
        <InteractiveDemo />
        <div className="border-b-2 border-dashed border-slate-800/80 w-full" />
        <BenefitsStats />
        <div className="border-b-2 border-dashed border-slate-800/80 w-full" />
        <FeaturesTestimonials />
        
        {/* Pricing Tables */}
        <section id="pricing" className="relative py-24 px-4 max-w-7xl mx-auto overflow-hidden w-full">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-handwritten text-secondary font-semibold">Flexible Tiers</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">SaaS Pricing</h2>
            <p className="text-slate-400 text-sm sm:text-base font-sans">
              Choose the audit package that fits your scanning frequency requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Tier */}
            <div className="p-8 bg-slate-900/60 border-2 border-white/20 rounded-2xl scribble-border flex flex-col justify-between min-h-[380px] text-white">
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-300">Free Sandbox</h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">Perfect for individual consumers auditing checkouts.</p>
                </div>
                <div className="text-3xl font-display font-black">$0<span className="text-xs text-slate-500 font-semibold font-sans">/mo</span></div>
                
                <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> 25 Website URL scans monthly</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> 5 Screenshot OCR uploads</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Access to chrome extensions</li>
                </ul>
              </div>
              <Link
                href="/auth/register"
                className="w-full text-center py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-display font-bold text-xs rounded border-2 border-white/40 scribble-border scribble-shadow mt-8 inline-block"
              >
                Start Scanning Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="p-8 bg-slate-900/60 border-2 border-primary rounded-2xl scribble-border-primary flex flex-col justify-between min-h-[380px] text-white relative">
              <div className="absolute -top-3.5 right-6 px-3 py-1 bg-primary text-white text-[9px] font-bold font-mono rounded-full uppercase tracking-wider">
                Auditor Choice
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-secondary">Professional Auditor</h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">Designed for UX teams and regular audit reporters.</p>
                </div>
                <div className="text-3xl font-display font-black text-secondary">$19<span className="text-xs text-slate-500 font-semibold font-sans">/mo</span></div>
                
                <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary shrink-0" /> Unlimited URL scan queries</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary shrink-0" /> Unlimited Screenshot uploads</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary shrink-0" /> Create customized PDF client reports</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary shrink-0" /> Developer API Access keys (10K queries/mo)</li>
                </ul>
              </div>
              
              <Link
                href="/auth/register"
                className="w-full text-center py-2.5 bg-primary text-white font-display font-bold text-xs rounded scribble-border scribble-shadow mt-8 inline-block"
              >
                Access Professional Tier
              </Link>
            </div>
          </div>
        </section>

        <div className="border-b-2 border-dashed border-slate-800/80 w-full" />

        {/* FAQs */}
        <section id="faq" className="relative py-24 px-4 max-w-4xl mx-auto overflow-hidden w-full">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-handwritten text-accent font-semibold">Clear Explanations</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionRow key={idx} {...faq} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
