/**
 * IMAGE PATHS — single source of truth.
 *
 * To replace an AI placeholder with a real photo, simply overwrite the file
 * with the SAME name and path in the `public/` folder (or upload it through
 * the hosting file manager). No React code has to be changed.
 *
 * See: public/images/README.md  (specs + generation prompts for every image)
 */

/**
 * Prefixes a public-folder path with the Vite base URL (`/` locally,
 * `/blackhair/` on GitHub Pages) so images resolve in any deployment.
 */
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const images = {
  master: {
    hero: asset("images/master/master-hero.jpg"),
    about: asset("images/master/master-about.jpg"),
  },

  services: {
    keratinBotox: asset("images/services/keratin-botox.jpg"),
    coldRepair: asset("images/services/cold-repair.jpg"),
    nanoplasty: asset("images/services/nanoplasty.jpg"),
  },

  gallery: [
    asset("images/gallery/work-01.jpg"),
    asset("images/gallery/work-02.jpg"),
    asset("images/gallery/work-03.jpg"),
    asset("images/gallery/work-04.jpg"),
    asset("images/gallery/work-05.jpg"),
    asset("images/gallery/work-06.jpg"),
    asset("images/gallery/work-07.jpg"),
    asset("images/gallery/work-08.jpg"),
    asset("images/gallery/work-09.jpg"),
    asset("images/gallery/work-10.jpg"),
    asset("images/gallery/work-11.jpg"),
    asset("images/gallery/work-12.jpg"),
  ],
} as const;

export type Images = typeof images;
