"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Smartphone, Palette, Brain, Cloud, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SERVICES = [
  {
    icon: Globe, color: "from-blue-500 to-cyan-500",
    title: "Web Development", slug: "web",
    desc: "Blazing-fast, scalable web applications built with Next.js, React, and modern frameworks.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    icon: Smartphone, color: "from-purple-500 to-pink-500",
    title: "App Development", slug: "app",
    desc: "Native and cross-platform mobile experiences for iOS and Android.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    icon: Palette, color: "from-orange-500 to-red-500",
    title: "UI/UX Design", slug: "uiux",
    desc: "Human-centered design that converts visitors into loyal customers.",
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    icon: Brain, color: "from-green-500 to-emerald-500",
    title: "AI Solutions", slug: "ai",
    desc: "Intelligent systems powered by machine learning and generative AI.",
    tags: ["LLMs", "ML Models", "Automation"],
  },
  {
    icon: Cloud, color: "from-sky-500 to-indigo-500",
    title: "Cloud Services", slug: "cloud",
    desc: "Reliable, scalable cloud infrastructure and DevOps solutions.",
    tags: ["AWS", "GCP", "Kubernetes", "CI/CD"],
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyber-400 text-sm font-semibold uppercase tracking-wider">What We Do</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-4">
            End-to-End <span className="gradient-text">Digital Services</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            From concept to deployment, we provide comprehensive technology solutions tailored to your business needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Link href={`/services#${service.slug}`}>
                <Card className="h-full group hover:border-cyber-500/50 hover:shadow-lg hover:shadow-cyber-500/10 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-cyber-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">{service.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-cyber-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/services" className="inline-flex items-center gap-2 text-cyber-400 hover:text-cyber-300 font-medium transition-colors">
            View all services <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
