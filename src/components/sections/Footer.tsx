import { navItems, site, footer } from "../../data/content";
import { Logo } from "../ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-[1.4fr_1fr_1fr] sm:px-6">
        {/* Marca */}
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {footer.blurb}
          </p>
        </div>

        {/* Navegación */}
        <nav aria-label="Secciones (pie de página)">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
            {footer.navHeading}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contacto"
                className="rounded text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        {/* Contacto */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
            {footer.contactHeading}
          </h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="rounded text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {site.emailDisplay}
              </a>
            </li>
            <li className="text-sm text-faint">{site.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-faint sm:px-6">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
