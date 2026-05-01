"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContact } from "@/actions/contact";
import { COMPANY_INFO } from "@/lib/utils";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("name")    as HTMLInputElement).value,
      email:   (form.elements.namedItem("email")   as HTMLInputElement).value,
      phone:   (form.elements.namedItem("phone")   as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const result = await submitContact(data);
    if (result.success) {
      setStatus("success");
      setMessage(result.message || "Message sent!");
      form.reset();
    } else {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
    setTimeout(() => setStatus("idle"), 5000);
  }

  return (
    <div className="pt-16">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-cyber-400 text-sm font-semibold uppercase tracking-wider">Contact Us</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold mt-3 mb-4">
              Let&apos;s Build <span className="gradient-text">Together</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
              Have a project in mind? Tell us about it. We typically respond within 24 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div className="space-y-6" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              {[
                { icon: Mail, label: "Email", value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
                { icon: Phone, label: "Phone", value: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phone}` },
                { icon: MapPin, label: "Office", value: COMPANY_INFO.address, href: "#" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="flex gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-cyber-500/50 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-cyber-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyber-500/20 transition-colors">
                    <item.icon className="w-5 h-5 text-cyber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)] mb-1">{item.label}</div>
                    <div className="text-sm text-[var(--text-primary)] font-medium">{item.value}</div>
                  </div>
                </a>
              ))}

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-[var(--border)] h-48 bg-[var(--bg-tertiary)] relative">
                <div className="absolute inset-0 grid-pattern opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-muted)] gap-2">
                  <MapPin className="w-8 h-8 text-cyber-400" />
                  <span className="text-sm">New Delhi, India</span>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                    <h3 className="font-display text-2xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-[var(--text-muted)]">{message}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" name="name" placeholder="Arjun Kapoor" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" name="email" type="email" placeholder="arjun@company.com" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" placeholder="+91 98765 43210" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input id="company" name="company" placeholder="Your Company Ltd." />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input id="subject" name="subject" placeholder="I need a web application built..." required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea id="message" name="message" rows={5} placeholder="Tell us about your project, timeline, and budget..." required />
                    </div>
                    {status === "error" && (
                      <p className="text-red-400 text-sm">{message}</p>
                    )}
                    <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={status === "loading"}>
                      {status === "loading" ? (
                        <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</span>
                      ) : (
                        <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Message</span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
