"""Verificación de la sección Trayectoria (experiencia + estudios desde LinkedIn)."""
from playwright.sync_api import sync_playwright

URL = "http://localhost:4173/"
OUT = r"D:\Huaso_lalo\13 Homepage\_qa"

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1280, "height": 900}, color_scheme="dark")
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(URL)
    page.wait_for_timeout(1500)

    # Navegación al ancla #trayectoria
    ok_anchor = page.evaluate("""() => {
      const el = document.querySelector('#trayectoria');
      if (!el) return 'falta sección';
      el.scrollIntoView();
      return 'ok';
    }""")
    print("ancla #trayectoria:", ok_anchor)

    # Contenido esperado desde LinkedIn
    text = page.evaluate("() => document.querySelector('#trayectoria').innerText")
    checks = [
        "Trayectoria",
        "Ministerio de Hacienda",
        "Jul 2014 — hoy",
        "Dirección de Presupuesto",
        "Ministerio de Energía Chile",
        "INE",
        "Magíster en Data Science",
        "Universidad del Desarrollo",
        "Diplomatura Big Data",
        "Bioestadística, Universidad de Chile",
        "Ingeniero en Estadística",
    ]
    missing = [c for c in checks if c not in text]
    print("falta en trayectoria:", missing or "ninguno")

    # Cronología: ¿5 puestos?
    n_exp = page.evaluate(
        "() => document.querySelectorAll('#trayectoria h3').length"
    )
    print("puestos de experiencia (h3):", n_exp)

    # Capturas
    page.wait_for_timeout(900)
    page.screenshot(path=OUT + r"\trajectory-dark.png")
    full = page.evaluate("() => document.documentElement.scrollHeight")
    page.set_viewport_size({"width": 1280, "height": min(full, 6553)})
    page.wait_for_timeout(400)
    page.screenshot(path=OUT + r"\desktop-full.png", full_page=True)

    # Modo claro de la sección
    ctx2 = browser.new_context(viewport={"width": 1280, "height": 900}, color_scheme="light")
    p2 = ctx2.new_page()
    p2.goto(URL)
    p2.wait_for_timeout(1200)
    p2.evaluate("() => document.querySelector('#trayectoria')?.scrollIntoView({block:'start'})")
    p2.wait_for_timeout(900)
    p2.screenshot(path=OUT + r"\trajectory-light.png")

    print("errores JS:", errors or "ninguno")
    browser.close()
print("OK _qa_traj.py")
