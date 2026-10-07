import { siteData } from "@/data/siteData";
import Button from "./Button";
import Reveal from "./Reveal";

/** Dark call-to-action band between Gallery and Contact. */
export default function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-dark text-white" aria-labelledby="cta-title">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(140,119,101,0.28)_0%,rgba(140,119,101,0)_70%)]"
      />

      <div className="page relative section flex flex-col items-center text-center">
        <Reveal className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-white/30" />
          <span className="eyebrow text-white/70">Запись</span>
          <span aria-hidden="true" className="h-px w-10 bg-white/30" />
        </Reveal>

        <Reveal delay={0.06}>
          <h2 id="cta-title" className="display-lg mt-7 max-w-3xl text-white">
            {siteData.cta.title}
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-white/70">
            {siteData.cta.text}
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button to="/contact" variant="solidLight">
            {siteData.cta.button}
          </Button>
          <Button to="/services" variant="light">
            Посмотреть услуги
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
