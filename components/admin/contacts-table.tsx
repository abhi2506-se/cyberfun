"use client";

import React, { useState } from "react";
import { Contact, ContactStatus } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { updateContactStatus, deleteContact } from "@/actions/contact";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, Eye } from "lucide-react";

const STATUS_COLORS: Record<ContactStatus, "default" | "secondary" | "success" | "warning" | "destructive"> = {
  NEW: "default", READ: "secondary", REPLIED: "success", ARCHIVED: "destructive",
};

export function ContactsTable({ contacts }: { contacts: Contact[] }) {
  const [search, setSearch] = useState("");
  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden">
      <div className="p-4 border-b border-[var(--border)]">
        <input
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 h-9 rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-3 text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-cyber-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Name", "Email", "Subject", "Status", "Date", "Actions"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-[var(--bg-tertiary)] transition-colors">
                <td className="px-4 py-3 text-sm font-medium">{c.name}</td>
                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{c.email}</td>
                <td className="px-4 py-3 text-sm max-w-[200px] truncate">{c.subject}</td>
                <td className="px-4 py-3">
                  <Badge variant={STATUS_COLORS[c.status]}>{c.status}</Badge>
                </td>
                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{formatDate(c.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateContactStatus(c.id, "READ")} className="p-1.5 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-cyber-400 transition-colors" title="Mark as read">
                      <Eye className="w-4 h-4" />
                    </button>
                    <a href={`mailto:${c.email}?subject=Re: ${c.subject}`} className="p-1.5 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-green-400 transition-colors" title="Reply">
                      <Mail className="w-4 h-4" />
                    </a>
                    <button onClick={() => deleteContact(c.id)} className="p-1.5 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-red-400 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-[var(--text-muted)]">No contacts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
