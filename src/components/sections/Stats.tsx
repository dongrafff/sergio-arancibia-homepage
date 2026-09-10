import { stats } from "../../data/content";
import { Reveal } from "../ui/Reveal";

/** Franja de métricas — prueba social discreta, sin testimonios inventados. */
export function Stats() {
  return (
    <section aria-label="Cifras del trabajo" className="border-t border-line bg-card-2/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-4 py-14 sm:px-6 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={(i % 4) * 80}>
            <div className="text-center lg:text-left">
              <p className="font-mono text-4xl font-semibold tracking-tight text-accent-text sm:text-[2.75rem]">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm leading-snug text-muted">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
