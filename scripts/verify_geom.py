# Verificación geométrica final: overflow desktop + reveals al hacer scroll.
import json
from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:4173"

with sync_playwright() as pw:
    b = pw.chromium.launch(headless=True)
    page = b.new_page(viewport={"width": 1440, "height": 900})
    page.goto(URL, wait_until="networkidle")

    overflow_desktop = page.evaluate(
        "() => document.documentElement.scrollWidth - document.documentElement.clientWidth"
    )

    # Reveal al hacer scroll: antes del scroll hay pocos .is-in; tras bajar todo deben ser todos.
    before = page.evaluate("() => document.querySelectorAll('[data-reveal].is-in').length")
    total = page.evaluate("() => document.querySelectorAll('[data-reveal]').length")
    for i in range(1, 20):
        page.mouse.wheel(0, 700)
        page.wait_for_timeout(80)
    after = page.evaluate("() => document.querySelectorAll('[data-reveal].is-in').length")

    # HeroPreview: el mockup debe tener contenido (barras/puntos), no un div vacío.
    hero_bars = page.evaluate(
        """() => {
            const h1 = document.querySelector('h1');
            if (!h1) return 'sin-h1';
            const sec = h1.closest('section, header, div[class*="grid"]') || h1.parentElement;
            // buscar contenedores con varios hijos repetitivos (barras de mockup)
            let best = 0;
            document.querySelectorAll('div').forEach(d => {
                if (d.children.length >= 3 && d.children.length <= 12 &&
                    [...new Set([...d.children].map(c => c.tagName))].length === 1) {
                    best = Math.max(best, d.children.length);
                }
            });
            return `mockup-mas-grande-hijos:${best}`;
        }"""
    )

    b.close()

print(json.dumps({
    "overflowDesktop": overflow_desktop,
    "revealAntesScroll": before,
    "revealTrasScroll": after,
    "revealTotal": total,
    "heroMockup": hero_bars,
}, ensure_ascii=False))
