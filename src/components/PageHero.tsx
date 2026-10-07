import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Reveal from "./Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb?: string;
}

/** Compact editorial header for the inner pages. */
export default function PageHero({ eyebrow, title, description, breadcrumb }: PageHeroProps) {
  return (
    <section className="border-b border-line pb-14 pt-32 lg:pb-20 lg:pt-44" aria-labelledby="page-title">
      <div className="page">
        <Reveal>
          <nav aria-label="Хлебные крошки" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-secondary">
            <Link to="/" className="transition-colors duration-300 hover:text-accent">
              Главная
            </Link>
            <ChevronRight aria-hidden="true" className="h-3 w-3" />
            <span className="text-primary">{breadcrumb ?? title}</span>
          </nav>
        </Reveal>

        <Reveal delay={0.05} className="mt-8 flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-12 bg-accent" />
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 id="page-title" className="display-xl mt-6 text-primary">
            {title}
          </h1>
        </Reveal>

        {description && (
          <Reveal delay={0.16}>
            <p className="body-lg mt-7 max-w-2xl">{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
