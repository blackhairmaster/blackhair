import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  /** Optional "смотреть полностью" link to a dedicated page */
  link?: { label: string; href: string };
  className?: string;
  /** Render the eyebrow line with a rule */
  rule?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  link,
  className,
  rule = true,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal className={cn("flex items-center gap-4", centered && "justify-center")}>
          {rule && <span aria-hidden="true" className="h-px w-10 bg-accent/60" />}
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <h2 className="display-lg mt-6 text-primary">{title}</h2>
      </Reveal>

      {description && (
        <Reveal delay={0.12}>
          <p className="body-lg mt-6">{description}</p>
        </Reveal>
      )}

      {link && (
        <Reveal delay={0.18}>
          <Link
            to={link.href}
            className="group mt-8 inline-flex items-center gap-2 border-b border-primary/25 pb-1 text-[13px] font-medium tracking-[0.04em] text-primary transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            {link.label}
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
