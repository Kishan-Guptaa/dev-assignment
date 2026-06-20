"use client";

import { motion } from "framer-motion";
import { CreditCard, ShieldAlert, BadgeAlert, AlertCircle, EyeOff, Star } from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  example: string;
  icon: React.ReactNode;
  borderClass: string;
  accentColor: string;
  delay: number;
}

const ProblemCard = ({ title, description, example, icon, borderClass, accentColor, delay }: CardProps) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`p-6 bg-slate-900/60 text-white scribble-shadow flex flex-col justify-between min-h-[250px] relative overflow-hidden cursor-pointer ${borderClass}`}
      style={{ color: accentColor }}
    >
      <div className="space-y-4">
        {/* Top line icon */}
        <div className="flex justify-between items-start">
          <div className="p-3 border-2 border-current rounded-lg scribble-border-alt bg-slate-950">
            {icon}
          </div>
          <AlertCircle className="w-5 h-5 opacity-40 hover:opacity-100 transition-opacity" />
        </div>

        <div className="space-y-2">
          <h3 className="font-display font-bold text-xl text-white tracking-wide">
            {title}
          </h3>
          <p className="text-sm text-slate-300 font-sans leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t-2 border-dashed border-slate-800/80 mt-4">
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Common Trap:</span>
        <p className="text-xs text-slate-200 italic mt-0.5">&ldquo;{example}&rdquo;</p>
      </div>
    </motion.div>
  );
};

export default function ProblemSection() {
  const cards: CardProps[] = [
    {
      title: "Forced Subscriptions",
      description: "Tricking users into recurring billing agreements using obscured checkboxes, confusing trial parameters, or multi-step checkout processes.",
      example: "7-day trial automatically renews into a $49.99 annual package with no email warnings.",
      icon: <CreditCard className="w-6 h-6" />,
      borderClass: "scribble-border-primary",
      accentColor: "#8B5CF6", // primary violet
      delay: 0.1,
    },
    {
      title: "Hidden Costs",
      description: "Adding unrevealed fees, delivery surcharges, or processing premiums late in the purchasing flow when decision inertia is highest.",
      example: "Delivery service adds an environment care levy of $3.99 at the final tap.",
      icon: <ShieldAlert className="w-6 h-6" />,
      borderClass: "scribble-border-secondary",
      accentColor: "#22D3EE", // secondary cyan
      delay: 0.2,
    },
    {
      title: "Misleading Buttons",
      description: "Using contrasting colors, asymmetric visual weights, or reverse psychology text to force clicks towards risky or expensive pathways.",
      example: "High contrast 'Accept All Addons' button, and a grey 'Customise' button that closes page.",
      icon: <BadgeAlert className="w-6 h-6" />,
      borderClass: "scribble-border-accent",
      accentColor: "#F97316", // accent orange
      delay: 0.3,
    },
    {
      title: "Privacy Manipulation",
      description: "Guiding users into disclosing more personal telemetry than intended via complex options configurations or default-on shares.",
      example: "Default opt-in to sell location data to brokers hidden deep under 3 dropdown tabs.",
      icon: <EyeOff className="w-6 h-6" />,
      borderClass: "scribble-border",
      accentColor: "#FFFFFF", // white border
      delay: 0.4,
    },
  ];

  return (
    <section id="problem" className="relative py-24 px-4 max-w-7xl mx-auto overflow-hidden">
      {/* Background doodles */}
      <div className="absolute top-12 right-12 text-slate-800 pointer-events-none hidden md:block">
        <Star className="w-8 h-8 animate-pulse" />
      </div>

      <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest font-handwritten text-accent font-semibold"
        >
          Manipulative Tactics
        </motion.span>
        <motion.h2
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-display font-extrabold text-white"
        >
          Why Dark Patterns Matter?
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 text-sm sm:text-base font-sans"
        >
          Dark patterns aren&apos;t mistakes — they are intentionally designed UX patterns engineered to exploit cognitive biases and extract more action or revenue than you would willingly supply.
        </motion.p>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {cards.map((card, idx) => (
          <ProblemCard key={idx} {...card} />
        ))}
      </div>
    </section>
  );
}
