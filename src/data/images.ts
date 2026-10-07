/**
 * IMAGE PATHS — single source of truth.
 *
 * To replace an AI placeholder with a real photo, simply overwrite the file
 * with the SAME name and path in the `public/` folder (or upload it through
 * the hosting file manager). No React code has to be changed.
 *
 * See: public/images/README.md  (specs + generation prompts for every image)
 */

export const images = {
  master: {
    hero: "/images/master/master-hero.jpg",
    about: "/images/master/master-about.jpg",
  },

  services: {
    keratinBotox: "/images/services/keratin-botox.jpg",
    coldRepair: "/images/services/cold-repair.jpg",
    nanoplasty: "/images/services/nanoplasty.jpg",
  },

  gallery: [
    "/images/gallery/work-01.jpg",
    "/images/gallery/work-02.jpg",
    "/images/gallery/work-03.jpg",
    "/images/gallery/work-04.jpg",
    "/images/gallery/work-05.jpg",
    "/images/gallery/work-06.jpg",
    "/images/gallery/work-07.jpg",
    "/images/gallery/work-08.jpg",
    "/images/gallery/work-09.jpg",
    "/images/gallery/work-10.jpg",
    "/images/gallery/work-11.jpg",
    "/images/gallery/work-12.jpg",
  ],
} as const;

export type Images = typeof images;
