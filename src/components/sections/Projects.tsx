import { projects } from "../../data/content";
import { Reveal } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <Section id="proyectos" className="border-t border-line">
      <SectionHeading
        titleId="proyectos-title"
        eyebrow="Proyectos"
        title={<>Trabajo real, con resultados medibles.</>}
        description="Una selección de lo que construyo. Cada proyecto resolvió un problema concreto — no son demos."
      />

      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.title} delay={(i % 3) * 90}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
