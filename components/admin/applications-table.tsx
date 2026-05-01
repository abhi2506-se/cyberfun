"use client";

import React, { useState } from "react";
import { formatDate } from "@/lib/utils";
import { updateApplicationStatus } from "@/actions/jobs";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

type App = {
  id: string; name: string; email: string; phone: string | null;
  resumeUrl: string; status: string; createdAt: Date;
  job: { title: string };
};

const STATUS_COLORS: Record<string, "default" | "secondary" | "success" | "warning" | "destructive" | "purple"> = {
  PENDING: "warning", REVIEWING: "default", INTERVIEW: "purple",
  OFFER: "success", REJECTED: "destructive", WITHDRAWN: "secondary",
};

const STATUS_OPTIONS = ["PENDING", "REVIEWING", "INTERVIEW", "OFFER", "REJECTED", "WITHDRAWN"] as const;

export function ApplicationsTable({ applications }: { applications: App[] }) {
  const [search, setSearch] = useState("");
  const filtered = applications.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden">
      <div className="p-4 border-b border-[var(--border)]">
        <input
          placeholder="Search applications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 h-9 rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-3 text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-cyber-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Applicant", "Position", "Email", "Status", "Resume", "Applied", "Update Status"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-[var(--bg-tertiary)] transition-colors">
                <td className="px-4 py-3 text-sm font-medium">{a.name}</td>
                <td className="px-4 py-3 text-sm text-[var(--text-muted)] max-w-[160px] truncate">{a.job.title}</td>
                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{a.email}</td>
                <td className="px-4 py-3">
                  <Badge variant={STATUS_COLORS[a.status] ?? "secondary"}>{a.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <a href={a.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-cyber-400 hover:underline">
                    <ExternalLink className="w-3.5 h-3.5" /> View
                  </a>
                </td>
                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{formatDate(a.createdAt)}</td>
                <td className="px-4 py-3">
                  <select
                    defaultValue={a.status}
                    onChange={(e) => updateApplicationStatus(a.id, e.target.value as typeof STATUS_OPTIONS[number])}
                    className="text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-2 py-1 text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-cyber-500"
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="text-center py-10 text-[var(--text-muted)]">No applications found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
