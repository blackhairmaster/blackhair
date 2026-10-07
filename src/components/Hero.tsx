import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { siteData } from "@/data/siteData";
import OptimizedImage from "./OptimizedImage";
import Button from "./Button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* soft background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(140,119,101,0.16)_0%,rgba(140,119,101,0)_70%)]"
      />

      <div className="page relative grid items-center gap-12 pb-20 pt-32 lg:min-h-[94vh] lg:grid-cols-[1.02fr_0.98fr] lg:gap-20 lg:pb-28 lg:pt-40">
        {/* ------------------------------------------------ text */}
        <motion.div
          className="order-2 min-w-0 lg:order-1"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-12 bg-accent" />
            <span className="eyebrow">{siteData.hero.eyebrow}</span>
            <span className="text-[11px] uppercase tracking-[0.24em] text-secondary">
              {siteData.master.city}
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={item}
            className="display-hero mt-7 text-primary"
          >
            {siteData.master.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-lg font-display text-[clamp(1.35rem,2.4vw,1.85rem)] italic leading-snug text-secondary"
          >
            «{siteData.master.tagline}»
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Button to="/contact" arrow>
              Записаться
            </Button>
            <Button to="/gallery" variant="outline">
              {siteData.hero.secondaryCta}
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-14 hidden items-center gap-4 text-secondary lg:flex"
          >
            <motion.span
              aria-hidden="true"
              className="block h-10 w-px origin-top bg-[linear-gradient(to_bottom,transparent,var(--color-accent))]"
              animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[11px] uppercase tracking-[0.24em]">
              {siteData.hero.scrollLabel}
            </span>
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.div>
        </motion.div>

        {/* ------------------------------------------------ image */}
        <motion.figure
          className="relative order-1 min-w-0 lg:order-2"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.05, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.1 }}
        >
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-4 -top-4 hidden h-28 w-28 border-l border-t border-accent/40 lg:block"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 hidden h-28 w-28 border-b border-r border-accent/40 lg:block"
            />

            <OptimizedImage
              src={siteData.hero.image}
              alt={siteData.hero.imageAlt}
              aspect="aspect-[4/5] max-h-[72vh] lg:max-h-[78vh]"
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              objectPosition="50% 30%"
            />
          </div>

          <figcaption className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-secondary">
            <span>{siteData.master.role}</span>
            <span>{siteData.master.city}</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
