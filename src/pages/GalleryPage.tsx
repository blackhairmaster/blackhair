import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import CallToAction from "@/components/CallToAction";
import { siteData } from "@/data/siteData";
import usePageSeo from "@/hooks/usePageSeo";

export default function GalleryPage() {
  usePageSeo({
    title: `Работы — ${siteData.master.name}`,
    path: "/gallery",
  });

  return (
    <>
      <PageHero
        eyebrow="Портфолио"
        title="Работы"
        description="Примеры работ: разная длина, цвет и текстура. Нажмите на фотографию, чтобы рассмотреть детали в полном размере."
        breadcrumb="Галерея"
      />
      <Gallery variant="page" />
      <CallToAction />
    </>
  );
}
