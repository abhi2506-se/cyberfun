"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ExternalLink, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  user: { name?: string | null; email?: string | null; image?: string | null } | undefined;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-[var(--border)] bg-[var(--bg-secondary)] flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <Link href="/" target="_blank" className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-cyber-400 transition-colors">
          <ExternalLink className="w-4 h-4" />
          View Site
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-400 to-purple-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium">{user?.name ?? "Admin"}</div>
            <div className="text-xs text-[var(--text-muted)]">{user?.email}</div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => signOut({ callbackUrl: "/admin/login" })}>
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
