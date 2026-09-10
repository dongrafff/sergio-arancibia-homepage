import type { ReactNode } from "react";
import { Header } from "../components/sections/Header";
import { Footer } from "../components/sections/Footer";

/** Estructura global: skip link + header sticky + main + footer. */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-on-accent focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60]"
      >
        Saltar al contenido principal
      </a>
      <Header />
      <main id="contenido" className="focus:outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
