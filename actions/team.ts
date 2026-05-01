"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTeamMembers() {
  return await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

export async function getAllTeamMembers() {
  return await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
}

export async function createTeamMember(data: {
  name: string; role: string; bio?: string; image?: string;
  linkedin?: string; twitter?: string; github?: string; order?: number;
}) {
  try {
    await prisma.teamMember.create({ data });
    revalidatePath("/about");
    revalidatePath("/admin/team");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to create team member." };
  }
}

export async function deleteTeamMember(id: string) {
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/about");
  revalidatePath("/admin/team");
}
