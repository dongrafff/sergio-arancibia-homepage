# Retry Yan Holtz con dominio correcto + re-captura si hace falta.
import json
from pathlib import Path

OUT = Path(__file__).parent / "references"
from playwright.sync_api import sync_playwright

with sync_playwright() as pw:
    b = pw.chromium.launch(headless=True)
    page = b.new_page(viewport={"width": 1440, "height": 900},
                      user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                                 "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")
    for name, url in [("ref-yanholtz", "https://yanholtz.com/")]:
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=45_000)
            page.wait_for_timeout(4000)
            p = OUT / f"{name}.png"
            page.screenshot(path=str(p), full_page=True, timeout=20_000)
            print(json.dumps({"site": name, "ok": True, "title": page.title(), "file": str(p)}))
        except Exception as e:
            try:
                p = OUT / f"{name}.png"
                page.screenshot(path=str(p))
                print(json.dumps({"site": name, "ok": True, "title": page.title(),
                                  "file": str(p), "note": str(e)[:120]}))
            except Exception as e2:
                print(json.dumps({"site": name, "ok": False, "error": str(e2)[:150]}))
    b.close()
