# 🚀 Cyberfun Software Services — Company Website

A **production-ready, full-stack company website** for Cyberfun Software Services Private Limited, built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and NextAuth.

---

## ✨ Features

### Public Website
- **Home Page** — Animated hero with particle canvas, stats counter, services preview, featured projects, testimonial slider, tech stack marquee, CTA
- **About Page** — Team cards, mission/vision/approach, animated timeline, company values
- **Services Page** — 5 service offerings with detailed descriptions (Web, App, AI, Design, Cloud)
- **Portfolio Page** — Filterable project grid with hover animations and category tags
- **Careers Page** — Live job listings with accordion expand, job application modal
- **Blog Page** — SEO-optimized blog listing with featured post
- **Contact Page** — Full contact form with DB storage, animated status feedback

### Admin Dashboard
- **Secure login** via NextAuth (credentials — admin-only)
- **Dashboard** — Stats overview, area chart, pie chart, recent activity
- **Contacts** — Search, view, mark status, reply via email, delete
- **Applications** — Review job applications, update status (Pending → Offer)
- **Jobs** — Create/delete job postings with full details
- **Projects** — Portfolio CRUD with tech stack management
- **Blog** — Create/manage blog posts (Markdown content)
- **Team** — Add/remove team members with social links

---

## 🧱 Tech Stack

| Layer        | Technology                                      |
|--------------|-------------------------------------------------|
| Framework    | Next.js 15 (App Router)                         |
| Language     | TypeScript                                      |
| Styling      | Tailwind CSS + CSS Variables                    |
| Animation    | Framer Motion                                   |
| Database     | PostgreSQL (Neon / Supabase)                    |
| ORM          | Prisma                                          |
| Auth         | NextAuth.js v5                                  |
| Charts       | Recharts                                        |
| Icons        | Lucide React                                    |
| Deployment   | Vercel                                          |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/your-org/cyberfun-website.git
cd cyberfun-website
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
# PostgreSQL (get free DB from neon.tech or supabase.com)
DATABASE_URL="postgresql://user:pass@host:5432/cyberfun?sslmode=require"

# NextAuth (generate: openssl rand -base64 32)
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Admin credentials
ADMIN_EMAIL="admin@cyberfunsoftware.com"
ADMIN_PASSWORD="SecureAdmin@2024"
```

### 3. Setup Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with initial data (admin user + sample content)
npx ts-node prisma/seed.ts
```

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- **Website:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/login

Default admin credentials:
- Email: `admin@cyberfunsoftware.com`
- Password: `SecureAdmin@2024`

---

## 📁 Project Structure

```
cyberfun/
├── app/
│   ├── (site)/              # Public website routes
│   │   ├── page.tsx         # Home page
│   │   ├── about/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── careers/
│   │   ├── blog/
│   │   └── contact/
│   ├── admin/               # Protected admin panel
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── contacts/
│   │   ├── applications/
│   │   ├── jobs/
│   │   ├── projects/
│   │   ├── blog/
│   │   └── team/
│   └── api/
│       └── auth/
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── home/                # Hero, Stats, Services, etc.
│   ├── admin/               # Admin UI components
│   ├── providers/           # Theme provider
│   └── ui/                  # Button, Input, Card, Badge...
├── actions/                 # Next.js Server Actions
│   ├── contact.ts
│   ├── jobs.ts
│   ├── projects.ts
│   ├── team.ts
│   └── blog.ts
├── lib/
│   ├── prisma.ts            # Prisma client
│   ├── auth.ts              # NextAuth config
│   ├── utils.ts             # Utilities + company info
│   └── validations.ts       # Zod schemas
├── prisma/
│   ├── schema.prisma        # DB models
│   └── seed.ts              # Seed script
└── middleware.ts             # Route protection
```

---

## 🌐 Deployment on Vercel

1. Push your code to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

**Recommended Database:** [Neon.tech](https://neon.tech) — free serverless PostgreSQL

---

## 🔐 Security Features

- Admin routes protected by NextAuth middleware
- Passwords hashed with bcrypt (12 rounds)
- Input validation with Zod on all forms
- CSRF protection via NextAuth
- Environment variables for all secrets

---

## 🎨 Customization

### Change Company Info
Edit `lib/utils.ts` → `COMPANY_INFO` object

### Change Colors
Edit `tailwind.config.ts` → `cyber` color palette

### Add/Remove Pages
Add routes in `app/(site)/` and update `components/layout/navbar.tsx`

---

## 📄 Database Models

| Model        | Description                        |
|--------------|------------------------------------|
| User         | Admin users with role-based access |
| Contact      | Contact form submissions           |
| Job          | Job postings                       |
| Application  | Job applications                   |
| Project      | Portfolio projects                 |
| BlogPost     | Blog articles                      |
| TeamMember   | Team roster                        |
| Service      | Service offerings                  |
| Testimonial  | Client testimonials                |

---

Built with ❤️ by **Cyberfun Software Services Pvt. Ltd.**
