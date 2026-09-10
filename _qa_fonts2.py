from playwright.sync_api import sync_playwright
import pathlib, json
url = pathlib.Path(r"D:\Huaso_lalo\13 Homepage\offline\index.html").as_uri()
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={"width":1280,"height":900})
    pg.goto(url, wait_until="networkidle")
    # does the page itself use 700 anywhere?
    uses700 = pg.evaluate("""() => {
        let n = 0;
        for (const el of document.querySelectorAll('h1,h2,h3,strong,b,[class*=font-bold]')) {
            if (getComputedStyle(el).fontWeight === '700') n++;
        }
        return n;
    }""")
    print("page elements rendered at 700:", uses700)
    # force a real 700 render and wait for load
    res = pg.evaluate("""async () => {
        const d = document.createElement('div');
        d.style.cssText = 'font-family:Inter,sans-serif;font-weight:700;position:absolute;top:0;left:0';
        d.textContent = 'Prueba negrita 700 ✓';
        document.body.appendChild(d);
        await new Promise(r => setTimeout(r, 800));
        const face = [...document.fonts].find(f => f.family==='Inter' && f.weight==='700' && f.status==='loaded');
        return {inter700_loaded_after_render: !!face};
    }""")
    print(json.dumps(res))
    # visual check of hero in both themes
    pg.evaluate("() => document.documentElement.classList.replace('light','dark')")
    pg.wait_for_timeout(300)
    pg.screenshot(path=r"D:\Huaso_lalo\13 Homepage\_qa\offline_dark.png")
    b.close()
