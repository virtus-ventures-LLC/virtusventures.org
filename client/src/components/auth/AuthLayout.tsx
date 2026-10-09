import type { ReactNode } from "react";
import { Link } from "wouter";

export const LOGO_URL = "/manus-storage/virtus-logo_b28440bd.png";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[oklch(0.08_0_0)] text-[oklch(0.92_0.005_60)] flex flex-col items-center justify-center px-4 py-16 noise-overlay">
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="flex justify-center mb-10">
          <img
            src={LOGO_URL}
            alt="Virtus Ventures"
            className="h-16 w-auto rounded-md"
          />
        </Link>
        <div className="border border-[oklch(0.2_0.005_60)] bg-[oklch(0.11_0.003_60)] rounded-xl p-8">
          <h1 className="font-[var(--font-display)] text-3xl text-white mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[oklch(0.6_0.01_60)] font-light mb-8">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export const fieldClass =
  "bg-[oklch(0.08_0_0)] border-[oklch(0.25_0.005_60)] text-white placeholder:text-[oklch(0.45_0.01_60)] focus-visible:border-[oklch(0.75_0.12_75)] focus-visible:ring-[oklch(0.75_0.12_75)/30]";

export const submitClass =
  "w-full bg-[oklch(0.75_0.12_75)] text-black hover:bg-[oklch(0.82_0.11_75)] font-medium tracking-wide";

export const linkClass =
  "text-[oklch(0.75_0.12_75)] hover:text-[oklch(0.85_0.1_75)] transition-colors";
