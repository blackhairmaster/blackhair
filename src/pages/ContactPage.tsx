import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import { siteData } from "@/data/siteData";
import usePageSeo from "@/hooks/usePageSeo";

export default function ContactPage() {
  usePageSeo({
    title: `Контакты — ${siteData.master.name}`,
    path: "/contact",
  });

  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Связаться"
        description="Заполните форму или напишите удобным способом — отвечу в ближайшее время и предложу удобное время визита."
        breadcrumb="Контакты"
      />
      <Contact />
    </>
  );
}
