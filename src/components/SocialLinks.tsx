import type { LucideIcon } from "lucide-react";
import { Facebook, Instagram, MessageCircle, Music2, Send, ArrowUpRight } from "lucide-react";
import { siteData } from "@/data/siteData";
import { isPlaceholder, normalizeUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

type SocialId = keyof typeof siteData.social;

export interface SocialItem {
  id: SocialId;
  label: string;
  href: string;
  Icon: LucideIcon;
  placeholder: boolean;
  external: boolean;
}

const baseSocials: Array<{ id: SocialId; label: string; Icon: LucideIcon }> = [
  { id: "instagram", label: "Instagram", Icon: Instagram },
  { id: "facebook", label: "Facebook", Icon: Facebook },
  { id: "tiktok", label: "TikTok", Icon: Music2 },
  { id: "whatsapp", label: "WhatsApp", Icon: MessageCircle },
  { id: "telegram", label: "Telegram", Icon: Send },
];

/** Normalized list of the master's social profiles (configured in siteData). */
export const socialItems: SocialItem[] = baseSocials.map((entry) => {
  const raw: string = siteData.social[entry.id];
  const placeholder = isPlaceholder(raw);
  return {
    ...entry,
    href: placeholder ? "#": normalizeUrl(raw),
    placeholder,
    external: !placeholder,
  };
});

interface SocialLinksProps {
  variant?: "light" | "dark";
  layout?: "list" | "inline";
  className?: string;
}

/**
 * Social contact links.
 * URLs are configured in `src/data/siteData.ts` → `social`.
 */
export default function SocialLinks({
  variant = "light",
  layout = "list",
  className,
}: SocialLinksProps) {
  const dark = variant === "dark";

  if (layout === "inline") {
    return (
      <ul className={cn("flex flex-wrap items-center gap-x-7 gap-y-3", className)}>
        {socialItems.map(({ id, label, href, Icon, placeholder, external }) => (
          <li key={id}>
            <a
              href={href}
              aria-label={label}
              title={placeholder ? "Добавьте ссылку в src/data/siteData.ts" : label}
              onClick={(event) => placeholder && event.preventDefault()}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={cn(
                "group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] transition-colors duration-300",
                dark
                  ? "text-white/65 hover:text-white"
                  : "text-secondary hover:text-primary",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-current">
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("w-full", className)}>
      {socialItems.map(({ id, label, href, Icon, placeholder, external }) => (
        <li key={id}>
          <a
            href={href}
            aria-label={label}
            title={placeholder ? "Добавьте ссылку в src/data/siteData.ts" : label}
            onClick={(event) => placeholder && event.preventDefault()}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={cn(
              "group flex items-center justify-between border-b py-4 transition-colors duration-300",
              dark
                ? "border-white/10 text-white/65 hover:border-white/30 hover:text-white"
                : "border-line text-secondary hover:border-primary/30 hover:text-primary",
            )}
          >
            <span className="flex items-center gap-4">
              <Icon
                className="h-[18px] w-[18px] transition-transform duration-500 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <span className="text-[13.5px] tracking-[0.02em]">{label}</span>
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
