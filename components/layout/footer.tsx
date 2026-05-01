import React from "react";
import Link from "next/link";
import { Zap, Github, Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { COMPANY_INFO } from "@/lib/utils";

const FOOTER_LINKS = {
  Company: [
    { label: "About",     href: "/about"    },
    { label: "Services",  href: "/services" },
    { label: "Portfolio", href: "/portfolio"},
    { label: "Blog",      href: "/blog"     },
    { label: "Careers",   href: "/careers"  },
  ],
  Services: [
    { label: "Web Development", href: "/services#web"   },
    { label: "App Development", href: "/services#app"   },
    { label: "UI/UX Design",    href: "/services#uiux"  },
    { label: "AI Solutions",    href: "/services#ai"    },
    { label: "Cloud Services",  href: "/services#cloud" },
  ],
  Legal: [
    { label: "Privacy Policy",    href: "/privacy"    },
    { label: "Terms of Service",  href: "/terms"      },
    { label: "Cookie Policy",     href: "/cookies"    },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyber-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg gradient-text">Cyberfun Software</span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 max-w-xs">
              {COMPANY_INFO.tagline}. We craft digital experiences that drive business growth and innovation.
            </p>
            <div className="space-y-2">
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-cyber-400 transition-colors">
                <Mail className="w-4 h-4" /> {COMPANY_INFO.email}
              </a>
              <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-cyber-400 transition-colors">
                <Phone className="w-4 h-4" /> {COMPANY_INFO.phone}
              </a>
              <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-[var(--text-primary)] mb-4 text-sm">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-[var(--text-muted)] hover:text-cyber-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--border)] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} {COMPANY_INFO.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: Github,    href: COMPANY_INFO.social.github    },
              { icon: Linkedin,  href: COMPANY_INFO.social.linkedin  },
              { icon: Twitter,   href: COMPANY_INFO.social.twitter   },
              { icon: Instagram, href: COMPANY_INFO.social.instagram },
            ].map(({ icon: Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-cyber-400 hover:border-cyber-500/50 hover:bg-cyber-500/10 transition-all duration-200">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
