"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Rocket, Users, Award, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TEAM = [
  { name: "Arjun Kapoor",    role: "CEO & Co-Founder",       bio: "10+ years in software architecture",  gradient: "from-blue-400 to-cyan-400",   initials: "AK" },
  { name: "Divya Sharma",    role: "CTO & Co-Founder",       bio: "Ex-Google, AI/ML specialist",         gradient: "from-purple-400 to-pink-400", initials: "DS" },
  { name: "Vikram Singh",    role: "Head of Design",          bio: "Award-winning UI/UX designer",        gradient: "from-orange-400 to-red-400",  initials: "VS" },
  { name: "Ananya Patel",    role: "Head of Engineering",     bio: "Full-stack & DevOps expert",          gradient: "from-green-400 to-teal-400",  initials: "AP" },
  { name: "Rajan Mehta",     role: "Head of Business Dev.",   bio: "Growth strategist & sales leader",    gradient: "from-yellow-400 to-orange-400", initials: "RM" },
  { name: "Neha Gupta",      role: "Lead AI Engineer",        bio: "PhD in Machine Learning, IIT Delhi",  gradient: "from-cyan-400 to-indigo-400", initials: "NG" },
];

const TIMELINE = [
  { year: "2020", title: "Founded",          desc: "Cyberfun was incorporated in New Delhi with a team of 5 passionate engineers." },
  { year: "2021", title: "First 20 Clients", desc: "Grew our client base to 20+ companies across India, delivering web and app solutions." },
  { year: "2022", title: "AI Division",      desc: "Launched our AI/ML practice and delivered our first intelligent automation project." },
  { year: "2023", title: "International",    desc: "Expanded to serve clients in UK, UAE, and USA. Team grew to 35+ engineers." },
  { year: "2024", title: "150+ Projects",    desc: "Crossed 150 successful project deliveries and launched our Cloud Services division." },
  { year: "2025", title: "Global Expansion", desc: "Opening offices in Dubai and London. Scaling to 100+ team members worldwide." },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-cyber-400 text-sm font-semibold uppercase tracking-wider">About Us</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold mt-3 mb-6">
              We Build <span className="gradient-text">Digital Excellence</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Cyberfun Software Services is a premier technology company headquartered in New Delhi, India. Since 2020, we've been crafting exceptional digital experiences for startups, enterprises, and everything in between.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Our Mission",    color: "from-blue-500 to-cyan-500",   text: "To empower businesses worldwide with cutting-edge technology solutions that drive growth, efficiency, and competitive advantage." },
              { icon: Eye,    title: "Our Vision",     color: "from-purple-500 to-pink-500", text: "To be the most trusted software partner for innovative companies building the future — from early-stage startups to global enterprises." },
              { icon: Rocket, title: "Our Approach",   color: "from-orange-500 to-red-500",  text: "Agile methodology, clean code principles, and obsessive attention to quality. We ship fast without compromising on excellence." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-[var(--text-muted)] leading-relaxed">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-cyber-400 text-sm font-semibold uppercase tracking-wider">The Team</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3">
              Meet the <span className="gradient-text">Builders</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="group hover:border-cyber-500/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {member.initials}
                    </div>
                    <h3 className="font-display text-lg font-semibold">{member.name}</h3>
                    <p className="text-cyber-400 text-sm mb-2">{member.role}</p>
                    <p className="text-[var(--text-muted)] text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-cyber-400 text-sm font-semibold uppercase tracking-wider">Our Journey</span>
            <h2 className="font-display text-4xl font-bold mt-3">
              Company <span className="gradient-text">Timeline</span>
            </h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-500 to-purple-500" />
            <div className="space-y-8">
              {TIMELINE.map((event, i) => (
                <motion.div
                  key={event.year}
                  className="flex gap-8 pl-20 relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="absolute left-4 top-2 w-8 h-8 rounded-full bg-gradient-to-br from-cyber-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {event.year.slice(2)}
                  </div>
                  <div>
                    <div className="text-xs text-cyber-400 font-semibold mb-1">{event.year}</div>
                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">{event.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl font-bold">Our <span className="gradient-text">Values</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Users,   label: "Client First",       desc: "Your success is our success"      },
              { icon: Award,   label: "Quality Obsessed",    desc: "No shortcuts, ever"               },
              { icon: Rocket,  label: "Move Fast",           desc: "Ship early, iterate often"        },
              { icon: Globe,   label: "Think Global",        desc: "World-class standards"            },
              { icon: Target,  label: "Outcome Driven",      desc: "Results over activity"            },
              { icon: Eye,     label: "Transparent",         desc: "Open communication always"        },
            ].map((value, i) => (
              <motion.div
                key={value.label}
                className="p-6 rounded-2xl border border-[var(--border)] hover:border-cyber-500/50 transition-colors text-center group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <value.icon className="w-8 h-8 text-cyber-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-semibold mb-1">{value.label}</div>
                <div className="text-sm text-[var(--text-muted)]">{value.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
