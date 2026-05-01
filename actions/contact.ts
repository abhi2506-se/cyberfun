"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function submitContact(data: unknown) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  try {
    await prisma.contact.create({ data: parsed.data });
    revalidatePath("/admin/contacts");
    return { success: true, message: "Message sent successfully! We'll get back to you within 24 hours." };
  } catch {
    return { success: false, error: "Failed to send message. Please try again." };
  }
}

export async function getContacts() {
  return await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
}

export async function updateContactStatus(id: string, status: "NEW" | "READ" | "REPLIED" | "ARCHIVED") {
  await prisma.contact.update({ where: { id }, data: { status } });
  revalidatePath("/admin/contacts");
}

export async function deleteContact(id: string) {
  await prisma.contact.delete({ where: { id } });
  revalidatePath("/admin/contacts");
}
