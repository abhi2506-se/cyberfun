"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 150, suffix: "+", label: "Projects Delivered",  desc: "Across 20+ countries"     },
  { value: 98,  suffix: "%", label: "Client Satisfaction", desc: "Based on NPS surveys"      },
  { value: 50,  suffix: "+", label: "Expert Engineers",    desc: "Full-stack specialists"    },
  { value: 5,   suffix: "yrs", label: "Industry Experience", desc: "Since 2020"             },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const step = value / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-500/5 via-purple-500/5 to-cyan-500/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-display font-bold gradient-text mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-semibold text-[var(--text-primary)] mb-1">{stat.label}</div>
              <div className="text-sm text-[var(--text-muted)]">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
