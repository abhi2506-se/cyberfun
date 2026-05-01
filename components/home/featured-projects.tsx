"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SAMPLE_PROJECTS = [
  {
    id: "1", title: "FinTech Dashboard", category: "Web App",
    desc: "Real-time financial analytics platform with AI-powered insights and predictive modeling.",
    tech: ["Next.js", "Python", "TensorFlow", "PostgreSQL"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    accent: "bg-blue-500",
    slug: "fintech-dashboard",
  },
  {
    id: "2", title: "Healthcare Portal", category: "Full Stack",
    desc: "HIPAA-compliant patient management system with telemedicine and appointment scheduling.",
    tech: ["React", "Node.js", "MongoDB", "WebRTC"],
    gradient: "from-green-500/20 to-emerald-500/20",
    accent: "bg-green-500",
    slug: "healthcare-portal",
  },
  {
    id: "3", title: "E-Commerce Platform", category: "Mobile + Web",
    desc: "Multi-vendor marketplace with AR product preview and AI-powered recommendations.",
    tech: ["React Native", "Next.js", "Stripe", "Redis"],
    gradient: "from-purple-500/20 to-pink-500/20",
    accent: "bg-purple-500",
    slug: "ecommerce-platform",
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="text-cyber-400 text-sm font-semibold uppercase tracking-wider">Our Work</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-cyber-400 hover:text-cyber-300 font-medium transition-colors shrink-0">
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SAMPLE_PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group"
            >
              <div className={`relative rounded-2xl bg-gradient-to-br ${project.gradient} border border-[var(--border)] overflow-hidden hover:border-cyber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyber-500/10 h-full p-6`}>
                {/* Category badge */}
                <Badge className="mb-4">{project.category}</Badge>

                {/* Mock UI preview */}
                <div className="relative h-40 mb-6 rounded-xl overflow-hidden bg-[var(--bg-tertiary)] border border-[var(--border)]">
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
                      <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-2xl ${project.accent} opacity-30 blur-xl`} />
                    <div className={`absolute w-8 h-8 rounded-xl ${project.accent} flex items-center justify-center`}>
                      <div className="w-4 h-4 bg-white/60 rounded" />
                    </div>
                  </div>
                  {/* Animated shimmer lines */}
                  <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
                    <div className="h-1.5 bg-[var(--border)] rounded-full w-3/4" />
                    <div className="h-1.5 bg-[var(--border)] rounded-full w-1/2" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-cyber-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">{project.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border)]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/portfolio/${project.slug}`} className="flex items-center gap-1 text-sm text-cyber-400 hover:text-cyber-300">
                    <ExternalLink className="w-4 h-4" /> Case Study
                  </Link>
                  <Link href="#" className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                    <Github className="w-4 h-4" /> Code
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
