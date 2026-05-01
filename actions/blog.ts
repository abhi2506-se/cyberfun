"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPublishedPosts() {
  return await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getAllPosts() {
  return await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getPostBySlug(slug: string) {
  return await prisma.blogPost.findUnique({ where: { slug } });
}

export async function createPost(data: {
  title: string; slug: string; excerpt: string; content: string;
  thumbnail?: string; tags: string[]; published?: boolean;
}) {
  try {
    await prisma.blogPost.create({
      data: { ...data, publishedAt: data.published ? new Date() : null },
    });
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to create post." };
  }
}

export async function deletePost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}
