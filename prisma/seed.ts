import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@2024!", 12);
  await prisma.user.upsert({
    where:  { email: process.env.ADMIN_EMAIL || "admin@cyberfunsoftware.com" },
    update: {},
    create: {
      name:     "Admin",
      email:    process.env.ADMIN_EMAIL || "admin@cyberfunsoftware.com",
      password: hashedPassword,
      role:     "ADMIN",
    },
  });
  console.log("✓ Admin user created");

  // Sample services
  const services = [
    { title: "Web Development", slug: "web-development", icon: "Globe", description: "Blazing-fast web applications built with Next.js and React.", features: ["Next.js", "TypeScript", "PostgreSQL", "API Integration"], order: 1 },
    { title: "App Development", slug: "app-development", icon: "Smartphone", description: "Cross-platform mobile apps for iOS and Android.", features: ["React Native", "Flutter", "Firebase", "App Store"], order: 2 },
    { title: "UI/UX Design",    slug: "ui-ux-design",    icon: "Palette",    description: "Human-centered design that converts and delights.",       features: ["Figma", "Design Systems", "Prototyping", "Research"], order: 3 },
    { title: "AI Solutions",    slug: "ai-solutions",    icon: "Brain",      description: "Intelligent systems powered by ML and generative AI.",     features: ["LLMs", "ML Models", "Automation", "Analytics"], order: 4 },
    { title: "Cloud Services",  slug: "cloud-services",  icon: "Cloud",      description: "Scalable cloud infrastructure and DevOps.",                features: ["AWS", "GCP", "Kubernetes", "CI/CD"], order: 5 },
  ];

  for (const service of services) {
    await prisma.service.upsert({ where: { slug: service.slug }, update: {}, create: service });
  }
  console.log("✓ Services seeded");

  // Sample testimonials
  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      { name: "Priya Sharma",   role: "CTO",             company: "FinovateAI",        content: "Cyberfun delivered our fintech platform 3 weeks ahead of schedule. Outstanding work!", rating: 5 },
      { name: "Rahul Mehta",    role: "Founder",          company: "MedConnect India",  content: "They built our HIPAA-compliant healthcare platform with exceptional quality.",          rating: 5 },
      { name: "Sarah Johnson",  role: "VP Engineering",   company: "RetailGiant UK",    content: "60% faster page loads after their optimization work. Phenomenal team!",                 rating: 5 },
    ],
  });
  console.log("✓ Testimonials seeded");

  console.log("✅ Seeding complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
