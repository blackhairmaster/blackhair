import { Link } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { siteData } from "@/data/siteData";
import OptimizedImage from "./OptimizedImage";
import GalleryLightbox, { type GalleryItem } from "./GalleryLightbox";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { pad2 } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface GalleryProps {
  variant?: "preview" | "page";
}

/**
 * Interactive gallery.
 * Desktop: large main image, previous / next, thumbnails, "01 / 12" counter.
 * Mobile: swipe gestures + horizontal thumbnail strip.
 * Click opens a fullscreen lightbox.
 */
export default function Gallery({ variant = "page" }: GalleryProps) {
  const items = siteData.gallery.items as readonly GalleryItem[];
  const total = items.length;
  const reduce = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const draggedRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      setIndex((prev) => (prev + step + total) % total);
    },
    [total],
  );

  const goTo = useCallback(
    (next: number) => {
      setDirection(next >= index ? 1 : -1);
      setIndex(next);
    },
    [index],
  );

  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => {
    setLightboxOpen(false);
    wrapperRef.current?.focus({ preventScroll: true });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  const item = items[index];
  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir > 0 ? -50 : 50 }),
  };

  return (
    <section id="gallery" className="section" aria-labelledby="gallery-title">
      <div className="page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={siteData.gallery.subtitle}
            title={
              <span id="gallery-title">
                {siteData.gallery.title}{" "}
                <span className="italic text-accent">мастера</span>
              </span>
            }
            description={
              variant === "preview" ? undefined : siteData.gallery.note
            }
            className="max-w-2xl"
          />

          {variant === "preview" ? (
            <Reveal delay={0.15} className="md:mb-2 md:self-end">
              <Link
                to="/gallery"
                className="group inline-flex items-center gap-2 border-b border-primary/25 pb-1 text-[13px] font-medium tracking-[0.04em] text-primary transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Смотреть все работы
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ) : (
            <Reveal delay={0.15} className="md:mb-2 md:self-end">
              <span className="text-[11px] uppercase tracking-[0.2em] text-secondary">
                {pad2(total)} фотографий
              </span>
            </Reveal>
          )}
        </div>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-14">
          {/* ---------------------------------------------- main image */}
          <div
            ref={wrapperRef}
            tabIndex={-1}
            onKeyDown={onKeyDown}
            className="relative min-w-0 outline-none"
          >
            <span id="gallery-open-hint" className="sr-only">
              Открыть фотографию в полном размере
            </span>
            <button
              type="button"
              onClick={openLightbox}
              aria-describedby="gallery-open-hint"
              className="group block w-full cursor-zoom-in"
            >
              <div className="relative overflow-hidden bg-[#EEE9E3] aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[72vh]">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.figure
                    key={item.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: EASE }}
                    drag={reduce ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragStart={() => {
                      draggedRef.current = true;
                    }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60) go(1);
                      else if (info.offset.x > 60) go(-1);
                      window.setTimeout(() => {
                        draggedRef.current = false;
                      }, 0);
                    }}
                    className="absolute inset-0"
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      aspect="aspect-auto"
                      className="h-full w-full"
                      sizes="(max-width: 1024px) 100vw, 62vw"
                    />
                  </motion.figure>
                </AnimatePresence>

                {/* bottom gradient + meta */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(15,14,13,0.45),transparent)]"
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-background/90 px-4 py-2 text-[11px] tracking-[0.18em] text-primary backdrop-blur-sm"
                >
                  <span className="font-medium">{pad2(index + 1)}</span>
                  <span className="text-secondary"> / {pad2(total)}</span>
                </span>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-primary opacity-100 backdrop-blur-sm transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <Expand className="h-4 w-4" />
                </span>
              </div>
            </button>

              {/* overlay arrows */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущая работа"
              className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-dark/35 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-dark lg:flex"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующая работа"
              className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-dark/35 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-dark lg:flex"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* ---------------------------------------------- side panel */}
          <aside className="flex min-w-0 flex-col">
            {/* desktop info */}
            <div className="hidden lg:block">
              <span className="eyebrow">{siteData.gallery.subtitle}</span>
              <div className="mt-5 flex items-end gap-3 font-display leading-none">
                <span className="text-[64px] text-primary">{pad2(index + 1)}</span>
                <span className="mb-2 text-2xl text-secondary">/ {pad2(total)}</span>
              </div>
              <p className="mt-4 text-[14.5px] leading-relaxed text-secondary">
                {item.caption}
              </p>

              <div className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-secondary">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                клик — открыть во весь экран
              </div>
            </div>

            {/* mobile meta */}
            <div className="mt-5 flex items-center justify-between lg:hidden">
              <div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
                  <span className="font-medium text-primary">{pad2(index + 1)}</span> / {pad2(total)}
                </span>
                <p className="mt-1 text-[14px] text-secondary">{item.caption}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Предыдущая работа"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors duration-300 active:bg-primary active:text-white"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Следующая работа"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors duration-300 active:bg-primary active:text-white"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* desktop thumbnails */}
            <div className="mt-8 hidden grid-cols-4 gap-2.5 lg:grid">
              {items.map((thumb, i) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Показать изображение ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`relative overflow-hidden transition-all duration-500 ${
                    i === index
                      ? "ring-1 ring-primary ring-offset-2 ring-offset-background opacity-100"
                      : "opacity-45 hover:opacity-100"
                  }`}
                >
                  <OptimizedImage
                    src={thumb.src}
                    alt=""
                    aspect="aspect-[4/5]"
                    sizes="80px"
                    showFileName={false}
                  />
                </button>
              ))}
            </div>

            {/* mobile thumbnails strip */}
            <div
              className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 lg:hidden"
            >
              {items.map((thumb, i) => (
                <button
                  key={thumb.id}
                  type="button"
                  aria-current={i === index ? "true" : undefined}
                  aria-label={`Показать изображение ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`w-[72px] shrink-0 snap-start transition-all duration-300 ${
                    i === index
                      ? "ring-1 ring-primary ring-offset-2 ring-offset-background opacity-100"
                      : "opacity-45"
                  }`}
                >
                  <OptimizedImage
                    src={thumb.src}
                    alt=""
                    aspect="aspect-[4/5]"
                    sizes="72px"
                    showFileName={false}
                  />
                </button>
              ))}
            </div>
          </aside>
        </div>

        {variant === "page" && (
          <p className="mt-10 max-w-2xl text-[12.5px] leading-relaxed text-secondary">
            {siteData.gallery.note}
          </p>
        )}
      </div>

      <GalleryLightbox
        items={items as GalleryItem[]}
        index={index}
        direction={direction}
        open={lightboxOpen}
        onClose={closeLightbox}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
      />
    </section>
  );
}
