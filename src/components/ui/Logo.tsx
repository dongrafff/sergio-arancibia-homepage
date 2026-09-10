import { BarChart3 } from "lucide-react";
import { site } from "../../data/content";
import { cn } from "../../utils/cn";

/** Monograma de barras — el mismo que el favicon. */
export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label={`${site.name} — ir al inicio`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-on-accent transition-transform duration-150 group-hover:-translate-y-px"
      >
        <BarChart3 size={17} strokeWidth={2.4} />
      </span>
      <span className="hidden font-display text-base font-semibold tracking-tight sm:inline">
        {site.name}
      </span>
    </a>
  );
}
