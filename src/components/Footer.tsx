import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { siteData } from "@/data/siteData";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-dark text-white">
      <div className="page py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* brand */}
          <div className="min-w-0">
            <Link to="/" className="inline-flex flex-col leading-none">
              <span className="font-display text-[26px] tracking-tight text-white">
                {siteData.master.name}
              </span>
              <span className="mt-1.5 text-[9px] uppercase tracking-[0.34em] text-white/60">
                {siteData.master.role} · {siteData.master.city}
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-white/65">
              {siteData.master.tagline}
            </p>
          </div>

          {/* navigation */}
          <nav aria-label="Навигация в подвале">
            <h2 className="text-[10.5px] uppercase tracking-[0.2em] text-white/60">Разделы</h2>
            <ul className="mt-5 space-y-3">
              {siteData.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[14.5px] text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* socials */}
          <div>
            <h2 className="text-[10.5px] uppercase tracking-[0.2em] text-white/60">Соцсети</h2>
            <SocialLinks variant="dark" layout="inline" className="mt-5 flex-col items-start gap-3" />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
          <p className="text-[12.5px] text-white/60">
            © {year} {siteData.master.name}. Все права защищены.
          </p>

          <button
            type="button"
            onClick={toTop}
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/65 transition-colors duration-300 hover:text-white"
          >
            Наверх
            <ArrowUp
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
