import { TrendingDown } from "lucide-react";
import type { Project } from "../../types";

/* ── Mockups CSS por tipo de proyecto (sin imágenes) ─────────── */

const PRICE_BARS = [52, 74, 38, 61, 80, 45, 69];
const TASK_ROWS = [
  { label: "Envío 01 · Recepción", pct: 100 },
  { label: "Envío 02 · Observaciones", pct: 72 },
  { label: "Solicitudes adicionales", pct: 45 },
];
const AUDIT_ROWS = [
  { ok: true, text: "Periodo Q1 · completo" },
  { ok: false, text: "Periodo Q2 · faltan 3 campos" },
  { ok: true, text: "Periodo Q3 · consistente" },
  { ok: false, text: "Periodo Q4 · duplicado detectado" },
];

function VisualPrice() {
  return (
    <div aria-hidden="true" className="flex h-full flex-col justify-end gap-1.5 p-4">
      <p className="mb-1 text-left text-[11px] font-medium text-faint">
        Bajadas detectadas por tienda — semana actual
      </p>
      <div className="flex h-20 items-end gap-2 sm:h-24">
        {PRICE_BARS.map((h, i) => (
          <div key={i} className="relative flex-1" style={{ height: "100%" }}>
            <div
              className={`w-full rounded-t-sm ${
                i === 4 ? "bg-accent" : "bg-line dark:bg-card-2"
              }`}
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualTasks() {
  return (
    <div aria-hidden="true" className="flex h-full flex-col justify-center gap-3 p-4">
      {TASK_ROWS.map((row) => (
        <div key={row.label}>
          <p className="mb-1.5 text-left text-[11px] font-medium text-muted">
            {row.label}
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-line dark:bg-card-2">
            <div
              className={`h-full rounded-full ${
                row.pct === 100 ? "bg-accent" : "bg-faint/60"
              }`}
              style={{ width: `${row.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function VisualAudit() {
  return (
    <div aria-hidden="true" className="flex h-full flex-col justify-center gap-2 p-4">
      {AUDIT_ROWS.map((row) => (
        <p
          key={row.text}
          className={`truncate rounded-lg border px-3 py-2 font-mono text-[11px] ${
            row.ok
              ? "border-line bg-card text-muted"
              : "border-accent/40 bg-accent-soft text-ink sm:text-xs"
          }`}
        >
          {row.text}
        </p>
      ))}
    </div>
  );
}

const VISUALS = [VisualPrice, VisualTasks, VisualAudit] as const;

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const Visual = VISUALS[index % VISUALS.length];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-all duration-150 hover:-translate-y-0.5 hover:border-faint">
      {/* Mockup */}
      <div className="border-b border-line bg-bg/60 dark:bg-black/20">
        <Visual />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
          {project.tagline}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight sm:text-xl">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {/* Métrica destacada */}
        <p className="mt-4 inline-flex items-start gap-2 rounded-xl bg-accent-soft px-3.5 py-2.5 text-sm font-medium text-accent-text">
          <TrendingDown size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
          {project.metric}
        </p>

        {/* Stack */}
        <ul
          aria-label="Tecnologías usadas"
          className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4"
        >
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-line bg-card-2 px-3 py-1 text-xs font-medium text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
