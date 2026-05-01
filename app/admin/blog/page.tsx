import React from "react";
import { getAllPosts } from "@/actions/blog";
import { BlogManager } from "@/components/admin/blog-manager";

export default async function AdminBlogPage() {
  const posts = await getAllPosts();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Blog Posts</h1>
        <p className="text-[var(--text-muted)] mt-1">Manage your content</p>
      </div>
      <BlogManager posts={posts} />
    </div>
  );
}
