"""Verificaciones programáticas del tema AI Data Lab (sin depender de vision)."""
from playwright.sync_api import sync_playwright

URL = "http://localhost:4173/"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, color_scheme="dark")
    page = ctx.new_page()
    page.goto(URL, wait_until="networkidle")
    page.wait_for_timeout(2500)  # deja que el canvas dibuje varios fotogramas

    # 1) ¿El canvas de fondo realmente está dibujando (píxeles no vacíos)?
    canvas_stats = page.evaluate("""() => {
      const c = document.querySelector('canvas');
      if (!c) return {found: false};
      const ctx2 = c.getContext('2d');
      const d = ctx2.getImageData(0, 0, c.width, c.height).data;
      let nonEmpty = 0;
      for (let i = 3; i < d.length; i += 4) if (d[i] > 8) nonEmpty++;
      return {found: true, w: c.width, h: c.height,
              canvasPixelPct: +(nonEmpty / (c.width * c.height) * 100).toFixed(2)};
    }""")
    print("canvas:", canvas_stats)

    # ¿El canvas está detrás del contenido? (-z-10, fixed, pointer-events none)
    bg_style = page.evaluate("""() => {
      const c = document.querySelector('canvas');
      const wrap = c ? c.parentElement : null;
      return {fixed: wrap ? getComputedStyle(wrap).position : null,
              z: wrap ? getComputedStyle(wrap).zIndex : null,
              pe: wrap ? getComputedStyle(wrap).pointerEvents : null};
    }""")
    print("fondo:", bg_style)

    # 2) ¿Fuentes cargadas? (Inter + JetBrains Mono vía Google Fonts)
    fonts = page.evaluate("""() => {
      const loaded = [];
      for (const f of document.fonts) if (f.status === 'loaded') loaded.push(f.family);
      return [...new Set(loaded)].sort();
    }""")
    print("fuentes cargadas:", fonts)

    # 3) ¿Los tokens de la paleta están resueltos en oscuro y el acento es teal?
    colors = page.evaluate("""() => {
      const cs = getComputedStyle(document.documentElement);
      return {bg: cs.getPropertyValue('--bg').trim(), card: cs.getPropertyValue('--card').trim(),
              accent: cs.getPropertyValue('--accent').trim(), accent2: cs.getPropertyValue('--accent-2').trim()};
    }""")
    print("tokens dark:", colors)

    # 4) ¿El h1 usa Inter y los números de KPI usan JetBrains Mono?
    typo = page.evaluate("""() => {
      const h1 = document.querySelector('h1');
      const kpi = document.querySelector('[aria-label] dd'); // primer dd del dashboard (font-mono)
      return {h1: h1 ? getComputedStyle(h1).fontFamily : null,
              kpi: kpi ? getComputedStyle(kpi).fontFamily : null};
    }""")
    print("tipografías:", typo)

    # 5) Toggle a claro y verificar que los tokens cambian (versión fría)
    page.locator('button[aria-label*="modo" i], button[aria-label*="claro" i]').first.click()
    page.wait_for_timeout(1200)
    light_colors = page.evaluate("""() => {
      const cs = getComputedStyle(document.documentElement);
      return {bg: cs.getPropertyValue('--bg').trim(), accent: cs.getPropertyValue('--accent').trim()};
    }""")
    print("tokens light:", light_colors)

    browser.close()
