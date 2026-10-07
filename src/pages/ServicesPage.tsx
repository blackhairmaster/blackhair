import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import CallToAction from "@/components/CallToAction";
import { siteData } from "@/data/siteData";
import usePageSeo from "@/hooks/usePageSeo";

export default function ServicesPage() {
  usePageSeo({
    title: `Услуги — ${siteData.master.name}`,
    path: "/services",
  });

  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="Услуги и процедуры"
        description="Три основных направления работы с волосами. Длительность и стоимость уточняются индивидуально — они зависят от длины и плотности волос."
        breadcrumb="Услуги"
      />
      <Services variant="full" />
      <CallToAction />
    </>
  );
}
