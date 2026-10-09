/**
 * Virtus Ventures — Shell Landing Page
 * Design: "Obsidian & Gold" — Dark Editorial
 * - Cinematic dark atmosphere with layered blacks
 * - Gold reserved for logo and primary accent
 * - Editorial layout with generous breathing room
 * - Subtle noise texture and vignette for depth
 */

import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Link } from "wouter";

const LOGO_URL = "/manus-storage/virtus-logo_b28440bd.png";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663617491012/6cMt3E4Kagu529nNL8WhbC/hero-bg-DkunWNtZEHz7R3GDVcJgLv.webp";
const TEXTURE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663617491012/6cMt3E4Kagu529nNL8WhbC/texture-abstract-nNEUs3LS9cJApFut6LSLtc.webp";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-[oklch(0.08_0_0)] text-[oklch(0.92_0.005_60)] overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[oklch(0.2_0.005_60)/30]">
        <div className="backdrop-blur-md bg-[oklch(0.08_0_0)/80]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="Virtus Ventures"
                className="h-10 w-auto"
              />
            </div>
            <div className="flex items-center gap-8 text-sm tracking-wide uppercase font-light text-[oklch(0.7_0.005_60)]">
              <a href="#about" className="hidden md:inline hover:text-[oklch(0.75_0.12_75)] transition-colors duration-300">About</a>
              <a href="#contact" className="hidden md:inline hover:text-[oklch(0.75_0.12_75)] transition-colors duration-300">Contact</a>
              {!loading && (
                <Link
                  href={user ? "/account" : "/signin"}
                  className="border border-[oklch(0.75_0.12_75)/60] text-[oklch(0.75_0.12_75)] hover:bg-[oklch(0.75_0.12_75)] hover:text-black rounded-md px-4 py-2 transition-colors duration-300"
                >
                  {user ? "Account" : "Sign in"}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center noise-overlay vignette">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0_0)/60] via-transparent to-[oklch(0.08_0_0)]" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img
              src={LOGO_URL}
              alt="Virtus Ventures"
              className="h-28 md:h-36 w-auto mx-auto mb-8 rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <h1 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6">
              <span className="text-gold-gradient">Virtus</span>{" "}
              <span className="text-white">Ventures</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="text-lg md:text-xl text-[oklch(0.6_0.01_60)] font-light tracking-wide max-w-2xl mx-auto"
          >
            A diversified holding company building and managing ventures across industries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16"
          >
            <div className="w-px h-16 bg-gradient-to-b from-[oklch(0.75_0.12_75)] to-transparent mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 md:py-44">
        {/* Subtle texture background */}
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${TEXTURE_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0_0)] via-transparent to-[oklch(0.08_0_0)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          {/* Gold accent line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-px bg-[oklch(0.75_0.12_75)] mb-12"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[oklch(0.75_0.12_75)] mb-6 font-light">
              About
            </p>
            <h2 className="font-[var(--font-display)] text-3xl md:text-5xl text-white mb-8 leading-tight">
              Building Value<br />Across Ventures
            </h2>
            <p className="text-[oklch(0.65_0.01_60)] text-lg md:text-xl leading-relaxed max-w-3xl font-light">
              Virtus Ventures is a privately held umbrella company that acquires, builds, and manages
              a portfolio of businesses. We operate with a long-term perspective, providing strategic
              oversight and operational support to our ventures.
            </p>
          </motion.div>

          {/* Stats / Key Points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { label: "Structure", value: "LLC" },
              { label: "Focus", value: "Multi-Industry" },
              { label: "Approach", value: "Long-Term" },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-[oklch(0.2_0.005_60)/40] bg-[oklch(0.1_0.003_60)/50] backdrop-blur-sm p-8 group hover:border-[oklch(0.75_0.12_75)/30] transition-colors duration-500"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-[oklch(0.5_0.01_60)] mb-3">
                  {item.label}
                </p>
                <p className="font-[var(--font-display)] text-2xl text-white group-hover:text-[oklch(0.85_0.1_75)] transition-colors duration-500">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact / Footer Section */}
      <section id="contact" className="relative py-32 border-t border-[oklch(0.15_0.003_60)]">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[oklch(0.75_0.12_75)] mb-6 font-light">
              Contact
            </p>
            <h2 className="font-[var(--font-display)] text-3xl md:text-4xl text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-[oklch(0.6_0.01_60)] text-lg font-light mb-10 max-w-xl">
              For inquiries regarding Virtus Ventures or our portfolio companies, please reach out.
            </p>

            <a
              href="mailto:yuri.andrews@yahoo.com"
              className="inline-flex items-center gap-3 text-[oklch(0.75_0.12_75)] hover:text-[oklch(0.85_0.1_75)] transition-colors duration-300 text-lg font-light group"
            >
              <span>yuri.andrews@yahoo.com</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 mt-32 pt-8 border-t border-[oklch(0.15_0.003_60)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="Virtus Ventures" className="h-6 w-auto opacity-70" />
              <span className="text-sm text-[oklch(0.5_0.01_60)] font-light">
                Virtus Ventures LLC
              </span>
            </div>
            <p className="text-xs text-[oklch(0.4_0.01_60)] font-light tracking-wide">
              &copy; {new Date().getFullYear()} Virtus Ventures. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
