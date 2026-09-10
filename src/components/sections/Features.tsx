import { capabilities } from "../../data/content";
import { Reveal } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/SectionHeading";

export function Features() {
  return (
    <Section id="que-hago" className="border-t border-line">
      <SectionHeading
        titleId="que-hago-title"
        eyebrow="Qué hago"
        title={<>Cuatro cosas, hechas bien.</>}
        description="Sin paquetes inflados. Esto es exactamente lo que entrego cuando me pides ayuda con tus datos."
      />

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-5">
        {capabilities.map((cap, i) => (
          <Reveal as="li" key={cap.title} delay={(i % 2) * 90}>
            <article className="group h-full rounded-2xl border border-line bg-card p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-faint sm:p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-text transition-transform duration-150 group-hover:scale-105 motion-reduce:group-hover:scale-100">
                <cap.icon size={20} aria-hidden="true" strokeWidth={2.1} />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {cap.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                {cap.description}
              </p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
