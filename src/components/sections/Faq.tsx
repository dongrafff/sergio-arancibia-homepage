import { faqItems } from "../../data/content";
import { Reveal } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { FaqAccordion } from "../ui/FaqAccordion";

export function Faq() {
  return (
    <Section id="preguntas" className="border-t border-line">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <SectionHeading
          titleId="preguntas-title"
          eyebrow="Preguntas"
          title={<>Lo que suelen preguntarme antes de empezar.</>}
          description="Si tu duda no está acá, escríbeme — respondo en menos de 24 horas hábiles."
        />
        <Reveal delay={100}>
          <FaqAccordion items={faqItems} />
        </Reveal>
      </div>
    </Section>
  );
}
