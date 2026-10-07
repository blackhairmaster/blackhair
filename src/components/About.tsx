import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { siteData } from "@/data/siteData";
import OptimizedImage from "./OptimizedImage";
import Reveal, { Stagger, StaggerItem } from "./Reveal";
import { pad2 } from "@/lib/utils";

interface AboutProps {
  variant?: "preview" | "full";
}

export default function About({ variant = "preview" }: AboutProps) {
  const full = variant === "full";

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* ------------------------------------------------ image */}
        <Reveal effect="scale" className="relative order-2 min-w-0 lg:order-1">
          <span
            aria-hidden="true"
            className="absolute -left-3 -top-3 hidden h-24 w-24 border-l border-t border-accent/40 sm:block"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 hidden h-24 w-24 border-b border-r border-accent/40 sm:block"
          />

          <OptimizedImage
            src={siteData.about.image}
            alt={siteData.about.imageAlt}
            aspect="aspect-[3/4]"
            sizes="(max-width: 1024px) 100vw, 44vw"
            objectPosition="50% 35%"
          />

          <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-secondary">
            <span>{siteData.about.title}</span>
            <span>{siteData.master.city}</span>
          </div>
        </Reveal>

        {/* ------------------------------------------------ text */}
        <div className="order-1 min-w-0 lg:order-2">
          <Reveal className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-accent" />
            <span className="eyebrow">{siteData.about.title}</span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 id="about-title" className="display-lg mt-6 text-primary">
              Мастер, который работает{" "}
              <span className="italic text-accent">внимательно</span>
            </h2>
          </Reveal>

          <div className="mt-7 space-y-5">
            {(full
              ? siteData.about.paragraphs
              : siteData.about.paragraphs.slice(0, 2)
            ).map((paragraph, i) => (
              <Reveal key={i} delay={0.08 + i * 0.06}>
                <p className="body-lg">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {/* stats */}
          <Stagger className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8" delay={0.1}>
            {siteData.about.stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="min-w-0">
                  <div className="break-words font-display text-[clamp(1.35rem,2.6vw,2.1rem)] leading-none text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-3 text-[10.5px] uppercase leading-relaxed tracking-[0.16em] text-secondary">
                    {stat.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {full ? (
            <Reveal delay={0.15} className="mt-4 text-[12px] leading-relaxed text-secondary">
              Значения-заглушки — замените их в <code className="text-accent">src/data/siteData.ts</code>.
            </Reveal>
          ) : (
            <Reveal delay={0.15} className="mt-10">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 border-b border-primary/25 pb-1 text-[13px] font-medium tracking-[0.04em] text-primary transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Подробнее о мастере
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Reveal>
          )}
        </div>
      </div>

      {/* ------------------------------------------------ principles */}
      {full && (
        <div className="page mt-20 lg:mt-28">
          <Reveal className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-accent" />
            <span className="eyebrow">{siteData.about.philosophyTitle}</span>
          </Reveal>

          <Stagger className="mt-8 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {siteData.about.philosophy.map((principle, i) => (
              <StaggerItem key={principle.title} y={18}>
                <article className="h-full bg-background p-7 transition-colors duration-500 hover:bg-surface lg:p-9">
                  <div className="text-[11px] tracking-[0.22em] text-accent">
                    {pad2(i + 1)}
                  </div>
                  <h3 className="mt-5 font-display text-2xl leading-tight text-primary">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-secondary">
                    {principle.text}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      )}
    </section>
  );
}
