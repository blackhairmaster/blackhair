import { siteData } from "@/data/siteData";
import Reveal, { RevealText } from "./Reveal";

/** Editorial statement between Hero and About. */
export default function Intro() {
  return (
    <section className="border-y border-line bg-surface/60" aria-label="Вступление">
      <div className="page section grid gap-10 lg:grid-cols-[0.3fr_0.7fr] lg:gap-16">
        <Reveal className="flex items-start gap-4 lg:pt-3">
          <span aria-hidden="true" className="mt-3 h-px w-10 bg-accent" />
          <span className="eyebrow">Подход</span>
        </Reveal>

        <div className="min-w-0">
          <p className="font-display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.28] tracking-[-0.01em] text-primary">
            <RevealText text={siteData.intro.text} />
          </p>

          <Reveal delay={0.2} className="mt-8 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-10 w-px bg-[linear-gradient(to_bottom,var(--color-accent),transparent)]"
            />
            <span className="text-[11px] uppercase tracking-[0.22em] text-secondary">
              {siteData.master.name} — {siteData.master.city}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
