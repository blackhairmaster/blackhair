import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { siteData } from "@/data/siteData";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { socialItems } from "./SocialLinks";
import { pad2 } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Навигация по сайту"
          className="fixed inset-0 z-[70] flex flex-col bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {/* top bar */}
          <div className="flex h-20 shrink-0 items-center justify-between">
            <Link
              to="/"
              onClick={onClose}
              className="flex flex-col leading-none"
            >
              <span className="font-display text-[22px] tracking-tight">
                {siteData.master.name}
              </span>
              <span className="mt-1 text-[9px] uppercase tracking-[0.34em] text-secondary">
                {siteData.master.role}
              </span>
            </Link>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Закрыть меню"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* nav */}
          <motion.nav
            className="flex flex-1 flex-col justify-center overflow-y-auto"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <ul className="space-y-1">
              {siteData.navigation.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.li key={link.href} variants={item}>
                    <Link
                      to={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-baseline gap-5 border-b border-line py-4"
                    >
                      <span className="text-[11px] tracking-[0.2em] text-accent">
                        {pad2(i + 1)}
                      </span>
                      <span
                        className={`font-display text-[clamp(2rem,9vw,2.75rem)] leading-none transition-colors duration-300 ${
                          active ? "text-accent" : "text-primary"
                        }`}
                      >
                        {link.label}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="ml-auto h-5 w-5 -translate-x-2 text-secondary opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div variants={item} className="mt-10 flex flex-wrap gap-2">
              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full bg-dark px-8 py-4 text-[13px] font-medium tracking-[0.06em] text-white transition-colors duration-500 hover:bg-accent"
              >
                Записаться
              </Link>
            </motion.div>
          </motion.nav>

          {/* socials */}
          <motion.div
            variants={item}
            className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-2 border-t border-line py-6"
          >
            {socialItems.map((social) => (
              <a
                key={social.id}
                href={social.href}
                onClick={(event) => social.placeholder && event.preventDefault()}
                title={social.placeholder ? "Добавьте ссылку в src/data/siteData.ts" : social.label}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="text-[12px] uppercase tracking-[0.16em] text-secondary transition-colors duration-300 hover:text-primary"
              >
                {social.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
