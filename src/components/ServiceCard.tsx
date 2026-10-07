import { Link } from "react-router-dom";
import { Clock, ArrowUpRight } from "lucide-react";
import type { SiteData } from "@/data/siteData";
import OptimizedImage from "./OptimizedImage";
import Reveal from "./Reveal";

type Service = SiteData["services"][number];

interface ServiceCardProps {
  service: Service;
  /** Card links to the contact page (default) or nowhere */
  linkTo?: string;
  index?: number;
}

/** Editorial service card: big image, label, title, description, meta, CTA. */
export default function ServiceCard({ service, linkTo = "/contact", index = 0 }: ServiceCardProps) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="group flex h-full flex-col">
        <Link
          to={linkTo}
          className="block"
          aria-label={`${service.title} — записаться`}
        >
          <div className="relative overflow-hidden">
            <OptimizedImage
              src={service.image}
              alt={service.imageAlt}
              aspect="aspect-[4/5]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 30vw"
              imgClassName="scale-100 group-hover:scale-[1.03]"
            />
            {/* subtle overlay on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-dark/0 transition-colors duration-700 group-hover:bg-dark/15"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-5 rounded-full bg-background/90 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary backdrop-blur-sm"
            >
              {service.category}
            </span>
          </div>
        </Link>

        <div className="flex flex-1 flex-col pt-6">
          <div className="flex items-baseline gap-4">
            <span className="text-[11px] tracking-[0.22em] text-accent">{service.index}</span>
            <h3 className="font-display text-[clamp(1.6rem,2.2vw,2.1rem)] leading-tight text-primary">
              {service.title}
            </h3>
          </div>

          <p className="mt-4 text-[14.5px] leading-relaxed text-secondary">
            {service.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            <span className="flex items-center gap-2 text-[13px] text-secondary">
              <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
              {service.duration}
            </span>
            <span className="font-display text-xl text-primary">{service.price}</span>
          </div>

          <Link
            to={linkTo}
            className="mt-5 inline-flex items-center gap-2 self-start text-[13px] font-medium tracking-[0.04em] text-primary transition-colors duration-300 group-hover:text-accent"
          >
            Записаться
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
