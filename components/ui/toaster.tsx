"use client";

import * as React from "react";

export function Toaster() {
  return <div id="toaster" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" />;
}

export function toast({ title, description, variant = "default" }: {
  title?: string; description?: string; variant?: "default" | "destructive" | "success";
}) {
  const toaster = document.getElementById("toaster");
  if (!toaster) return;

  const el = document.createElement("div");
  el.className = `glass-card rounded-xl p-4 min-w-[300px] max-w-[400px] shadow-xl border transition-all duration-300 animate-slide-up ${
    variant === "destructive" ? "border-red-500/30 bg-red-500/10" :
    variant === "success"     ? "border-green-500/30 bg-green-500/10" :
    "border-[var(--border)]"
  }`;
  el.innerHTML = `
    ${title ? `<p class="font-semibold text-sm text-[var(--text-primary)]">${title}</p>` : ""}
    ${description ? `<p class="text-sm text-[var(--text-muted)] mt-1">${description}</p>` : ""}
  `;

  toaster.appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; setTimeout(() => el.remove(), 300); }, 4000);
}
