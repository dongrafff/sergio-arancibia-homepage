# Captura referencias de diseño (portfolios data/estadísticos) + el nuestro actual.
import json
from pathlib import Path

OUT = Path(__file__).parent / "references"
OUT.mkdir(exist_ok=True)

SITES = [
    ("ref-yanholtz", "https://yan.holtz.com/", True),        # clásico data-viz oscuro, charts interactivos
    ("ref-danielvaszka", "https://danielvaszka.com/", True),  # Awwwards nominee, dashboard-style DS portfolio
    ("ref-mattdancho", "https://mattdancho.netlify.app/", False),  # portfoliodown/Raditian, académico limpio
]

from playwright.sync_api import sync_playwright

results = []
with sync_playwright() as pw:
    b = pw.chromium.launch(headless=True)
    page = b.new_page(viewport={"width": 1440, "height": 900},
                      user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                                 "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")
    for name, url, full in SITES:
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=45_000)
            page.wait_for_timeout(3500)  # dejar cargar animaciones/charts
            title = page.title()
            path = OUT / f"{name}.png"
            page.screenshot(path=str(path), full_page=full, timeout=20_000)
            results.append({"site": name, "ok": True, "title": title, "file": str(path)})
        except Exception as e:
            try:
                path = OUT / f"{name}.png"
                page.screenshot(path=str(path))
                results.append({"site": name, "ok": True, "title": page.title(),
                                "file": str(path), "note": f"fallback viewport tras {e}"})
            except Exception as e2:
                results.append({"site": name, "ok": False, "error": f"{e} / {e2}"})

    # el nuestro actual (solo viewport hero, para comparar 1:1)
    try:
        page.goto("http://127.0.0.1:4173", wait_until="networkidle", timeout=30_000)
        path = OUT / "actual-viewport.png"
        page.screenshot(path=str(path))
        results.append({"site": "nuestro-actual", "ok": True, "title": page.title(), "file": str(path)})
    except Exception as e:
        results.append({"site": "nuestro-actual", "ok": False, "error": str(e)})

    b.close()

print(json.dumps(results, ensure_ascii=False, indent=1))
