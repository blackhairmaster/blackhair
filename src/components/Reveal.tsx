import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset in px */
  y?: number;
  duration?: number;
  /** "up" | "fade" | "scale" */
  effect?: "up" | "fade" | "scale";
  once?: boolean;
}

/** Fade / translate reveal on scroll — respects prefers-reduced-motion. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.9,
  effect = "up",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  const hidden =
    effect === "fade"
      ? { opacity: 0 }
      : effect === "scale"
        ? { opacity: 0, scale: 1.04 }
        : { opacity: 0, y: reduce ? 0 : y };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

/** Container that reveals its direct children one after another. */
export function Stagger({ children, className, delay = 0, stagger = 0.09 }: StaggerProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

interface RevealTextProps {
  text: string;
  className?: string;
  /** Reveal word by word (for big editorial statements) */
  byWord?: boolean;
  delay?: number;
}

/** Editorial text reveal — line-by-line or word-by-word. */
export function RevealText({ text, className, byWord = true, delay = 0 }: RevealTextProps) {
  const reduce = useReducedMotion();
  const parts = byWord ? text.split(" ") : text.split("\n");

  return (
    <span className={cn("block", className)}>
      {/* accessible text for screen readers (animated words are hidden) */}
      <span className="sr-only">{text}</span>
      {parts.map((part, i) => (
        <motion.span
          key={`${part}-${i}`}
          aria-hidden="true"
          className={cn("inline-block", !byWord && "block")}
          initial={{ opacity: 0, y: reduce ? 0 : "0.35em" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: delay + i * (byWord ? 0.045 : 0.12), ease: EASE }}
        >
          {part}
          {byWord && "\u00A0"}
        </motion.span>
      ))}
    </span>
  );
}
