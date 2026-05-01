import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { COMPANY_INFO } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL("https://cyberfunsoftware.com"),
  title: {
    default: `${COMPANY_INFO.name} | ${COMPANY_INFO.tagline}`,
    template: `%s | ${COMPANY_INFO.name}`,
  },
  description: "Cyberfun Software Services Private Limited – A premier software development company building future-ready digital solutions. Web, App, AI, Cloud & UI/UX services.",
  keywords: ["software development", "web development", "app development", "AI solutions", "UI/UX design", "India", "Delhi", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Cyberfun Software Services" }],
  creator: "Cyberfun Software Services Pvt. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://cyberfunsoftware.com",
    siteName: COMPANY_INFO.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@cyberfunsw",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
