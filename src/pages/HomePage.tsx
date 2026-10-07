import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import AboutPreview from "@/components/AboutPreview";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import CallToAction from "@/components/CallToAction";
import Contact from "@/components/Contact";
import usePageSeo from "@/hooks/usePageSeo";

/** Full landing page: Hero → Intro → About → Services → Gallery → CTA → Contact. */
export default function HomePage() {
  usePageSeo({ path: "/" });

  return (
    <>
      <Hero />
      <Intro />
      <AboutPreview />
      <Services variant="preview" />
      <Gallery variant="preview" />
      <CallToAction />
      <Contact />
    </>
  );
}
