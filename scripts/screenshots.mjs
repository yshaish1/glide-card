// Regenerates the README images: `npm run shots` (needs ffmpeg for the GIFs).
// Renders playground/shots.html compositions with the mock HA and writes them to docs/images/.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";
import { createServer } from "vite";

const OUT = "docs/images";
const only = process.argv.slice(2);
const want = (name) => !only.length || only.includes(name);

const PNGS = [
  ["hero-dark"], ["hero-light"], ["rtl"], ["button"], ["covers"], ["covers-night", "sun=night"], ["climate"], ["media"], ["chips"], ["nav"], ["sizes"], ["popup", "", true], ["popup-light", "", true],
];

mkdirSync(OUT, { recursive: true });
const server = await createServer({ server: { port: 5299, strictPort: true }, logLevel: "error" });
await server.listen();
const base = "http://localhost:5299/playground/shots.html";
const browser = await chromium.launch();

/** PNG -> WebP (keeps transparency) using Chromium's encoder; about a tenth of the size. */
async function saveWebp(page, png, name) {
  const b64 = await page.evaluate(async (src) => {
    const img = new Image();
    img.src = `data:image/png;base64,${src}`;
    await img.decode();
    const c = Object.assign(document.createElement("canvas"), { width: img.naturalWidth, height: img.naturalHeight });
    c.getContext("2d").drawImage(img, 0, 0);
    return c.toDataURL("image/webp", 0.88).split(",")[1];
  }, png.toString("base64"));
  writeFileSync(`${OUT}/${name}.webp`, Buffer.from(b64, "base64"));
}

const open = async (page, shot, query = "") => {
  await page.goto(`${base}?shot=${shot}${query ? `&${query}` : ""}`);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
};

for (const [shot, query, popup] of PNGS) {
  if (!want(shot)) continue;
  const page = await browser.newPage({ viewport: popup ? { width: 390, height: 800 } : { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
  await open(page, shot, query);
  if (shot === "nav") {
    await page.evaluate(() => window.openMenus());
    await page.waitForTimeout(700);
  }
  if (popup) {
    await page.evaluate(() => window.openPopup("#lights"));
    await page.waitForTimeout(1200);
    await saveWebp(page, await page.screenshot(), shot);
  } else {
    await saveWebp(page, await page.locator("#stage").screenshot({ omitBackground: true }), shot);
  }
  console.log("image", shot);
  await page.close();
}

/** Records the page while `script` runs, then turns the clip into a palette-optimised GIF. */
async function gif(name, shot, size, script, { query = "", dark = false, width = size.width, fps = 20 } = {}) {
  if (!want(name)) return;
  const dir = mkdtempSync(join(tmpdir(), "glide-gif-"));
  const ctx = await browser.newContext({ viewport: size, recordVideo: { dir, size } });
  const page = await ctx.newPage();
  const t0 = Date.now();
  await open(page, shot, query);
  await page.evaluate((dark) => document.body.classList.add("solid", ...(dark ? ["dark"] : [])), dark);
  await page.waitForTimeout(300);
  const start = (Date.now() - t0) / 1000;
  await script(page);
  const end = (Date.now() - t0) / 1000;
  await ctx.close();
  const video = join(dir, readdirSync(dir).find((f) => f.endsWith(".webm")));
  const filter = `fps=${fps},scale=${width}:-1:flags=lanczos,split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4`;
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", String(start), "-t", String(end - start), "-i", video, "-vf", filter, "-loop", "0", `${OUT}/${name}.gif`]);
  rmSync(dir, { recursive: true, force: true });
  console.log("gif", name);
}

const steps = async (page, id, from, to, ms = 900) => {
  const n = 12;
  for (let i = 1; i <= n; i++) {
    await page.evaluate(([id, v]) => window.setCover(id, v), [id, Math.round(from + ((to - from) * i) / n)]);
    await page.waitForTimeout(ms / n);
  }
};

await gif("covers", "gif-covers", { width: 496, height: 296 }, async (page) => {
  await steps(page, "cover.blinds", 40, 100);
  await steps(page, "cover.blinds", 100, 10);
  await page.waitForTimeout(300);
  await steps(page, "cover.curtains", 55, 100);
  await steps(page, "cover.curtains", 100, 0);
  await page.waitForTimeout(300);
  await steps(page, "cover.blinds", 10, 40, 600);
  await steps(page, "cover.curtains", 0, 55, 600);
  await page.waitForTimeout(600);
});

/** All eight cover styles travelling together, reported in steps like a real motor (the card glides between them). */
const STYLE_IDS = ["blind", "bottom_up", "roman", "venetian", "shutter", "curtain", "curtain_side", "vertical"].map((s) => `cover.style_${s}`);
const travel = async (page, from, to, n = 8, ms = 260) => {
  for (let i = 1; i <= n; i++) {
    const pos = Math.round(from + ((to - from) * i) / n);
    await page.evaluate(([ids, pos, opening, moving]) => ids.forEach((id) => window.moveCover(id, pos, opening, moving)), [STYLE_IDS, pos, to > from, i < n]);
    await page.waitForTimeout(ms);
  }
};
await gif("cover-styles", "gif-styles", { width: 916, height: 340 }, async (page) => {
  await page.waitForTimeout(400);
  await travel(page, 45, 100);
  await page.waitForTimeout(500);
  await travel(page, 100, 0, 10);
  await page.waitForTimeout(500);
  await travel(page, 0, 45, 6);
  await page.waitForTimeout(700);
}, { dark: true, width: 640, fps: 15 });

await gif("popup", "popup", { width: 390, height: 800 }, async (page) => {
  await page.waitForTimeout(700);
  const box = await page.locator("glide-card").nth(3).boundingBox();
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(2200);
  await page.evaluate(() => window.closePopup());
  await page.waitForTimeout(1100);
}, { dark: true, width: 300, fps: 15 });

await gif("tap", "gif-tap", { width: 496, height: 296 }, async (page) => {
  const tiles = page.locator("glide-card");
  for (let round = 0; round < 2; round++) {
    for (let i = 0; i < 4; i++) {
      const b = await tiles.nth(i).boundingBox();
      await page.mouse.click(b.x + b.width * 0.55, b.y + b.height * 0.5);
      await page.waitForTimeout(750);
    }
  }
}, { dark: true });

await browser.close();
await server.close();
