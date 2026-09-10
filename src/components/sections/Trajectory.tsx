import { GraduationCap } from "lucide-react";
import { education, experience } from "../../data/content";
import { Reveal } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/SectionHeading";

export function Trajectory() {
  return (
    <Section id="trayectoria" className="border-t border-line">
      <SectionHeading
        titleId="trayectoria-title"
        eyebrow="Trayectoria"
        title={<>Años de datos, en el sector público y más allá.</>}
        description="Ingeniero estadístico con dos magísteres (Bioestadística y Data Science) y una trayectoria construyendo información confiable para la toma de decisiones."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-8">
        {/* Experiencia */}
        <Reveal>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
            Experiencia
          </h3>
          <ol className="mt-6 space-y-0">
            {experience.map((item, i) => (
              <li key={`${item.title}-${item.period}`} className="relative pl-8 pb-9 last:pb-0">
                {/* Raíla del timeline + nodo */}
                {i < experience.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-4 h-full w-px bg-line"
                  />
                )}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 ${
                    item.current
                      ? "border-accent bg-accent-soft"
                      : "border-faint bg-card"
                  }`}
                />

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="text-sm font-semibold text-ink sm:text-[0.95rem]">
                    {item.title} ·{" "}
                    <span className="font-medium text-muted">{item.org}</span>
                  </p>
                </div>
                <p className="mt-1 flex items-center gap-2 font-mono text-xs text-faint">
                  {item.period}
                  {item.current && (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 font-sans text-[0.68rem] font-semibold tracking-wide text-accent-text">
                      Actualmente
                    </span>
                  )}
                </p>
                {item.description && (
                  <p className="mt-2.5 max-w-prose text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Formación */}
        <Reveal delay={120}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
            Formación
          </h3>
          <ul className="mt-6 space-y-3">
            {education.map((item) => (
              <li
                key={`${item.degree}-${item.years}`}
                className="group rounded-2xl border border-line bg-card p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-faint"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-text transition-transform duration-150 group-hover:scale-105 motion-reduce:group-hover:scale-100">
                    <GraduationCap size={17} aria-hidden="true" strokeWidth={2.1} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug text-ink">
                      {item.degree}
                    </p>
                    <p className="mt-1 text-[0.83rem] text-muted">{item.school}</p>
                    <p className="mt-1.5 font-mono text-xs text-faint">{item.years}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
