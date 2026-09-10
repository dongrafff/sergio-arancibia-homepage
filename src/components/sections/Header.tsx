import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { navItems, hero, site } from "../../data/content";
import { useTheme } from "../../hooks/use-theme";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
      }
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-card-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {theme === "dark" ? (
        <Sun size={17} aria-hidden="true" />
      ) : (
        <Moon size={16} aria-hidden="true" />
      )}
    </button>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Cierra el menú móvil con Escape y al redimensionar a desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const nav = (mobile: boolean) =>
    navItems.map((item) => (
      <a
        key={item.href}
        href={item.href}
        onClick={() => setMenuOpen(false)}
        className={cn(
          "rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          mobile
            ? "block px-3 py-3 text-base font-medium text-ink hover:bg-card-2"
            : "px-3 py-2 text-sm font-medium text-muted hover:text-ink",
        )}
      >
        {item.label}
      </a>
    ));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Navegación desktop */}
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">{nav(false)}</ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href={hero.ctaPrimary.href} variant="primary" className="hidden sm:inline-flex">
            Ver proyectos
          </Button>
          {/* Menú móvil */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-card-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
          >
            {menuOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Panel móvil */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Principal (móvil)"
          className="animate-menu-in border-t border-line bg-bg px-4 pb-5 pt-2 md:hidden"
        >
          <ul>{nav(true)}</ul>
          <div className="mt-3 flex items-center gap-3 border-t border-line px-3 pt-4">
            <Button href={hero.ctaPrimary.href} className="flex-1">
              Ver proyectos
            </Button>
            <span className="text-sm text-faint">{site.role}</span>
          </div>
        </nav>
      )}
    </header>
  );
}
