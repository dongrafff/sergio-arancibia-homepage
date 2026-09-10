from playwright.sync_api import sync_playwright
import pathlib, json

p = pathlib.Path(r"D:\Huaso_lalo\13 Homepage\offline\index.html")
url = p.as_uri()
print("URL:", url)
out = {"console": [], "pageerrors": [], "failed_requests": []}
with sync_playwright() as pw:
    b = pw.chromium.launch()
    pg = b.new_page()
    pg.on("console", lambda m: out["console"].append(f"[{m.type}] {m.text[:200]}"))
    pg.on("pageerror", lambda e: out["pageerrors"].append(str(e)[:300]))
    pg.on("requestfailed", lambda r: out["failed_requests"].append(f"{r.url[:150]} :: {r.failure}"))
    resp = pg.goto(url, wait_until="networkidle")
    print("status:", resp.status if resp else None)
    # check if app mounted
    root_text = pg.eval_on_selector("#root", "el => el.innerText.slice(0,120)")
    out["root_mounted"] = len(root_text.strip()) > 20
    print(json.dumps(out, ensure_ascii=False, indent=1)[:3000])
    b.close()
