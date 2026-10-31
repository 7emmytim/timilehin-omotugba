// Captures each project's live site for the Selected work section.
//
//   yarn screenshots              all projects
//   yarn screenshots helpa-v2     one project, by its "image" name
//
// Needs Chromium once: npx playwright install chromium

import { readFile, rename, rm } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public/images");

// 1440 x 900 at 2x matches the size of the hand-made screenshots.
const VIEWPORT = { width: 1440, height: 900 };
const SCALE = 2;
const TIMEOUT_MS = 45_000;
// Time after the network goes quiet for fonts and entrance animations to finish.
const SETTLE_MS = 1_500;

/**
 * Per-site tweaks, keyed by the project's "image" name.
 * - skip: why this site's screenshot is kept by hand instead.
 * - hide: elements to remove before capturing, like chat buttons.
 */
const SITE_OPTIONS = {
  "africa-exchange": {
    skip: "its image server refuses automated browsers (403), so the logo and pictures come back broken. Update public/images/africa-exchange.png by hand.",
  },
  "helpa-v2": { hide: ['a[href^="https://wa.me"]'] },
};

const projects = JSON.parse(
  await readFile(path.join(ROOT, "src/data/projects.json"), "utf8"),
);

const only = process.argv[2];
const targets = only ? projects.filter((p) => p.image === only) : projects;

if (targets.length === 0) {
  const names = projects.map((p) => p.image).join(", ");
  console.error(`No project with image "${only}". Try one of: ${names}`);
  process.exit(1);
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: SCALE,
});

const failed = [];

for (const { name, image, url } of targets) {
  const { skip, hide = [] } = SITE_OPTIONS[image] ?? {};
  if (skip) {
    console.log(`– ${name} skipped: ${skip}`);
    continue;
  }

  const file = path.join(OUT_DIR, `${image}.png`);
  // Write beside the real file first, so a failed run never replaces a good
  // screenshot with a half-loaded one.
  const temp = `${file}.tmp.png`;
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: TIMEOUT_MS });
    if (hide.length > 0) {
      await page.addStyleTag({
        content: `${hide.join(", ")} { display: none !important; }`,
      });
    }
    await page.waitForTimeout(SETTLE_MS);
    await page.screenshot({ path: temp });
    await rename(temp, file);
    console.log(`✓ ${name} → public/images/${image}.png`);
  } catch (error) {
    await rm(temp, { force: true });
    failed.push(name);
    console.error(`✗ ${name} (${url}): ${error.message.split("\n")[0]}`);
  } finally {
    await page.close();
  }
}

await browser.close();

if (failed.length > 0) {
  console.error(`\nKept the old screenshot for: ${failed.join(", ")}`);
  process.exit(1);
}
