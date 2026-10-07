import { siteData } from "@/data/siteData";
import SocialLinks from "./SocialLinks";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";

/** Contact section: heading, details, social links and the form. */
export default function Contact() {
  const details = [
    { label: "E-mail", value: siteData.contact.email, href: `mailto:${siteData.contact.email}` },
    { label: "Город", value: siteData.contact.city },
    { label: "Студия", value: siteData.contact.address },
    { label: "Часы работы", value: siteData.contact.schedule },
  ];

  return (
    <section id="contact" className="section border-t border-line" aria-labelledby="contact-title">
      <div className="page grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* ------------------------------------------------ left */}
        <div className="min-w-0">
          <Reveal className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-accent" />
            <span className="eyebrow">Контакты</span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 id="contact-title" className="display-lg mt-6 max-w-md text-primary">
              {siteData.contact.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="body-lg mt-6 max-w-md">{siteData.contact.text}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8">
              {details.map((detail) => (
                <div key={detail.label}>
                  <dt className="text-[10.5px] uppercase tracking-[0.18em] text-secondary">
                    {detail.label}
                  </dt>
                  <dd className="mt-2 text-[14.5px] text-primary">
                    {detail.href && !detail.value.startsWith("[") ? (
                      <a
                        href={detail.href}
                        className="border-b border-transparent transition-colors duration-300 hover:border-accent hover:text-accent"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <span className="eyebrow">Напишите мне</span>
            <SocialLinks className="mt-5" />
          </Reveal>
        </div>

        {/* ------------------------------------------------ right */}
        <Reveal delay={0.1} effect="scale" className="min-w-0 lg:pt-4">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
