"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, FileCode, Search, ScanLine, FileText, Terminal, CheckCircle2 } from "lucide-react";

interface TechDetails {
  name: string;
  tagline: string;
  desc: string;
  icon: React.ReactNode;
  accent: string;
  metrics: { label: string; value: string }[];
  code: string;
  language: string;
}

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const techs: TechDetails[] = [
    {
      name: "Scraping & DOM Maps",
      tagline: "Headless browsers & structural crawling",
      desc: "Automatically sweeps targets using headless browser pools, parsing and mapping structural DOM nodes, iframe properties, and visibility style classes to capture layout indicators.",
      icon: <Search className="w-5 h-5 text-amber-400" />,
      accent: "#F97316",
      metrics: [
        { label: "Request Rate", value: "45 req/sec" },
        { label: "Extraction Speed", value: "110ms / page" },
        { label: "Engine Stack", value: "Puppeteer & Cheerio" }
      ],
      language: "json",
      code: `{
  "engine": "Headless Chromium",
  "action": "DOM_SWEEP_AND_MAP",
  "target_url": "https://example-shop.com/checkout",
  "total_elements_mapped": 142,
  "suspicious_patterns": [
    {
      "selector": "input#promo-optin[checked]",
      "clash": "Pre-checked continuity box"
    }
  ],
  "status": "COMPLETED"
}`
    },
    {
      name: "Computer Vision / OCR",
      tagline: "Deep OCR & canvas element segmentation",
      desc: "Extracts textual contents directly from screenshot elements. It uses customized image preprocessing filters to enhance pixel contrast before executing characters extraction.",
      icon: <ScanLine className="w-5 h-5 text-cyan-400" />,
      accent: "#22D3EE",
      metrics: [
        { label: "Segment Accuracy", value: "98.6%" },
        { label: "Canvas Resolution", value: "Up to 4K" },
        { label: "Libraries", value: "OpenCV & Tesseract" }
      ],
      language: "python",
      code: `def segment_canvas_hotspots(image_bytes):
    # Grayscale conversion for high-contrast OCR
    gray = cv2.cvtColor(image_bytes, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
    
    # Locate UI bounding contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    hotspots = [cv2.boundingRect(c) for c in contours if cv2.contourArea(c) > 50]
    
    return [{"x": x, "y": y, "w": w, "h": h} for (x, y, w, h) in hotspots]`
    },
    {
      name: "Natural Language (NLP)",
      tagline: "Semantic classification of deceptive copy",
      desc: "Analyzes textual contexts using NLP algorithms to flag pressure tactics, guilt-tripping choice labels, hidden conditions, and auto-renewal disclaimers.",
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      accent: "#10B981",
      metrics: [
        { label: "Lexicon Coverage", value: "50,000+ terms" },
        { label: "Inference Latency", value: "32ms" },
        { label: "Model Classifier", value: "DistilBERT Finetuned" }
      ],
      language: "python",
      code: `def analyze_confirm_shaming(button_text: str):
    tokens = tokenizer.encode(button_text, return_tensors="pt")
    outputs = sentiment_classifier(tokens)
    
    # Extract guilt and manipulation dimensions
    scores = torch.softmax(outputs.logits, dim=1).tolist()[0]
    guilt_index = scores[LABEL_GUILT_SHAME]
    
    return {
        "text": button_text,
        "manipulation_confidence": f"{guilt_index * 100:.2f}%",
        "flag_status": guilt_index > 0.75
    }`
    },
    {
      name: "Machine Learning",
      tagline: "UX layout and flow tagging models",
      desc: "Processes extracted layout properties, visual contrast levels, and click sequences through trained classifiers to categorize patterns into standard dark pattern types.",
      icon: <Brain className="w-5 h-5 text-rose-400" />,
      accent: "#EC4899",
      metrics: [
        { label: "Model Confidence", value: "94.2% avg" },
        { label: "Tag Latency", value: "15ms" },
        { label: "Classifier Stack", value: "LightGBM / XGBoost" }
      ],
      language: "json",
      code: `{
  "classifier": "UX-Layout-Tagging-v2.1",
  "input_nodes": {
    "button_contrast_ratio": 1.25,
    "has_cancel_option": false,
    "relative_size_ratio": 0.42
  },
  "inferred_classification": "Misleading CTA",
  "confidence": 0.9421,
  "category": "Interference / Obstruction"
}`
    },
    {
      name: "Python Core",
      tagline: "Async backend workers & queues",
      desc: "Serves as the high-throughput worker core, scheduling heavy OCR pipelines, model inferences, and scraping jobs asynchronously via structured job queues.",
      icon: <FileCode className="w-5 h-5 text-yellow-400" />,
      accent: "#8B5CF6",
      metrics: [
        { label: "Queue Latency", value: "<85ms" },
        { label: "Async Ingestion", value: "Celery & Redis" },
        { label: "API Framework", value: "FastAPI / Python" }
      ],
      language: "python",
      code: `@app.post("/api/v1/analyze-async")
async def queue_analysis_job(payload: ScanPayload):
    # Enqueue job to background worker workers
    job = scan_queue.delay(
        url=payload.url, 
        screenshot_enabled=payload.capture_screenshot
    )
    return {
        "job_id": job.id, 
        "status": "QUEUED", 
        "estimated_wait": "1.5s"
    }`
    }
  ];

  return (
    <section className="relative py-24 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center space-y-4 max-w-2xl mx-auto mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest font-sans text-accent font-semibold"
        >
          System Stack
        </motion.span>
        <motion.h2
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-display font-extrabold text-white"
        >
          Technology Stack
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 text-sm sm:text-base font-sans"
        >
          We orchestrate a high-performance array of frameworks and models to evaluate website scripts and interface frames.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
        
        {/* Left Column: Tech Tabs */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {techs.map((tech, idx) => {
            const isActive = activeTab === idx;
            return (
              <motion.div
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex gap-4 items-start relative overflow-hidden ${
                  isActive 
                    ? "bg-slate-900/60 border-white/20 shadow-[0_4px_25px_-5px_rgba(139,92,246,0.15)]" 
                    : "bg-slate-950/40 border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/20"
                }`}
                whileHover={{ scale: 1.01 }}
                style={{
                  borderColor: isActive ? tech.accent : undefined,
                  boxShadow: isActive ? `0 0 20px -5px ${tech.accent}33` : undefined
                }}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div 
                    layoutId="activeBar"
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: tech.accent }}
                  />
                )}
                
                <div 
                  className="p-2.5 rounded-lg border bg-slate-900/80"
                  style={{ 
                    borderColor: isActive ? `${tech.accent}50` : "rgba(255,255,255,0.08)",
                    color: tech.accent
                  }}
                >
                  {tech.icon}
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-sm text-white flex items-center gap-2">
                    {tech.name}
                    {isActive && <CheckCircle2 className="w-3.5 h-3.5" style={{ color: tech.accent }} />}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {tech.tagline}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Console Details */}
        <div className="lg:col-span-7 flex">
          <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col min-h-[450px]">
            {/* Console Header */}
            <div className="bg-slate-900/60 px-5 py-4 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-mono font-semibold tracking-wider text-slate-300">
                  SYSTEM CONSOLE: <span style={{ color: techs[activeTab].accent }}>{techs[activeTab].name.toUpperCase()}</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Live Status</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              
              {/* Description and tags */}
              <div className="space-y-3">
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {techs[activeTab].desc}
                </p>
                
                {/* Tech specifications grid */}
                <div className="grid grid-cols-3 gap-4 pt-2">
                  {techs[activeTab].metrics.map((m, mIdx) => (
                    <div key={mIdx} className="bg-slate-900/40 border border-slate-800/60 rounded-lg p-3 space-y-1">
                      <span className="block text-[10px] uppercase font-mono text-slate-500 tracking-wider">
                        {m.label}
                      </span>
                      <span className="block text-xs font-display font-bold text-white">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Snippet Console Window */}
              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col font-mono text-[11px] leading-relaxed relative min-h-[180px]">
                {/* Window header */}
                <div className="bg-slate-950 px-4 py-2 border-b border-slate-800/60 flex items-center justify-between text-slate-500">
                  <span className="text-[10px] uppercase tracking-wider">{techs[activeTab].language} output</span>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-800" />
                    <span className="w-2 h-2 rounded-full bg-slate-800" />
                    <span className="w-2 h-2 rounded-full bg-slate-800" />
                  </div>
                </div>
                
                {/* Code viewport */}
                <div className="p-4 flex-1 overflow-x-auto text-slate-300 font-mono select-none">
                  <pre className="text-left font-mono">
                    <code>{techs[activeTab].code}</code>
                  </pre>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
