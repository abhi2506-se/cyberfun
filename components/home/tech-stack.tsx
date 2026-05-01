"use client";

import React from "react";
import { motion } from "framer-motion";

const TECH = [
  "Next.js", "React", "TypeScript", "Node.js", "Python",
  "PostgreSQL", "MongoDB", "Redis", "AWS", "Docker",
  "Kubernetes", "TensorFlow", "React Native", "Flutter", "Figma",
  "GraphQL", "Prisma", "Tailwind CSS", "Stripe", "Vercel",
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className={`flex gap-4 ${reverse ? "animate-marquee2" : "animate-marquee"}`}
        style={{ minWidth: "max-content" }}
      >
        {[...TECH, ...TECH].map((tech, i) => (
          <div key={`${tech}-${i}`} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] whitespace-nowrap text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-cyber-500/50 transition-colors cursor-default">
            {tech}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function TechStack() {
  return (
    <section className="py-20 bg-[var(--bg-secondary)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-cyber-400 text-sm font-semibold uppercase tracking-wider">Technology</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3">
            Our <span className="gradient-text">Tech Arsenal</span>
          </h2>
        </motion.div>
      </div>
      <div className="space-y-4">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </section>
  );
}
