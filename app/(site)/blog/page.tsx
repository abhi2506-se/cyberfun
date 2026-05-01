"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const POSTS = [
  {
    id: "1", slug: "nextjs-15-app-router", category: "Engineering",
    title: "Mastering Next.js 15 App Router: Performance Patterns for 2025",
    excerpt: "Deep dive into the latest Next.js features, Server Components, streaming, and how to build ultra-fast web applications that score 100 on Core Web Vitals.",
    date: "Jan 15, 2025", readTime: "12 min read", tags: ["Next.js", "Performance", "React"],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "2", slug: "ai-in-production", category: "AI/ML",
    title: "Running LLMs in Production: Cost, Latency, and Reliability at Scale",
    excerpt: "Practical guide to deploying AI models at scale — covering caching strategies, RAG architectures, prompt engineering, and managing API costs effectively.",
    date: "Jan 8, 2025", readTime: "15 min read", tags: ["AI", "LLM", "Architecture"],
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "3", slug: "design-systems-2025", category: "Design",
    title: "Building a World-Class Design System: From Figma to Production",
    excerpt: "How we built and shipped a complete design system for enterprise clients — tokens, components, documentation, and the processes that make it work.",
    date: "Dec 28, 2024", readTime: "10 min read", tags: ["Design", "Figma", "Tailwind"],
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "4", slug: "postgresql-performance", category: "Backend",
    title: "PostgreSQL Query Optimization: Indexing Strategies That Actually Work",
    excerpt: "Real-world techniques to speed up slow queries — from index design to query planning, partitioning, and connection pooling with PgBouncer.",
    date: "Dec 20, 2024", readTime: "8 min read", tags: ["PostgreSQL", "Backend", "Database"],
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
  {
    id: "5", slug: "react-native-vs-flutter", category: "Mobile",
    title: "React Native vs Flutter in 2025: A Data-Driven Comparison",
    excerpt: "We've shipped 30+ apps in both frameworks. Here's our honest, performance-benchmarked comparison to help you pick the right one for your next project.",
    date: "Dec 10, 2024", readTime: "11 min read", tags: ["Mobile", "React Native", "Flutter"],
    gradient: "from-sky-500/20 to-indigo-500/20",
  },
  {
    id: "6", slug: "startup-tech-stack", category: "Strategy",
    title: "The Ideal Tech Stack for Startups in 2025: Our Proven Blueprint",
    excerpt: "After helping 50+ startups launch and scale, we've developed an opinionated stack that balances speed-to-market, developer experience, and long-term scalability.",
    date: "Nov 30, 2024", readTime: "9 min read", tags: ["Startups", "Architecture", "Strategy"],
    gradient: "from-rose-500/20 to-red-500/20",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <div className="pt-16">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-cyber-400 text-sm font-semibold uppercase tracking-wider">Blog</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold mt-3 mb-4">
              Engineering <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
              Deep technical articles, tutorials, and lessons from building production software.
            </p>
          </motion.div>

          {/* Featured post */}
          <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Link href={`/blog/${featured.slug}`}>
              <div className={`rounded-3xl border border-[var(--border)] bg-gradient-to-br ${featured.gradient} p-8 sm:p-12 hover:border-cyber-500/50 transition-all duration-300 group`}>
                <Badge className="mb-4">{featured.category}</Badge>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 group-hover:text-cyber-400 transition-colors max-w-2xl">
                  {featured.title}
                </h2>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6 max-w-2xl">{featured.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{featured.readTime}</span>
                  <span className="flex items-center gap-2 ml-auto text-cyber-400 font-medium">
                    Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Rest of posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden hover:border-cyber-500/50 transition-all duration-300 hover:shadow-lg group">
                    <div className={`h-32 bg-gradient-to-br ${post.gradient} relative`}>
                      <div className="absolute inset-0 grid-pattern opacity-30" />
                      <div className="absolute top-4 left-4"><Badge>{post.category}</Badge></div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-cyber-400 transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {post.tags.map((t) => (
                          <span key={t} className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                            <Tag className="w-2.5 h-2.5" />{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
