"use client";

import React, { useState } from "react";
import { Job } from "@prisma/client";
import { Plus, Trash2, Edit, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { createJob, deleteJob } from "@/actions/jobs";
import { formatDate } from "@/lib/utils";

type JobWithCount = Job & { _count: { applications: number } };

export function JobsManager({ jobs }: { jobs: JobWithCount[] }) {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = {
      title:       (form.elements.namedItem("title")       as HTMLInputElement).value,
      department:  (form.elements.namedItem("department")  as HTMLInputElement).value,
      location:    (form.elements.namedItem("location")    as HTMLInputElement).value,
      type:        (form.elements.namedItem("type")        as HTMLSelectElement).value as "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "REMOTE",
      experience:  (form.elements.namedItem("experience")  as HTMLInputElement).value,
      salary:      (form.elements.namedItem("salary")      as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
      requirements:(form.elements.namedItem("requirements")as HTMLTextAreaElement).value,
      isActive: true,
    };
    await createJob(data);
    setSubmitting(false);
    setShowForm(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="gradient" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" /> {showForm ? "Cancel" : "Add Job Posting"}
        </Button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-cyber-500/30 bg-[var(--bg-secondary)] p-6">
          <h3 className="font-display text-xl font-semibold mb-6">New Job Posting</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Job Title *</Label><Input name="title" placeholder="Senior Frontend Engineer" required /></div>
            <div className="space-y-2"><Label>Department *</Label><Input name="department" placeholder="Engineering" required /></div>
            <div className="space-y-2"><Label>Location *</Label><Input name="location" placeholder="New Delhi / Remote" required /></div>
            <div className="space-y-2">
              <Label>Type *</Label>
              <select name="type" required className="flex h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyber-500">
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="REMOTE">Remote</option>
              </select>
            </div>
            <div className="space-y-2"><Label>Experience *</Label><Input name="experience" placeholder="3-5 years" required /></div>
            <div className="space-y-2"><Label>Salary Range</Label><Input name="salary" placeholder="₹15-25 LPA" /></div>
            <div className="space-y-2 sm:col-span-2"><Label>Description *</Label><Textarea name="description" rows={4} placeholder="Job description..." required /></div>
            <div className="space-y-2 sm:col-span-2"><Label>Requirements *</Label><Textarea name="requirements" rows={4} placeholder="Key requirements..." required /></div>
            <div className="sm:col-span-2">
              <Button type="submit" variant="gradient" disabled={submitting}>
                {submitting ? "Creating..." : "Create Job Posting"}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Title", "Department", "Type", "Active", "Applications", "Posted", "Actions"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-[var(--bg-tertiary)] transition-colors">
                <td className="px-4 py-3 text-sm font-medium">{job.title}</td>
                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{job.department}</td>
                <td className="px-4 py-3"><Badge variant="secondary">{job.type.replace("_", " ")}</Badge></td>
                <td className="px-4 py-3">
                  {job.isActive
                    ? <CheckCircle className="w-4 h-4 text-green-400" />
                    : <XCircle className="w-4 h-4 text-red-400" />}
                </td>
                <td className="px-4 py-3 text-sm">{job._count.applications}</td>
                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{formatDate(job.createdAt)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => deleteJob(job.id)} className="p-1.5 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr><td colSpan={7} className="text-center py-10 text-[var(--text-muted)]">No job postings yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
