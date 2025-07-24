"use client"
import { Loader2 } from "lucide-react"

export function GlobalLoader() {
  return (
    <output
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80"
    >
      <Loader2 aria-hidden="true" className="animate-spin w-10 h-10 text-primary" />
      <span className="sr-only">Loading…</span>
    </output>
  );
}
