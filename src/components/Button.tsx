import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "solidLight" | "outline" | "light";
type Size = "sm" | "md";

export interface ButtonProps {
  children: ReactNode;
  /** Internal route (react-router) */
  to?: string;
  /** External link */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

/** No color and no padding here — those belong to variants/sizes only,
 *  so there are never two competing utilities of the same kind. */
const base =
  "group/btn relative inline-flex items-center justify-center gap-3 rounded-full font-medium tracking-[0.06em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  sm: "px-6 py-3 text-[12.5px]",
  md: "px-7 py-3.5 text-[13px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-dark text-white hover:bg-accent hover:shadow-[0_14px_34px_-18px_rgba(24,23,22,0.9)]",
  /** Solid white on dark sections — dark text, accent on hover. */
  solidLight:
    "bg-white text-dark hover:bg-accent hover:text-white hover:shadow-[0_14px_34px_-18px_rgba(24,23,22,0.6)]",
  outline:
    "border border-primary/25 text-primary hover:border-primary hover:bg-primary hover:text-white",
  light:
    "border border-white/30 text-white hover:bg-white hover:text-dark",
};

export default function Button({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  disabled,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1.5"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {content}
    </button>
  );
}
