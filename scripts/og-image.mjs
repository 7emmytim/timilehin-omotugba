// Renders the link preview image from scripts/og-image.html.
//
//   yarn og-image
//
// Needs Chromium once: npx playwright install chromium

import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const ROOT = path.resolve(import.meta.dirname, "..");
const TEMPLATE = pathToFileURL(path.join(import.meta.dirname, "og-image.html"));
const OUT = path.join(ROOT, "public/og-image.png");

const browser = await chromium.launch();
// 1200 x 630 is what LinkedIn, X and WhatsApp expect for a large preview.
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

await page.goto(TEMPLATE.href, { waitUntil: "networkidle" });
// The fonts come from Google Fonts; capturing before they arrive would bake
// the fallback font into the image.
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: OUT });

await browser.close();
console.log("✓ public/og-image.png");
