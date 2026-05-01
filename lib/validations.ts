import { z } from "zod";

export const contactSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Invalid email address"),
  phone:   z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

export const applicationSchema = z.object({
  jobId:       z.string().min(1, "Job ID is required"),
  name:        z.string().min(2, "Name must be at least 2 characters"),
  email:       z.string().email("Invalid email address"),
  phone:       z.string().optional(),
  resumeUrl:   z.string().url("Invalid resume URL"),
  coverLetter: z.string().optional(),
  portfolio:   z.string().url("Invalid portfolio URL").optional().or(z.literal("")),
});

export const jobSchema = z.object({
  title:       z.string().min(3),
  department:  z.string().min(2),
  location:    z.string().min(2),
  type:        z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"]),
  experience:  z.string().min(1),
  salary:      z.string().optional(),
  description: z.string().min(50),
  requirements:z.string().min(20),
  benefits:    z.string().optional(),
  isActive:    z.boolean().default(true),
});

export const projectSchema = z.object({
  title:       z.string().min(3),
  slug:        z.string().min(3),
  description: z.string().min(20),
  category:    z.string().min(2),
  client:      z.string().optional(),
  liveUrl:     z.string().url().optional().or(z.literal("")),
  githubUrl:   z.string().url().optional().or(z.literal("")),
  thumbnail:   z.string().optional(),
  techStack:   z.array(z.string()),
  featured:    z.boolean().default(false),
  published:   z.boolean().default(true),
});

export type ContactInput      = z.infer<typeof contactSchema>;
export type ApplicationInput  = z.infer<typeof applicationSchema>;
export type JobInput          = z.infer<typeof jobSchema>;
export type ProjectInput      = z.infer<typeof projectSchema>;
