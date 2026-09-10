import { ArrowRight, GraduationCap, MapPin } from "lucide-react";
import { hero, site } from "../../data/content";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { HeroPreview } from "./HeroPreview";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* El fondo global (red neuronal) ya aporta la textura; aquí solo el marco */}

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-28 lg:pt-24">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 font-mono text-xs text-muted sm:text-[13px]">
              <span
                aria-hidden="true"
                className="relative flex h-2 w-2"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {hero.badge}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-title"
              className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
            >
              {hero.titleLine1}{" "}
              <span className="bg-gradient-to-r from-accent-text to-accent-2-text bg-clip-text text-transparent">
                {hero.titleHighlight}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={hero.ctaPrimary.href} size="lg">
                {hero.ctaPrimary.label}
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
              <Button href={hero.ctaSecondary.href} variant="secondary" size="lg">
                {hero.ctaSecondary.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-6 space-y-1.5 text-sm">
              <p className="flex items-center gap-1.5 text-faint">
                <MapPin size={14} aria-hidden="true" />
                {site.location} · trabajo remoto con toda Latinoamérica
              </p>
              <p className="flex items-center gap-1.5 font-mono text-[0.8rem] text-muted/90 sm:text-xs">
                <GraduationCap size={14} aria-hidden="true" />
                {site.credentials}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <HeroPreview />
        </Reveal>
      </div>
    </section>
  );
}
