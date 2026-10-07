import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { siteData } from "@/data/siteData";
import { useScrolled } from "@/hooks/useScrolled";
import MobileMenu from "./MobileMenu";
import Button from "./Button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(40);
  const { pathname } = useLocation();

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "border-b border-primary/[0.07] bg-background/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "page flex items-center justify-between transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled ? "h-[68px] lg:h-[76px]" : "h-20 lg:h-28",
          )}
        >
          {/* logo */}
          <Link
            to="/"
            className="group flex flex-col leading-none"
          >
            <span className="font-display text-[21px] tracking-tight text-primary transition-colors duration-300 group-hover:text-accent lg:text-[25px]">
              {siteData.master.name}
            </span>
            <span
              className={cn(
                "mt-1 text-[9px] uppercase tracking-[0.34em] text-secondary transition-all duration-500",
                scrolled && "opacity-0",
              )}
            >
              {siteData.master.role}
            </span>
          </Link>

          {/* desktop nav */}
          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {siteData.navigation.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative inline-block py-1 text-[13.5px] tracking-[0.02em] transition-colors duration-300",
                        active ? "text-primary" : "text-secondary hover:text-primary",
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100",
                          active && "origin-left scale-x-100 bg-accent",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* right side */}
          <div className="flex items-center gap-3">
            <Button to="/contact" className="hidden px-6 py-3 md:inline-flex">
              Записаться
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
