"use client";

import * as React from "react";
import { z } from "zod";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Hero block — typed props + Zod schema + Motion preset
 * - Tailwind utilities for tokens/spacing
 * - Inline-style fallbacks so align/vAlign work even if Tailwind isn’t picked up
 */

const HeroSchemaCore = z.object({
  eyebrow: z.string().optional(),
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
  primaryCta: z
    .object({ label: z.string().min(1), href: z.string().url().or(z.string().min(1)) })
    .optional(),
  secondaryCta: z
    .object({ label: z.string().min(1), href: z.string().url().or(z.string().min(1)) })
    .optional(),
  image: z
    .object({
      src: z.string().min(1),
      alt: z.string().default(""),
      width: z.number().int().positive().optional(),
      height: z.number().int().positive().optional(),
      fit: z.enum(["cover", "contain", "fill"]).optional(),
      position: z.enum(["left", "center", "right", "top", "bottom"]).optional(),
      asBackground: z.boolean().optional(),
    })
    .optional(),
  align: z.enum(["left", "center"]).default("left"),
  vAlign: z.enum(["top", "center", "bottom"]).default("top"),
});

const HeroLegacySchema = z.object({
  /** @deprecated use `description` */
  subtitle: z.string().optional(),
  /** @deprecated use `primaryCta={{label, href}}` */
  ctaLabel: z.string().optional(),
  /** @deprecated use `primaryCta={{label, href}}` */
  ctaHref: z.string().optional(),
});

export const HeroSchema = HeroSchemaCore.merge(HeroLegacySchema);
export type HeroProps = z.infer<typeof HeroSchema>;

export const heroRevealPreset: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Hero(rawProps: HeroProps) {
  const parsed = HeroSchema.safeParse(rawProps);
  const props = parsed.success ? parsed.data : (rawProps as HeroProps);

  const {
    eyebrow,
    title,
    description: descriptionRaw,
    primaryCta: primaryCtaRaw,
    secondaryCta,
    image,
    align = "left",
    vAlign = "top",
    // legacy
    subtitle,
    ctaLabel,
    ctaHref,
  } = props;

  const description = descriptionRaw ?? subtitle;
  const primaryCta =
    primaryCtaRaw ?? (ctaLabel ? { label: ctaLabel, href: ctaHref ?? "#" } : undefined);

  const prefersReducedMotion = useReducedMotion();
  const variants: Variants | undefined = prefersReducedMotion ? undefined : heroRevealPreset;

  const isCenter = align === "center";
  const asBackground = !!image?.asBackground;

  // Image behavior
  const fit = image?.fit ?? "cover";
  const fitClass =
    fit === "contain" ? "object-contain" : fit === "fill" ? "object-fill" : "object-cover";
  const pos = image?.position ?? "center";
  const objectPosition =
    pos === "left"
      ? "left center"
      : pos === "right"
        ? "right center"
        : pos === "top"
          ? "center top"
          : pos === "bottom"
            ? "center bottom"
            : "center";

  // Inline-style fallbacks (work even if Tailwind isn’t applied)
  const wrapperGridStyle: React.CSSProperties = {
    justifyItems: isCenter ? "center" : undefined,
    placeContent: vAlign === "center" ? "center" : vAlign === "bottom" ? "end" : undefined,
    minHeight: asBackground ? "60vh" : undefined,
  };
  const textBoxStyle: React.CSSProperties = {
    textAlign: isCenter ? "center" : undefined,
    justifySelf: isCenter ? "center" : undefined,
    maxWidth: isCenter ? "42rem" : undefined, // ~max-w-2xl
  };

  return (
    <section
      className={cx(
        "w-full",
        "bg-[var(--background)] text-[var(--foreground)]",
        "py-16 md:py-24",
        asBackground && "relative overflow-hidden",
      )}
      aria-label="Hero"
    >
      {/* Background / cover */}
      {asBackground && image && (
        <img
          src={image.src}
          alt={image.alt ?? ""}
          className={cx("absolute inset-0 w-full h-full", fitClass)}
          style={{ objectPosition }}
          loading="lazy"
          decoding="async"
          aria-hidden={image.alt === "" ? "true" : undefined}
        />
      )}

      <div
        className={cx("relative", "mx-auto", "max-w-6xl", "px-4 md:px-6", asBackground && "z-10")}
      >
        <div
          className={cx(
            "grid items-center gap-8 md:gap-12",
            image && !asBackground ? "md:grid-cols-2" : "md:grid-cols-1",
            isCenter && "justify-items-center",
            vAlign === "center"
              ? "place-content-center"
              : vAlign === "bottom"
                ? "place-content-end"
                : "",
          )}
          style={wrapperGridStyle}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={variants}
            className={cx(isCenter && "text-center justify-self-center mx-auto max-w-2xl")}
            style={textBoxStyle}
          >
            {eyebrow && (
              <p
                className={cx(
                  "mb-3 font-medium tracking-wide uppercase",
                  "text-[color:var(--muted-foreground)]",
                )}
              >
                {eyebrow}
              </p>
            )}
            <h1
              className={cx(
                "text-3xl md:text-5xl font-semibold leading-tight",
                "text-[var(--foreground)]",
              )}
            >
              {title}
            </h1>
            {description && (
              <p
                className={cx(
                  "mt-4 text-base md:text-lg leading-relaxed",
                  "text-[color:var(--muted-foreground)]",
                )}
              >
                {description}
              </p>
            )}
            {(primaryCta || secondaryCta) && (
              <div className={cx("mt-8 flex gap-3", isCenter ? "justify-center" : "")}>
                {primaryCta && (
                  <a
                    href={primaryCta.href}
                    className={cx(
                      "inline-flex items-center justify-center",
                      "rounded-2xl px-5 py-2.5 text-sm font-medium",
                      "bg-[var(--primary)] text-[var(--primary-foreground)]",
                      "shadow-sm",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                    )}
                  >
                    {primaryCta.label}
                  </a>
                )}
                {secondaryCta && (
                  <a
                    href={secondaryCta.href}
                    className={cx(
                      "inline-flex items-center justify-center",
                      "rounded-2xl px-5 py-2.5 text-sm font-medium",
                      "border border-[color:var(--border)]",
                      "text-[var(--foreground)]",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                    )}
                  >
                    {secondaryCta.label}
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* Inline, side-by-side image */}
          {!asBackground && image && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              variants={variants}
              className={cx("relative", "w-full", isCenter && "justify-self-center")}
              style={{ justifySelf: isCenter ? "center" : undefined }}
            >
              <img
                src={image.src}
                alt={image.alt ?? ""}
                width={image.width}
                height={image.height}
                className={cx(
                  "block w-full h-auto",
                  fitClass,
                  "rounded-[var(--radius)]",
                  "shadow-[var(--shadow-md,0_4px_24px_rgba(0,0,0,0.08))]",
                )}
                style={{ objectPosition, width: "100%", height: "auto" }} // fallback so it isn’t 100x100
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
