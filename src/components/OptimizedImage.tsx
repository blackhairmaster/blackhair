import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { cn, fileNameFromSrc } from "@/lib/utils";

type State = "loading" | "loaded" | "error";

export interface OptimizedImageProps {
  /** Path to the image, e.g. "/images/master/master-hero.jpg" */
  src: string;
  /** Required alternative text (accessibility + SEO) */
  alt: string;
  /** Layout classes for the wrapper (grid placement, extra sizes…) */
  className?: string;
  /** Classes applied to the <img> element */
  imgClassName?: string;
  /** Tailwind aspect utility for the wrapper, e.g. "aspect-[4/5]" */
  aspect?: string;
  /** object-position value */
  objectPosition?: string;
  /** object-fit value — use "contain" for fullscreen previews */
  fit?: "cover" | "contain";
  /** Preload instead of lazy-loading (hero / above the fold) */
  priority?: boolean;
  /** Responsive sizes attribute */
  sizes?: string;
  /** Placeholder look when the file is missing */
  tone?: "light" | "dark";
  /** Show the file name inside the placeholder (helps replacing assets) */
  showFileName?: boolean;
}

/**
 * Reusable, optimization-friendly image.
 *
 * - lazy loading by default, eager when `priority` is set
 * - explicit width/height via the aspect-ratio box (no layout shift)
 * - fades in when loaded
 * - renders an elegant placeholder instead of a broken image icon
 *   when the file has not been uploaded yet.
 */
export default function OptimizedImage({
  src,
  alt,
  className,
  imgClassName,
  aspect = "aspect-[4/5]",
  objectPosition,
  fit = "cover",
  priority = false,
  sizes = "100vw",
  tone = "light",
  showFileName = true,
}: OptimizedImageProps) {
  const [state, setState] = useState<State>("loading");
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Handles the case where the image is already in cache before hydration.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setState("loaded");
  }, [src]);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-[#EEE9E3]",
        aspect,
        className,
      )}
    >
      {state !== "error" && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
          style={{
            opacity: state === "loaded" ? 1 : 0,
            objectPosition,
          }}
          className={cn(
            "absolute inset-0 h-full w-full transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            fit === "contain" ? "object-contain" : "object-cover",
            imgClassName,
          )}
        />
      )}

      {state !== "loaded" && (
        <div
          role="img"
          aria-label={alt}
          className={cn(
            "grain absolute inset-0 flex select-none flex-col items-center justify-center gap-3",
            tone === "dark"
              ? "bg-[linear-gradient(135deg,#232120_0%,#1B1A18_60%,#141312_100%)]"
              : "bg-[linear-gradient(135deg,#F1ECE6_0%,#E7E0D7_55%,#DED6CB_100%)]",
          )}
        >
          <ImageOff
            strokeWidth={1}
            aria-hidden="true"
            className={cn(
              "h-5 w-5",
              tone === "dark" ? "text-white/25" : "text-primary/25",
            )}
          />
          {showFileName && (
            <span
              className={cn(
                "px-4 text-center text-[10px] font-medium uppercase tracking-[0.2em]",
                tone === "dark" ? "text-white/60" : "text-primary/55",
              )}
            >
              {fileNameFromSrc(src)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
