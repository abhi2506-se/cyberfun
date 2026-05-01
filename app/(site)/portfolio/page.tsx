"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = ["All", "Web App", "Mobile", "AI/ML", "Design", "E-Commerce"];

const PROJECTS = [
  { id: "1", title: "FinanceAI Dashboard",  category: "AI/ML",       tags: ["Next.js", "Python", "ML"], gradient: "from-blue-500/30 to-cyan-500/30",   desc: "Real-time financial analytics with ML predictions" },
  { id: "2", title: "MedConnect Platform",  category: "Web App",     tags: ["React", "Node.js"],        gradient: "from-green-500/30 to-teal-500/30",   desc: "HIPAA-compliant telemedicine platform for 50K patients" },
  { id: "3", title: "ShopAI Marketplace",   category: "E-Commerce",  tags: ["Next.js", "Stripe"],       gradient: "from-purple-500/30 to-pink-500/30",  desc: "Multi-vendor marketplace with AR product preview" },
  { id: "4", title: "TradeRoute App",       category: "Mobile",      tags: ["React Native"],            gradient: "from-orange-500/30 to-red-500/30",   desc: "B2B trade platform for 10K+ SME businesses" },
  { id: "5", title: "DeepSense AI",         category: "AI/ML",       tags: ["Python", "TensorFlow"],    gradient: "from-indigo-500/30 to-violet-500/30", desc: "Computer vision defect detection for manufacturing" },
  { id: "6", title: "LegalTech Suite",      category: "Web App",     tags: ["Next.js", "Prisma"],       gradient: "from-amber-500/30 to-yellow-500/30", desc: "Document automation and case management system" },
  { id: "7", title: "FitLife Mobile",       category: "Mobile",      tags: ["Flutter", "Firebase"],     gradient: "from-rose-500/30 to-pink-500/30",    desc: "Personal training and nutrition tracking app" },
  { id: "8", title: "BrandStudio",          category: "Design",      tags: ["Figma", "Framer"],         gradient: "from-sky-500/30 to-blue-500/30",     desc: "Complete brand identity for 30+ startups" },
  { id: "9", title: "EdTech Platform",      category: "Web App",     tags: ["Next.js", "WebRTC"],       gradient: "from-emerald-500/30 to-green-500/30","desc": "Live learning platform with 100K+ students" },
];

export default function PortfolioPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <div className="pt-16">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-cyber-400 text-sm font-semibold uppercase tracking-wider">Portfolio</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold mt-3 mb-4">
              Our <span className="gradient-text">Best Work</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
              A selection of projects we&apos;re incredibly proud of. Each one represents our commitment to excellence.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Filter className="w-4 h-4 text-[var(--text-muted)] self-center mr-2" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === cat
                    ? "bg-cyber-500 text-white"
                    : "border border-[var(--border)] text-[var(--text-secondary)] hover:border-cyber-500/50 hover:text-[var(--text-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden hover:border-cyber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyber-500/10"
                >
                  {/* Visual */}
                  <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 grid-pattern opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-display font-bold text-white/20">{project.id.padStart(2, "0")}</div>
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                        <Github className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>

                  <div className="p-5">
                    <Badge className="mb-2">{project.category}</Badge>
                    <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-cyber-400 transition-colors">{project.title}</h3>
                    <p className="text-[var(--text-muted)] text-sm mb-3">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border)]">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
