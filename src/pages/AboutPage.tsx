import PageHero from "@/components/PageHero";
import About from "@/components/About";
import CallToAction from "@/components/CallToAction";
import { siteData } from "@/data/siteData";
import usePageSeo from "@/hooks/usePageSeo";

export default function AboutPage() {
  usePageSeo({
    title: `${siteData.about.title} — ${siteData.master.name}`,
    path: "/about",
  });

  return (
    <>
      <PageHero
        eyebrow={siteData.master.role}
        title={siteData.about.title}
        description={siteData.master.description}
        breadcrumb="О мастере"
      />
      <About variant="full" />
      <CallToAction />
    </>
  );
}
