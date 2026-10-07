import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import OptimizedImage from "./OptimizedImage";
import { pad2 } from "@/lib/utils";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

interface GalleryLightboxProps {
  items: GalleryItem[];
  index: number;
  direction: number;
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Fullscreen lightbox: arrows, close button, Escape, keyboard navigation
 * and swipe on touch devices. Transition ~400ms.
 */
export default function GalleryLightbox({
  items,
  index,
  direction,
  open,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const draggedRef = useRef(false);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, onPrev, onNext]);

  const item = items[index];
  if (!item) return null;

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir > 0 ? 70 : -70 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir > 0 ? -70 : 70 }),
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Просмотр изображения ${index + 1} из ${items.length}`}
          className="fixed inset-0 z-[90] flex flex-col bg-[#0F0E0D]/98 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {/* header */}
          <div className="flex shrink-0 items-center justify-between px-5 py-5 md:px-8">
            <span className="text-[12px] tracking-[0.2em] text-white/60">
              <span className="text-white">{pad2(index + 1)}</span> / {pad2(items.length)}
            </span>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Закрыть просмотр"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-dark"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* image */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-3 md:px-16"
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
          >
            <button
              type="button"
              aria-label="Предыдущее изображение"
              onClick={onPrev}
              className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white transition-colors duration-300 hover:bg-white hover:text-dark md:left-5 md:h-14 md:w-14"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.figure
                key={item.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: EASE }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragStart={() => {
                  draggedRef.current = true;
                }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) onNext();
                  else if (info.offset.x > 60) onPrev();
                  window.setTimeout(() => {
                    draggedRef.current = false;
                  }, 0);
                }}
                onClick={() => {
                  if (draggedRef.current) return;
                }}
                className="flex max-h-full max-w-full flex-col items-center"
              >
                <OptimizedImage
                  src={item.src}
                  alt={item.alt}
                  aspect="aspect-auto h-[64vh] w-[min(88vw,900px)] md:h-[72vh]"
                  fit="contain"
                  className="max-w-full bg-transparent"
                  tone="dark"
                  priority
                  sizes="100vw"
                />
                <figcaption className="mt-5 max-w-xl px-4 text-center text-[13px] tracking-[0.04em] text-white/70">
                  {item.caption}
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <button
              type="button"
              aria-label="Следующее изображение"
              onClick={onNext}
              className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white transition-colors duration-300 hover:bg-white hover:text-dark md:right-5 md:h-14 md:w-14"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* footer hint */}
          <div className="shrink-0 px-5 pb-6 text-center text-[11px] uppercase tracking-[0.2em] text-white/55 md:px-8">
            ← → навигация · Esc закрыть
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
