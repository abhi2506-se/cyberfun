"use client";

import React, { useState } from "react";
import { Project } from "@prisma/client";
import { Plus, Trash2, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { createProject, deleteProject } from "@/actions/projects";
import { slugify, formatDate } from "@/lib/utils";

export function ProjectsManager({ projects }: { projects: Project[] }) {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [titleVal, setTitleVal] = useState("");

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const techRaw = (form.elements.namedItem("techStack") as HTMLInputElement).value;
    const data = {
      title:       (form.elements.namedItem("title")       as HTMLInputElement).value,
      slug:        (form.elements.namedItem("slug")        as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
      category:    (form.elements.namedItem("category")    as HTMLInputElement).value,
      client:      (form.elements.namedItem("client")      as HTMLInputElement).value,
      liveUrl:     (form.elements.namedItem("liveUrl")     as HTMLInputElement).value,
      githubUrl:   (form.elements.namedItem("githubUrl")   as HTMLInputElement).value,
      techStack:   techRaw.split(",").map((t) => t.trim()).filter(Boolean),
      featured:    false,
      published:   true,
    };
    await createProject(data);
    setSubmitting(false);
    setShowForm(false);
    setTitleVal("");
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="gradient" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" /> {showForm ? "Cancel" : "Add Project"}
        </Button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-cyber-500/30 bg-[var(--bg-secondary)] p-6">
          <h3 className="font-display text-xl font-semibold mb-6">New Project</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Title *</Label>
              <Input name="title" placeholder="FinTech Dashboard" required value={titleVal} onChange={(e) => setTitleVal(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Slug *</Label>
              <Input name="slug" placeholder="fintech-dashboard" value={slugify(titleVal)} readOnly required />
            </div>
            <div className="space-y-2"><Label>Category *</Label><Input name="category" placeholder="Web App" required /></div>
            <div className="space-y-2"><Label>Client</Label><Input name="client" placeholder="Company Name" /></div>
            <div className="space-y-2"><Label>Live URL</Label><Input name="liveUrl" placeholder="https://..." /></div>
            <div className="space-y-2"><Label>GitHub URL</Label><Input name="githubUrl" placeholder="https://github.com/..." /></div>
            <div className="space-y-2 sm:col-span-2"><Label>Tech Stack (comma separated) *</Label><Input name="techStack" placeholder="Next.js, TypeScript, PostgreSQL" required /></div>
            <div className="space-y-2 sm:col-span-2"><Label>Description *</Label><Textarea name="description" rows={3} placeholder="Project description..." required /></div>
            <div className="sm:col-span-2">
              <Button type="submit" variant="gradient" disabled={submitting}>{submitting ? "Adding..." : "Add Project"}</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5 group hover:border-cyber-500/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <Badge className="mb-1">{project.category}</Badge>
                <h3 className="font-semibold">{project.title}</h3>
              </div>
              <div className="flex items-center gap-1">
                {project.published ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                {project.featured && <Badge variant="warning" className="text-xs">Featured</Badge>}
              </div>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {project.techStack.slice(0, 3).map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-muted)]">{t}</span>
              ))}
              {project.techStack.length > 3 && <span className="text-xs text-[var(--text-muted)]">+{project.techStack.length - 3}</span>}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">{formatDate(project.createdAt)}</span>
              <div className="flex gap-2">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-cyber-400 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button onClick={() => deleteProject(project.id)} className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-3 text-center py-16 text-[var(--text-muted)]">No projects yet. Add your first project!</div>
        )}
      </div>
    </div>
  );
}
