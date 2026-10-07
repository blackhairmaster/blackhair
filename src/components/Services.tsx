import { Link } from "react-router-dom";
import { siteData } from "@/data/siteData";
import SectionHeading from "./SectionHeading";
import ServiceCard from "./ServiceCard";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

interface ServicesProps {
  variant?: "preview" | "full";
}

/** Three editorial service cards with a staggered rhythm. */
export default function Services({ variant = "preview" }: ServicesProps) {
  const full = variant === "full";

  return (
    <section
      id="services"
      className="section border-y border-line bg-surface/60"
      aria-labelledby="services-title"
    >
      <div className="page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Услуги"
            title={
              <span id="services-title">
                Три направления, <span className="italic text-accent">один подход</span>
              </span>
            }
            description="Каждая процедура подбирается под структуру ваших волос — а не наоборот."
            className="max-w-2xl"
            rule={false}
          />

          {!full && (
            <Reveal delay={0.15} className="md:mb-2 md:self-end">
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 border-b border-primary/25 pb-1 text-[13px] font-medium tracking-[0.04em] text-primary transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Все услуги
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          )}
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {siteData.services.map((service, i) => (
            <div
              key={service.id}
              className={cn(
                "h-full min-w-0",
                // editorial stagger on wide screens
                i === 1 && "lg:mt-16",
                i === 2 && "lg:mt-8",
              )}
            >
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
