import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "../../utils/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  /** id del <h2>, para que la sección pueda usar aria-labelledby. */
  titleId?: string;
}

/** Encabezado consistente para todas las secciones. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
}: SectionHeadingProps) {
  return (
    <Reveal className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-text">
        {eyebrow}
      </p>
      <h2 id={titleId} className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      )}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-20 py-16 sm:py-24", className)}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}
