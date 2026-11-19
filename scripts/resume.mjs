// Prints the résumé to public/resume.pdf from the same data as the site:
// src/data/experiences.json for the roles, src/data/resume.json for the rest.
//
//   yarn resume
//
// Needs Chromium once: npx playwright install chromium

import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";
import { yearsInWords } from "../src/lib/career.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const TEMPLATE = pathToFileURL(path.join(import.meta.dirname, "resume.html"));
const OUT = path.join(ROOT, "public/resume.pdf");

const read = async (file) =>
  JSON.parse(await readFile(path.join(ROOT, "src/data", file), "utf8"));

const resume = await read("resume.json");
const experiences = await read("experiences.json");
resume.summary = resume.summary.replace("{years}", yearsInWords());

const browser = await chromium.launch();
// 794 x 1123 is A4 at 96 dpi, so the overflow check below measures the page
// the PDF will actually get.
const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });

await page.goto(TEMPLATE.href, { waitUntil: "networkidle" });

await page.evaluate(
  ({ resume, experiences }) => {
    const el = (tag, props = {}, children = []) => {
      const node = Object.assign(document.createElement(tag), props);
      node.append(...children);
      return node;
    };
    const byId = (id) => document.getElementById(id);

    byId("name").textContent = resume.name;
    byId("title").textContent = resume.title;
    byId("summary").textContent = resume.summary;

    byId("contact").append(
      ...resume.contact.map(({ label, href }) =>
        el("li", {}, [el("a", { href, textContent: label })]),
      ),
    );

    byId("experience").append(
      ...experiences.map(({ title, company, type, location, duration, highlights }) =>
        el("article", { className: "job" }, [
          el("div", { className: "head" }, [
            el("h3", {}, [title, el("span", { textContent: ` · ${company}` })]),
            el("span", { className: "when", textContent: duration }),
          ]),
          el("p", {
            className: "meta",
            textContent: [type, location].filter(Boolean).join(" · "),
          }),
          el("ul", {}, highlights.map((text) => el("li", { textContent: text }))),
        ]),
      ),
    );

    byId("skills").append(
      ...resume.skills.map(({ group, items }) =>
        el("p", {}, [el("b", { textContent: `${group}: ` }), items.join(", ")]),
      ),
    );

    byId("education").append(
      ...resume.education.map(({ degree, school, period }) =>
        el("article", { className: "job" }, [
          el("div", { className: "head" }, [
            el("h3", {}, [degree, el("span", { textContent: ` · ${school}` })]),
            el("span", { className: "when", textContent: period }),
          ]),
        ]),
      ),
    );
  },
  { resume, experiences },
);

// The fonts come from Google Fonts. Measuring or printing before they arrive
// would use the fallback font's widths and embed it in the PDF.
const overflow = await page.evaluate(async () => {
  await document.fonts.ready;
  const sheet = document.getElementById("page");
  return sheet.scrollHeight - sheet.clientHeight;
});

if (overflow > 0) {
  await browser.close();
  console.error(
    `✗ The résumé runs ${overflow}px past one A4 page. Shorten some highlights in src/data/experiences.json.`,
  );
  process.exit(1);
}

await page.pdf({ path: OUT, format: "A4", printBackground: true });
await browser.close();
console.log("✓ public/resume.pdf");
