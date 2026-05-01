"use client";

import React, { useState } from "react";
import { TeamMember } from "@prisma/client";
import { Plus, Trash2, Linkedin, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createTeamMember, deleteTeamMember } from "@/actions/team";

export function TeamManager({ members }: { members: TeamMember[] }) {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = {
      name:     (form.elements.namedItem("name")     as HTMLInputElement).value,
      role:     (form.elements.namedItem("role")     as HTMLInputElement).value,
      bio:      (form.elements.namedItem("bio")      as HTMLTextAreaElement).value,
      linkedin: (form.elements.namedItem("linkedin") as HTMLInputElement).value,
      github:   (form.elements.namedItem("github")   as HTMLInputElement).value,
      twitter:  (form.elements.namedItem("twitter")  as HTMLInputElement).value,
    };
    await createTeamMember(data);
    setSubmitting(false);
    setShowForm(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="gradient" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" /> {showForm ? "Cancel" : "Add Member"}
        </Button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-cyber-500/30 bg-[var(--bg-secondary)] p-6">
          <h3 className="font-display text-xl font-semibold mb-6">New Team Member</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Full Name *</Label><Input name="name" placeholder="Arjun Kapoor" required /></div>
            <div className="space-y-2"><Label>Role / Title *</Label><Input name="role" placeholder="Senior Engineer" required /></div>
            <div className="space-y-2"><Label>LinkedIn URL</Label><Input name="linkedin" placeholder="https://linkedin.com/in/..." /></div>
            <div className="space-y-2"><Label>GitHub URL</Label><Input name="github" placeholder="https://github.com/..." /></div>
            <div className="space-y-2"><Label>Twitter URL</Label><Input name="twitter" placeholder="https://twitter.com/..." /></div>
            <div className="space-y-2 sm:col-span-2"><Label>Bio</Label><Textarea name="bio" rows={2} placeholder="Brief biography..." /></div>
            <div className="sm:col-span-2">
              <Button type="submit" variant="gradient" disabled={submitting}>{submitting ? "Adding..." : "Add Team Member"}</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <div key={member.id} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5 group hover:border-cyber-500/30 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-400 to-purple-500 flex items-center justify-center text-white font-bold">
                  {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold">{member.name}</div>
                  <div className="text-sm text-cyber-400">{member.role}</div>
                </div>
              </div>
              <button onClick={() => deleteTeamMember(member.id)} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {member.bio && <p className="text-sm text-[var(--text-muted)] mt-3 line-clamp-2">{member.bio}</p>}
            <div className="flex gap-2 mt-3">
              {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-cyber-400 transition-colors"><Linkedin className="w-4 h-4" /></a>}
              {member.github  && <a href={member.github}   target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-cyber-400 transition-colors"><Github   className="w-4 h-4" /></a>}
              {member.twitter && <a href={member.twitter}  target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-cyber-400 transition-colors"><Twitter  className="w-4 h-4" /></a>}
            </div>
          </div>
        ))}
        {members.length === 0 && (
          <div className="col-span-3 text-center py-16 text-[var(--text-muted)]">No team members yet</div>
        )}
      </div>
    </div>
  );
}
