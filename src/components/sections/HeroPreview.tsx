import { useEffect, useRef, useState } from "react";

/** Mini-dashboard construido en CSS puro — sin imágenes pesadas.
 *  Representa un panel Streamlit de monitoreo, el tipo de producto que entrego. */

const BARS = [
  { h: 42, alert: false },
  { h: 58, alert: false },
  { h: 35, alert: false },
  { h: 71, alert: true },
  { h: 64, alert: false },
  { h: 49, alert: false },
  { h: 82, alert: false },
  { h: 57, alert: false },
  { h: 38, alert: false },
  { h: 66, alert: true },
  { h: 45, alert: false },
  { h: 74, alert: false },
];

const KPIS = [
  { label: "Alertas hoy", value: "12" },
  { label: "Bajadas ≥ umbral", value: "38%" },
  { label: "Tiendas activas", value: "10" },
];

/** Fragmento de Stata como elemento visual (código en el hero). */
const CODE_LINES = [
  { prompt: true, text: 'use prices_cl.dta, clear' },
  { prompt: false, text: "preserve if week == `current'" },
  { prompt: false, text: 'gen bajada = (precio_ant - precio) / precio_ant' },
  { prompt: true, text: 'assert bajada >= .10 // umbral GPU', indented: true },
];

export function HeroPreview() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Dispara el crecimiento de las barras al entrar en viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Vista previa de un dashboard de monitoreo con indicadores, gráfico de barras y código Stata"
      className="relative rounded-2xl border border-line bg-card/90 p-4 shadow-xl shadow-black/10 backdrop-blur-sm sm:p-5 dark:shadow-black/30"
    >
      {/* Barra de título */}
      <div className="flex items-center justify-between pb-4">
        <div aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>
        <p aria-hidden="true" className="font-mono text-xs font-medium text-faint">
          monitoreo_precios · streamlit
        </p>
      </div>

      {/* KPIs */}
      <dl aria-hidden="true" className="mb-4 grid grid-cols-3 gap-2.5 sm:gap-3">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="rounded-xl bg-card-2 p-3">
            <dt className="text-[10px] font-medium uppercase tracking-wide text-faint sm:text-xs">
              {kpi.label}
            </dt>
            <dd className="mt-1 font-mono text-lg font-semibold text-accent-text sm:text-xl">
              {kpi.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Gráfico de barras */}
      <div aria-hidden="true" className="rounded-xl border border-line p-3.5">
        <p className="mb-3 font-mono text-xs font-medium text-muted">
          bajadas_por_categoria -- 4 semanas
        </p>
        <div className="flex h-28 items-end gap-1.5 sm:gap-2">
          {BARS.map((bar, i) => (
            <div key={i} className="relative flex-1">
              <div
                className={`w-full rounded-t ${mounted ? "animate-bar-grow" : ""} ${
                  bar.alert
                    ? "bg-gradient-to-t from-accent/70 to-accent"
                    : "bg-line dark:bg-card-2"
                }`}
                style={{
                  height: `${bar.h}%`,
                  animationDelay: `${i * 55}ms`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex items-center gap-4 font-mono text-[10px] text-faint sm:text-xs">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-line dark:bg-card-2" />
            semanas
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-accent" />
            umbral superado
          </span>
        </div>
      </div>

      {/* Código como elemento visual — JetBrains Mono + cursor vivo */}
      <pre aria-hidden="true" className="mt-4 overflow-x-auto rounded-xl border border-line bg-bg/60 p-3.5">
        {CODE_LINES.map((line, i) => (
          <div key={i} className={`font-mono text-[11px] leading-relaxed sm:text-xs ${line.indented ? "pl-4" : ""}`}>
            {line.prompt && (
              <span className="select-none text-accent-2-text">. </span>
            )}
            <span className={line.prompt ? "text-ink" : "text-muted"}>{line.text}</span>
            {i === CODE_LINES.length - 1 && (
              <span className="animate-caret ml-0.5 inline-block h-3 w-[7px] translate-y-[2px] bg-accent/80" />
            )}
          </div>
        ))}
      </pre>

      {/* Chip de estado */}
      <p
        aria-hidden="true"
        className="absolute -right-3 top-16 hidden rounded-full border border-line bg-card px-3 py-1.5 font-mono text-xs text-muted shadow-md sm:block dark:shadow-black/20"
      >
        ● actualizado hace 5 min
      </p>
    </div>
  );
}
