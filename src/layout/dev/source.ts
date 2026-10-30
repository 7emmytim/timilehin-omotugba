import experiences from "@/data/experiences.json";
import projects from "@/data/projects.json";
import { yearsShipping } from "@/lib";
import { t, type Line } from "./tokens";

const BLANK: Line = [];
const INDENT = "  ";

/** Splits a paragraph into sentences so each reads as one array entry. */
function sentences(text: string): string[] {
  return text
    .split(". ")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.endsWith(".") ? s : `${s}.`));
}

function stackLine(indent: string, skills: string[]): Line {
  const line: Line = [t.p(`${indent}stack: [`)];
  skills.forEach((skill, i) => {
    line.push(t.str(skill));
    if (i < skills.length - 1) line.push(t.p(", "));
  });
  line.push(t.p("],"));
  return line;
}

export type SourceSection = { id: string; lines: Line[] };

/**
 * The dev pane's source, built from the same JSON the reader pane uses, so
 * adding a role or project updates both views and neither can go stale.
 * Split into sections so the tabs and explorer can scroll to each "file".
 */
export function buildSource(): SourceSection[] {
  const intro: Line[] = [
    [t.com("/**")],
    [
      t.com(
        ` * Frontend Developer, Abuja NG. ${yearsShipping()}+ years shipping production React.`,
      ),
    ],
    [t.com(` * Currently at ${experiences[0].company}. Open to new work.`)],
    [t.com(" */")],
    BLANK,
    [
      t.kw("const"),
      t.p(" "),
      t.prop("timilehin"),
      t.p(": "),
      t.type("Developer"),
      t.p(" = {"),
    ],
    [t.p(`${INDENT}name: `), t.str("Timilehin Omotugba"), t.p(",")],
    [t.p(`${INDENT}role: `), t.str("Frontend Developer"), t.p(",")],
    [
      t.p(`${INDENT}location: `),
      t.str("Abuja, Nigeria"),
      t.p(", "),
      t.com("// remote-friendly"),
    ],
    [t.p(`${INDENT}yearsShipping: `), t.num(yearsShipping()), t.p(",")],
    [t.p(`${INDENT}available: `), t.lit("true"), t.p(",")],
    [t.p("};")],
  ];

  const experienceLines: Line[] = [
    BLANK,
    [t.com("// ── experience ──────────────────────────────────────────────")],
    [
      t.kw("export const"),
      t.p(" "),
      t.fn("experience"),
      t.p(": "),
      t.type("Role"),
      t.p("[] = ["),
    ],
  ];

  experiences.forEach(
    ({ company, title, type, location, duration, description, skills }) => {
      experienceLines.push([t.p(`${INDENT}{`)]);
      experienceLines.push([
        t.p(`${INDENT.repeat(2)}company: `),
        t.str(company),
        t.p(", title: "),
        t.str(title),
        t.p(","),
      ]);
      experienceLines.push([
        t.p(`${INDENT.repeat(2)}type: `),
        t.str(type),
        t.p(", location: "),
        t.str(location),
        t.p(","),
      ]);
      experienceLines.push([t.p(`${INDENT.repeat(2)}duration: `), t.str(duration), t.p(",")]);
      experienceLines.push([t.p(`${INDENT.repeat(2)}shipped: [`)]);
      sentences(description).forEach((sentence) => {
        experienceLines.push([t.p(INDENT.repeat(3)), t.str(sentence), t.p(",")]);
      });
      experienceLines.push([t.p(`${INDENT.repeat(2)}],`)]);
      experienceLines.push(stackLine(INDENT.repeat(2), skills));
      experienceLines.push([t.p(`${INDENT}},`)]);
    },
  );

  experienceLines.push([t.p("];")]);

  const projectLines: Line[] = [
    BLANK,
    [t.com("// ── projects ────────────────────────────────────────────────")],
    [t.kw("export const"), t.p(" "), t.fn("projects"), t.p(" = [")],
  ];

  projects.forEach(({ name, company, url }) => {
    projectLines.push([
      t.p(`${INDENT}{ name: `),
      t.str(name),
      t.p(", company: "),
      t.str(company),
      t.p(", url: "),
      t.str(url.replace(/^https?:\/\//, "").replace(/\/$/, ""), url),
      t.p(" },"),
    ]);
  });

  projectLines.push([t.p("];")]);
  projectLines.push(BLANK);
  projectLines.push([
    t.kw("export default"),
    t.p(" "),
    t.prop("timilehin"),
    t.p(";"),
  ]);

  return [
    { id: "file-timilehin", lines: intro },
    { id: "file-experience", lines: experienceLines },
    { id: "file-projects", lines: projectLines },
  ];
}
