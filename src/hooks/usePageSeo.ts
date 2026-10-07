import { useEffect } from "react";
import { siteData } from "@/data/siteData";

/**
 * Updates the document title / description / canonical for the current page.
 * Static SEO tags live in index.html — this keeps them in sync per route.
 */
export function usePageSeo(options?: { title?: string; description?: string; path?: string }) {
  const title = options?.title ?? siteData.seo.title;
  const description = options?.description ?? siteData.seo.description;
  const path = options?.path;

  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:type"]', "property", "og:type", "website");

    if (path) {
      const url = `${window.location.origin}${path}`;
      setMeta('meta[property="og:url"]', "property", "og:url", url);

      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }
  }, [title, description, path]);
}

export default usePageSeo;
