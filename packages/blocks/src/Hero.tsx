import * as React from "react";

export type HeroProps = {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Hero({ title, subtitle, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
        {subtitle ? (
          <p className="mt-4 text-base text-muted-foreground md:text-lg">{subtitle}</p>
        ) : null}
        {ctaLabel ? (
          <div className="mt-8">
            <a
              href={ctaHref ?? "#"}
              className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-inset ring-black/10 hover:bg-black/5"
            >
              {ctaLabel}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
