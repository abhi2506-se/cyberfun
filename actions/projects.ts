"use server";

import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function getPublishedProjects() {
  return await prisma.project.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getFeaturedProjects() {
  return await prisma.project.findMany({
    where: { published: true, featured: true },
    orderBy: { order: "asc" },
    take: 6,
  });
}

export async function getProjectBySlug(slug: string) {
  return await prisma.project.findUnique({ where: { slug } });
}

export async function getAllProjects() {
  return await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createProject(data: unknown) {
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.flatten().fieldErrors };

  try {
    await prisma.project.create({ data: parsed.data });
    revalidatePath("/portfolio");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to create project." };
  }
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
}
