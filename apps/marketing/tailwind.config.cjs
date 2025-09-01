/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/blocks/src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Layout / spacing / grid used by blocks/Hero
    "w-full","py-16","md:py-24","mx-auto","max-w-6xl","px-4","md:px-6",
    "grid","items-center","gap-8","md:gap-12","md:grid-cols-2","md:grid-cols-1",
    "justify-items-center","place-content-center","place-content-end",
    "text-center","justify-self-center","max-w-2xl",
    // Typography
    "mb-3","font-medium","tracking-wide","uppercase",
    "text-3xl","md:text-5xl","font-semibold","leading-tight",
    "mt-4","text-base","md:text-lg","leading-relaxed",
    // CTAs
    "mt-8","flex","gap-3","inline-flex","items-center","rounded-2xl","px-5","py-2.5","text-sm",
    "shadow-sm","border",
    // Positional helpers for background
    "relative","absolute","inset-0","h-full","block","h-auto","min-h-[60vh]",
    // Arbitrary tokens (CSS vars)
    "bg-[var(--background)]","text-[var(--foreground)]",
    "text-[color:var(--muted-foreground)]",
    "bg-[var(--primary)]","text-[var(--primary-foreground)]",
    "focus:outline-none","focus-visible:ring-2","focus-visible:ring-[var(--ring)]",
    "border-[color:var(--border)]","rounded-[var(--radius)]",
    "shadow-[var(--shadow-md,0_4px_24px_rgba(0,0,0,0.08))]",
  ],
  theme: { extend: {} },
  plugins: [],
};
