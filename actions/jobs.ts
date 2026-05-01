"use server";

import { prisma } from "@/lib/prisma";
import { jobSchema, applicationSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function getActiveJobs() {
  return await prisma.job.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  });
}

export async function getAllJobs() {
  return await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  });
}

export async function getJobById(id: string) {
  return await prisma.job.findUnique({
    where: { id },
    include: { applications: true },
  });
}

export async function createJob(data: unknown) {
  const parsed = jobSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.flatten().fieldErrors };

  try {
    await prisma.job.create({ data: parsed.data });
    revalidatePath("/careers");
    revalidatePath("/admin/jobs");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to create job posting." };
  }
}

export async function updateJob(id: string, data: unknown) {
  const parsed = jobSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.flatten().fieldErrors };

  try {
    await prisma.job.update({ where: { id }, data: parsed.data });
    revalidatePath("/careers");
    revalidatePath("/admin/jobs");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update job posting." };
  }
}

export async function deleteJob(id: string) {
  await prisma.job.delete({ where: { id } });
  revalidatePath("/careers");
  revalidatePath("/admin/jobs");
}

export async function submitApplication(data: unknown) {
  const parsed = applicationSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.flatten().fieldErrors };

  try {
    await prisma.application.create({ data: parsed.data });
    revalidatePath("/admin/applications");
    return { success: true, message: "Application submitted successfully! We'll review it and get back to you." };
  } catch {
    return { success: false, error: "Failed to submit application. Please try again." };
  }
}

export async function getApplications() {
  return await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    include: { job: { select: { title: true } } },
  });
}

export async function updateApplicationStatus(
  id: string,
  status: "PENDING" | "REVIEWING" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN"
) {
  await prisma.application.update({ where: { id }, data: { status } });
  revalidatePath("/admin/applications");
}
