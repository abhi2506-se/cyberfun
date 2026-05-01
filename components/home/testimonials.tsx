"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya Sharma", role: "CTO", company: "FinovateAI",
    content: "Cyberfun delivered our fintech platform 3 weeks ahead of schedule. Their technical expertise and attention to detail is unmatched. The team felt like an extension of our own engineers.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Rahul Mehta", role: "Founder", company: "MedConnect India",
    content: "We needed a HIPAA-compliant healthcare platform built fast. Cyberfun not only delivered an exceptional product but also guided us through complex compliance requirements.",
    rating: 5,
    avatar: "RM",
  },
  {
    name: "Sarah Johnson", role: "VP Engineering", company: "RetailGiant UK",
    content: "Our e-commerce platform handles 100K+ daily transactions flawlessly. The performance optimization work Cyberfun did was phenomenal — 60% faster page loads.",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Ahmed Al-Hassan", role: "CEO", company: "TechVentures MENA",
    content: "Outstanding AI solutions that transformed our customer service. The chatbot they built handles 80% of queries automatically with remarkable accuracy.",
    rating: 5,
    avatar: "AA",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((p) => (p + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-cyber-400 text-sm font-semibold uppercase tracking-wider">Testimonials</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3">
            Loved by <span className="gradient-text">Clients</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-2xl p-8 sm:p-12 border border-[var(--border)] text-center"
            >
              <div className="flex justify-center mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <blockquote className="text-lg sm:text-xl text-[var(--text-primary)] leading-relaxed mb-8 font-light italic">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyber-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-[var(--text-primary)]">{t.name}</div>
                  <div className="text-sm text-[var(--text-muted)]">{t.role} at {t.company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-cyber-500/50 hover:text-cyber-400 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-cyber-400 w-6" : "bg-[var(--border)]"}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-cyber-500/50 hover:text-cyber-400 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
