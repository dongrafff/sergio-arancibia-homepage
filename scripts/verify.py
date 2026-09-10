# Verificación visual/DOM del portafolio (etapa 11, idea.md §15).
# Uso: python verify.py  -> imprime JSON de resultados y guarda screenshots.
import json
from pathlib import Path

from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:4173"
OUT = Path(__file__).parent / "verify_out"
OUT.mkdir(exist_ok=True)

SECTIONS = ["que-hago", "proyectos", "como-trabajo", "preguntas", "contacto"]


def probe(page):
    """Extrae el estado clave del DOM para validar la página."""
    return page.evaluate(
        """() => {
            const ids = %s;
            const sections = {};
            for (const id of ids) sections[id] = !!document.getElementById(id);
            const links = [...document.querySelectorAll('a')];
            const mailtos = links.filter(a => a.href.startsWith('mailto:')).length;
            return {
                title: document.title,
                metaDescription: !!document.querySelector('meta[name="description"]'),
                fonts: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family),
                darkClass: document.documentElement.classList.contains('dark'),
                sections,
                h1Count: document.querySelectorAll('h1').length,
                h2Count: document.querySelectorAll('h2').length,
                navAnchorLinks: links.filter(a => a.getAttribute('href')?.startsWith('#'))
                                      .map(a => a.getAttribute('href')),
                mailtoCount: mailtos,
                skipLink: !!document.querySelector('a[href="#contenido"]'),
                mainElement: !!document.querySelector('main'),
                footerNavAria: !!document.querySelector('footer nav[aria-label]'),
            };
        }""" % json.dumps(SECTIONS)
    )


def check(name, page):
    data = probe(page)
    errors = []
    if not all(data["sections"].values()):
        missing = [k for k, v in data["sections"].items() if not v]
        errors.append(f"secciones faltantes: {missing}")
    if data["h1Count"] != 1:
        errors.append(f"h1 count={data['h1Count']} (debe ser 1)")
    if data["mailtoCount"] < 2:
        errors.append(f"mailto links={data['mailtoCount']} (esperaba >=2: footer+contacto)")
    if not data["metaDescription"]:
        errors.append("falta meta description")
    if "Inter" not in "".join(data["fonts"]) and "Fraunces" not in "".join(data["fonts"]):
        errors.append(f"fuentes no cargadas: {data['fonts']}")
    if not data["mainElement"]:
        errors.append("falta <main>")
    return {"name": name, **{k: data[k] for k in (
        "title", "metaDescription", "darkClass", "sections",
        "h1Count", "h2Count", "mailtoCount", "skipLink", "footerNavAria")},
        "errors": errors}


with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=True)

    # 1) Desktop claro (default sin localStorage)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(URL, wait_until="networkidle")
    r_desktop_light = check("desktop-claro", page)
    page.screenshot(path=str(OUT / "desktop-light.png"), full_page=True)

    # 2) Desktop oscuro: forzar tema con el toggle real (aria-label "Cambiar a modo ...")
    was_dark = r_desktop_light["darkClass"]
    toggle = page.locator('button[aria-label*="modo"]').first
    if toggle.count():
        toggle.click()
        page.wait_for_timeout(300)
    r_desktop_dark = check("desktop-oscuro", page)
    # el dark class debe haber flipado respecto al estado inicial (ThemeProvider + <html class>)
    if r_desktop_dark["darkClass"] == was_dark:
        r_desktop_dark.setdefault("errors", []).append(
            f"toggle no cambió tema (dark antes={was_dark}, después={r_desktop_dark['darkClass']})"
        )
    page.screenshot(path=str(OUT / "desktop-dark.png"), full_page=True)

    # 3) Mobile 390px: nav colapsada, sin overflow horizontal
    mpage = browser.new_page(viewport={"width": 390, "height": 844})
    mpage.goto(URL, wait_until="networkidle")
    r_mobile = check("mobile-390", mpage)
    overflow = mpage.evaluate(
        "() => document.documentElement.scrollWidth - document.documentElement.clientWidth"
    )
    if overflow > 1:
        r_mobile["errors"].append(f"overflow horizontal {overflow}px en mobile")
    # menú móvil: botón hamburguesa visible y funcional (abre y cierra)
    burger = mpage.locator('header button[aria-expanded]').first
    burger_ok = False
    if burger.count():
        before = burger.get_attribute("aria-expanded")
        burger.click()
        mpage.wait_for_timeout(250)
        after = burger.get_attribute("aria-expanded")
        r_mobile["navLinksDesktopVisibles"] = (
            mpage.locator('header nav a[href^="#"]').first.is_visible() if before == "false" else None
        )
        burger_ok = before != after
        # con menú abierto, los enlaces deben ser clickeables; ir a #proyectos y cerrar
        link = mpage.locator('a[href="#proyectos"]').last
        if link.count():
            link.click()
            mpage.wait_for_timeout(400)
            r_mobile["navLinkFunciona"] = (
                mpage.evaluate("() => document.getElementById('proyectos').getBoundingClientRect().top") < 250
            )
    r_mobile["hamburguesaToggleAriaExpanded"] = burger_ok
    if not burger.count():
        r_mobile["errors"].append("no hay botón de menú móvil con aria-expanded")
    mpage.screenshot(path=str(OUT / "mobile-light.png"), full_page=True)

    # 4) prefers-reduced-motion: animaciones desactivadas (comprobación CSS)
    pm = browser.new_page(viewport={"width": 1440, "height": 900},
                          reduced_motion="reduce")
    pm.goto(URL, wait_until="networkidle")
    r_reduced = {
        "name": "reduced-motion",
        # Con prefers-reduced-motion: reduce, [data-reveal] debe quedar estático (transition none)
        "revealEstado": pm.evaluate(
            """() => {
                const el = document.querySelector('[data-reveal]');
                if (!el) return 'sin-elementos-[data-reveal]';
                const cs = getComputedStyle(el);
                return `opacity:${cs.opacity} transition:${cs.transitionDuration}`;
            }"""
        ),
    }

    # 5) Focus visible: Tab por la ruta de foco y registrar outline + box-shadow (ring Tailwind v4)
    focus_page = browser.new_page(viewport={"width": 1440, "height": 900})
    focus_page.goto(URL, wait_until="networkidle")
    focus_trail = []
    for _ in range(5):
        focus_page.keyboard.press("Tab")
        info = focus_page.evaluate(
            """() => {
                const el = document.activeElement;
                if (!el || el === document.body) return 'sin-focus';
                const cs = getComputedStyle(el);
                const ring = cs.boxShadow && cs.boxShadow !== 'none' ? 'ring:si' : '';
                return `${(el.getAttribute('aria-label') || el.textContent || '').slice(0, 24)} outline:${cs.outlineStyle} ${cs.outlineWidth} ${ring}`;
            }"""
        )
        focus_trail.append(info)
    r_focus = {
        "name": "focus-visible",
        "rutaFoco": focus_trail,
    }

    browser.close()

result = {
    "checks": [r_desktop_light, r_desktop_dark, r_mobile, r_reduced, r_focus],
    "screenshots": sorted(p.name for p in OUT.glob("*.png")),
}
print(json.dumps(result, ensure_ascii=False, indent=2))
failed = [c["name"] for c in result["checks"] if isinstance(c.get("errors"), list) and c["errors"]]
print(f"\nRESULTADO: {'FALLOS en ' + ','.join(failed) if failed else 'TODO OK'}")
