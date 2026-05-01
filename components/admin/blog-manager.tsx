"use client";

import React, { useState } from "react";
import { BlogPost } from "@prisma/client";
import { Plus, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { createPost, deletePost } from "@/actions/blog";
import { slugify, formatDate } from "@/lib/utils";

export function BlogManager({ posts }: { posts: BlogPost[] }) {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [titleVal, setTitleVal] = useState("");

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const tagsRaw = (form.elements.namedItem("tags") as HTMLInputElement).value;
    const data = {
      title:     (form.elements.namedItem("title")   as HTMLInputElement).value,
      slug:      (form.elements.namedItem("slug")    as HTMLInputElement).value,
      excerpt:   (form.elements.namedItem("excerpt") as HTMLTextAreaElement).value,
      content:   (form.elements.namedItem("content") as HTMLTextAreaElement).value,
      tags:      tagsRaw.split(",").map((t) => t.trim()).filter(Boolean),
      published: (form.elements.namedItem("published") as HTMLInputElement).checked,
    };
    await createPost(data);
    setSubmitting(false);
    setShowForm(false);
    setTitleVal("");
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="gradient" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" /> {showForm ? "Cancel" : "New Post"}
        </Button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-cyber-500/30 bg-[var(--bg-secondary)] p-6">
          <h3 className="font-display text-xl font-semibold mb-6">New Blog Post</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input name="title" placeholder="Post title" required value={titleVal} onChange={(e) => setTitleVal(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Slug *</Label>
                <Input name="slug" value={slugify(titleVal)} readOnly required />
              </div>
            </div>
            <div className="space-y-2"><Label>Tags (comma separated)</Label><Input name="tags" placeholder="Next.js, React, Performance" /></div>
            <div className="space-y-2"><Label>Excerpt *</Label><Textarea name="excerpt" rows={2} placeholder="Brief summary..." required /></div>
            <div className="space-y-2"><Label>Content (Markdown) *</Label><Textarea name="content" rows={8} placeholder="# Blog content in Markdown..." required /></div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="published" name="published" className="rounded" />
              <label htmlFor="published" className="text-sm text-[var(--text-secondary)]">Publish immediately</label>
            </div>
            <Button type="submit" variant="gradient" disabled={submitting}>{submitting ? "Creating..." : "Create Post"}</Button>
          </form>
        </div>
      )}

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Title", "Tags", "Status", "Date", "Actions"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-[var(--bg-tertiary)] transition-colors">
                <td className="px-4 py-3 text-sm font-medium max-w-[200px] truncate">{post.title}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((t) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {post.published ? <span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle className="w-3.5 h-3.5" />Published</span> : <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]"><XCircle className="w-3.5 h-3.5" />Draft</span>}
                </td>
                <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{formatDate(post.createdAt)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => deletePost(post.id)} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={5} className="text-center py-10 text-[var(--text-muted)]">No posts yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
