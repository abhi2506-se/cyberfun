"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Smartphone, Palette, Brain, Cloud, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SERVICES = [
  {
    id: "web", icon: Globe, gradient: "from-blue-500 to-cyan-500",
    title: "Web Development",
    tagline: "Blazing Fast. Beautifully Crafted.",
    description: "We build performant, scalable web applications using the latest technologies. From landing pages to complex SaaS platforms, we deliver exceptional web experiences.",
    features: [
      "Next.js & React development", "TypeScript & Node.js backend",
      "API design & integration", "Performance optimization",
      "SEO-first architecture", "PWA development",
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
    cta: "Start a Web Project",
  },
  {
    id: "app", icon: Smartphone, gradient: "from-purple-500 to-pink-500",
    title: "App Development",
    tagline: "Native Experiences. Everywhere.",
    description: "Cross-platform mobile apps that feel truly native. Using React Native and Flutter, we ship apps that delight users on both iOS and Android.",
    features: [
      "React Native & Flutter", "iOS & Android native",
      "App Store optimization", "Offline-first architecture",
      "Push notifications", "In-app payments",
    ],
    tech: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Expo"],
    cta: "Build Your App",
  },
  {
    id: "uiux", icon: Palette, gradient: "from-orange-500 to-red-500",
    title: "UI/UX Design",
    tagline: "Design That Converts.",
    description: "Human-centered design that combines aesthetics with functionality. We create intuitive interfaces that users love and that drive business results.",
    features: [
      "User research & personas", "Wireframing & prototyping",
      "Design systems", "Accessibility (WCAG 2.1)",
      "Usability testing", "Motion design",
    ],
    tech: ["Figma", "Framer", "Adobe XD", "Principle", "Lottie", "Storybook"],
    cta: "Design My Product",
  },
  {
    id: "ai", icon: Brain, gradient: "from-green-500 to-emerald-500",
    title: "AI & ML Solutions",
    tagline: "Intelligence, Engineered.",
    description: "Harness the power of artificial intelligence to automate workflows, generate insights, and build smarter products. From LLM integration to custom ML models.",
    features: [
      "LLM integration (GPT, Claude)", "Custom ML model training",
      "Computer vision", "NLP & chatbots",
      "Predictive analytics", "AI-powered automation",
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "OpenAI", "LangChain", "Hugging Face"],
    cta: "Explore AI Solutions",
  },
  {
    id: "cloud", icon: Cloud, gradient: "from-sky-500 to-indigo-500",
    title: "Cloud & DevOps",
    tagline: "Scale Without Limits.",
    description: "Modern cloud infrastructure that scales with your business. We design, implement, and manage cloud-native architectures with enterprise-grade reliability.",
    features: [
      "AWS, GCP, Azure setup", "Kubernetes orchestration",
      "CI/CD pipelines", "Infrastructure as Code",
      "Security & compliance", "Cost optimization",
    ],
    tech: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    cta: "Modernize Infrastructure",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-cyber-400 text-sm font-semibold uppercase tracking-wider">Services</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold mt-3 mb-6">
              Complete <span className="gradient-text">Digital Services</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              End-to-end technology solutions from design to deployment. Everything you need to build, launch, and scale your digital product.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-20">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              id={service.id}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Visual */}
              <div className="w-full lg:w-1/2">
                <div className={`relative rounded-3xl p-1 bg-gradient-to-br ${service.gradient}`}>
                  <div className="rounded-[22px] bg-[var(--bg-secondary)] p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {service.tech.map((t) => (
                        <div key={t} className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-xs text-center text-[var(--text-muted)] border border-[var(--border)]">
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <span className="text-cyber-400 text-sm font-semibold uppercase tracking-wider">{service.tagline}</span>
                <h2 className="font-display text-4xl font-bold mt-2 mb-4">{service.title}</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                      <CheckCircle2 className="w-4 h-4 text-cyber-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button variant="gradient" className="group">
                    {service.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
