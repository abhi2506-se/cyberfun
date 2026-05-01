"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, DollarSign, Users, ChevronDown, Upload, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { submitApplication } from "@/actions/jobs";

const JOBS = [
  { id: "1", title: "Senior Full-Stack Engineer", department: "Engineering", location: "New Delhi / Remote", type: "FULL_TIME", experience: "4-6 years", salary: "₹18-28 LPA", tags: ["Next.js", "TypeScript", "PostgreSQL"] },
  { id: "2", title: "UI/UX Designer",              department: "Design",      location: "New Delhi / Hybrid", type: "FULL_TIME", experience: "3-5 years", salary: "₹12-20 LPA", tags: ["Figma", "Framer", "Design Systems"] },
  { id: "3", title: "ML Engineer",                 department: "AI",          location: "Remote",             type: "FULL_TIME", experience: "3-5 years", salary: "₹20-35 LPA", tags: ["Python", "TensorFlow", "LLMs"] },
  { id: "4", title: "DevOps Engineer",             department: "Engineering", location: "New Delhi / Remote", type: "FULL_TIME", experience: "2-4 years", salary: "₹15-25 LPA", tags: ["AWS", "Kubernetes", "Terraform"] },
  { id: "5", title: "React Native Developer",      department: "Mobile",      location: "Remote",             type: "REMOTE",    experience: "2-4 years", salary: "₹12-22 LPA", tags: ["React Native", "iOS", "Android"] },
  { id: "6", title: "Business Development Manager",department: "Sales",       location: "New Delhi",          type: "FULL_TIME", experience: "4-7 years", salary: "₹15-25 LPA + Commission", tags: ["B2B Sales", "SaaS", "Enterprise"] },
];

const PERKS = [
  { label: "Remote Friendly",     desc: "Work from anywhere" },
  { label: "Health Insurance",    desc: "Full family coverage" },
  { label: "Learning Budget",     desc: "₹50K/year for courses" },
  { label: "ESOPs",               desc: "Equity participation" },
  { label: "Flexible Hours",      desc: "Async-first culture" },
  { label: "Annual Retreats",     desc: "Team off-sites" },
];

type JobType = typeof JOBS[0];

function JobCard({ job, onApply }: { job: JobType; onApply: (job: JobType) => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div className="border border-[var(--border)] rounded-2xl bg-[var(--bg-secondary)] overflow-hidden hover:border-cyber-500/50 transition-all duration-300" layout>
      <button className="w-full p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4" onClick={() => setExpanded(!expanded)}>
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="default">{job.department}</Badge>
            <Badge variant="secondary">{job.type.replace("_", " ")}</Badge>
          </div>
          <h3 className="font-display text-xl font-semibold">{job.title}</h3>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-[var(--text-muted)]">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.experience}</span>
            <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{job.salary}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {job.tags.map((t) => <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-muted)]">{t}</span>)}
          </div>
          <ChevronDown className={`w-5 h-5 text-[var(--text-muted)] transition-transform shrink-0 ${expanded ? "rotate-180" : ""}`} />
        </div>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="px-6 pb-6 pt-2 border-t border-[var(--border)]">
              <p className="text-[var(--text-muted)] text-sm mb-4">Join our team and work on cutting-edge projects that impact thousands of users globally. We offer competitive compensation, equity, and an incredible growth environment.</p>
              <Button variant="gradient" onClick={() => onApply(job)}>Apply Now</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ApplyModal({ job, onClose }: { job: JobType; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = {
      jobId: job.id,
      name:  (form.elements.namedItem("name")  as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      resumeUrl:   (form.elements.namedItem("resumeUrl") as HTMLInputElement).value || "https://example.com/resume.pdf",
      coverLetter: (form.elements.namedItem("coverLetter") as HTMLTextAreaElement).value,
      portfolio:   (form.elements.namedItem("portfolio")   as HTMLInputElement).value,
    };
    await submitApplication(data);
    setStatus("success");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-lg bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)] shadow-2xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      >
        <div className="sticky top-0 bg-[var(--bg-secondary)] border-b border-[var(--border)] p-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold">Apply for Position</h2>
            <p className="text-sm text-cyber-400">{job.title}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">
          {status === "success" ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-semibold mb-2">Application Submitted!</h3>
              <p className="text-[var(--text-muted)]">We&apos;ll review your application and get back to you within 5-7 business days.</p>
              <Button className="mt-6" onClick={onClose}>Close</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2"><Label>Full Name *</Label><Input name="name" placeholder="Your full name" required /></div>
              <div className="space-y-2"><Label>Email *</Label><Input name="email" type="email" placeholder="you@email.com" required /></div>
              <div className="space-y-2"><Label>Phone</Label><Input name="phone" placeholder="+91 98765 43210" /></div>
              <div className="space-y-2">
                <Label>Resume URL *</Label>
                <Input name="resumeUrl" placeholder="https://drive.google.com/your-resume" />
                <p className="text-xs text-[var(--text-muted)]">Share a Google Drive or Dropbox link to your resume</p>
              </div>
              <div className="space-y-2"><Label>Portfolio / LinkedIn</Label><Input name="portfolio" placeholder="https://linkedin.com/in/yourprofile" /></div>
              <div className="space-y-2"><Label>Cover Letter</Label><Textarea name="coverLetter" rows={4} placeholder="Tell us why you'd be a great fit..." /></div>
              <Button type="submit" variant="gradient" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? "Submitting..." : <><Upload className="w-4 h-4" /> Submit Application</>}
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function CareersPage() {
  const [applyJob, setApplyJob] = useState<JobType | null>(null);

  return (
    <div className="pt-16">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-3xl mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-cyber-400 text-sm font-semibold uppercase tracking-wider">Careers</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold mt-3 mb-6">
              Join Our <span className="gradient-text">Dream Team</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              We&apos;re building the future of software. Join a team of exceptional engineers, designers, and builders who are passionate about creating products that matter.
            </p>
          </motion.div>

          {/* Perks */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
            {PERKS.map((perk, i) => (
              <motion.div key={perk.label} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="font-semibold text-sm">{perk.label}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{perk.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Jobs */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold">Open Positions</h2>
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <Users className="w-4 h-4" /> {JOBS.length} openings
            </div>
          </div>
          <div className="space-y-4">
            {JOBS.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <JobCard job={job} onApply={setApplyJob} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </div>
  );
}
