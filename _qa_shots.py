"""Screenshots de la homepage (verificación visual) — tema AI Data Lab."""
from playwright.sync_api import sync_playwright

URL = "http://localhost:4173/"
OUT = r"D:\Huaso_lalo\13 Homepage\_qa"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # Desktop completo en OSCURO (default del diseño AI Data Lab) + errores JS
    ctx = browser.new_context(
        viewport={"width": 1440, "height": 900},
        device_scale_factor=2,
        color_scheme="dark",
    )
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(URL, wait_until="networkidle")
    page.wait_for_timeout(1500)  # deja que entren las animaciones de reveal
    print("desktop title:", page.title())
    print("html classes:", page.evaluate("document.documentElement.className"))
    page.screenshot(path=f"{OUT}/desktop-full.png", full_page=True)

    # Menú móvil abierto (header), en oscuro
    mctx = browser.new_context(
        viewport={"width": 390, "height": 844},
        device_scale_factor=2,
        is_mobile=True,
        has_touch=True,
        color_scheme="dark",
    )
    mp = mctx.new_page()
    mp.goto(URL, wait_until="networkidle")
    mp.wait_for_timeout(1500)
    overflow = mp.evaluate(
        "document.documentElement.scrollWidth - document.documentElement.clientWidth"
    )
    print("mobile horizontal overflow (px):", overflow)
    mp.screenshot(path=f"{OUT}/mobile-full.png", full_page=True)

    burger = mp.locator('button[aria-label*="men" i], button[aria-label*="nav" i]')
    if burger.count():
        burger.first.click()
        mp.wait_for_timeout(500)
        mp.screenshot(path=f"{OUT}/mobile-menu.png")
        print("menu móvil: OK (abierto)")
    else:
        print("menú móvil: botón no encontrado por aria-label")

    # Hero oscuro (primer viewport, con red neuronal + dashboard vivo)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(600)
    page.screenshot(path=f"{OUT}/desktop-dark.png")

    # Modo CLARO: togglear y capturar hero para comparar la versión fría
    toggles = page.locator('button[aria-label*="modo" i], button[aria-label*="claro" i]')
    if toggles.count():
        toggles.first.click()
        page.wait_for_timeout(900)  # deja que NeuralBackground relea colores
        print("html classes (post-toggle):", page.evaluate("document.documentElement.className"))
        page.screenshot(path=f"{OUT}/desktop-light.png")

    browser.close()

print("JS errors en desktop:", errors if errors else "ninguno")
