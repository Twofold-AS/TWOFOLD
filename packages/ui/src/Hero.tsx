import * as React from 'react';

export interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaHref = '#',
}) => {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-gray-600 mb-8">
              {subtitle}
            </p>
          )}
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};