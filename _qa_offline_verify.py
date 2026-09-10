from playwright.sync_api import sync_playwright
import pathlib, json, re

p = pathlib.Path(r"D:\Huaso_lalo\13 Homepage\offline\index.html")
url = p.as_uri()
out = {"requests": [], "errors": []}
with sync_playwright() as pw:
    b = pw.chromium.launch()
    pg = b.new_page(viewport={"width": 1280, "height": 900})
    pg.on("request", lambda r: out["requests"].append(r.url))
    pg.on("pageerror", lambda e: out["errors"].append(str(e)[:200]))
    pg.goto(url, wait_until="networkidle")

    # 1) every request must be local file:// (true offline proof)
    external = [u for u in set(out["requests"]) if not u.startswith("file:///")]
    out["external_requests"] = external

    # 2) fonts really loaded from base64?
    out["fonts"] = pg.evaluate("""() => {
        const check = (f, w) => document.fonts.check(`${w} 16px ${f}`);
        return {inter: check('Inter', '400'), inter700: check('Inter', '700'), jbm: check('JetBrains Mono', '400')};
    }""")

    # 3) content rendered in all sections?
    txt = pg.evaluate("() => document.body.innerText")
    for marker in ["Sergio Arancibia", "Trayectoria", "Proyectos", "Hablemos"]:
        out[f"has_{marker.split()[0].lower()}"] = marker in txt

    # 4) theme toggle works (no network involved)
    before = pg.evaluate("() => document.documentElement.className")
    pg.click('button[title*="Tema"], button[aria-label*="tema"], [data-theme-toggle]', timeout=3000, force=True) if pg.locator('[data-theme-toggle]').count() else None
    after = pg.evaluate("() => document.documentElement.className")
    out["theme_before/after"] = f"{before!r} -> {after!r}"

    # 5) scroll to bottom works (no lazy network content missing)
    pg.mouse.wheel(0, 20000); pg.wait_for_timeout(400)
    out["scrolled_height_ok"] = pg.evaluate("() => window.scrollY > 100")

    pg.screenshot(path=r"D:\Huaso_lalo\13 Homepage\_qa\offline_verify.png", full_page=True)
    b.close()

print(json.dumps(out, ensure_ascii=False, indent=1))
