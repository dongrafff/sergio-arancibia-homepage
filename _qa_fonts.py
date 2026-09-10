from playwright.sync_api import sync_playwright
import pathlib, json
url = pathlib.Path(r"D:\Huaso_lalo\13 Homepage\offline\index.html").as_uri()
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page()
    pg.goto(url, wait_until="networkidle")
    faces = pg.evaluate("""async () => {
        await document.fonts.ready;
        return [...document.fonts].map(f => ({f: f.family, w: f.weight, s: f.style, st: f.status}));
    }""")
    print(json.dumps({"count": len(faces), "faces": faces}, indent=0))
    # force a 700 render to be sure it's visually there
    ok = pg.evaluate("""() => { const d=document.createElement('div'); d.style.cssText='font-family:Inter;font-weight:700'; d.textContent='X'; document.body.appendChild(d); return getComputedStyle(d).fontWeight; }""")
    print("computed weight 700 el:", ok)
    b.close()
