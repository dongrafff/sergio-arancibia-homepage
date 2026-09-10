import { steps } from "../../data/content";
import { Reveal } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/SectionHeading";

export function HowItWorks() {
  return (
    <Section id="como-trabajo" className="border-t border-line bg-card-2/40">
      <SectionHeading
        titleId="como-trabajo-title"
        eyebrow="Cómo trabajo"
        title={<>Del archivo crudo a un panel que se actualiza solo.</>}
        description="Cuatro pasos, sin sorpresas. Sabes qué pasa con tus datos en cada uno."
      />

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={(i % 4) * 80}>
            <article className="relative h-full rounded-2xl border border-line bg-card p-6 transition-colors duration-150 hover:border-faint">
              {/* Número de paso */}
              <span
                aria-hidden="true"
                className="font-mono text-4xl font-semibold text-line dark:text-card-2 select-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="-mt-7 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
                <step.icon size={20} aria-hidden="true" strokeWidth={2.1} />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
