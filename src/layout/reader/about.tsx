import Link from "next/link";

const LINKS = [
  { label: "▤ View résumé", href: "/resume.pdf", primary: true },
  {
    label: "in LinkedIn",
    href: "https://www.linkedin.com/in/timilehin-omotugba/",
  },
  { label: "◇ GitHub", href: "https://github.com/7emmytim" },
  { label: "✉ Email me", href: "mailto:omotugbatimilehin7@gmail.com" },
];

export function About() {
  return (
    <section id="about" className="mb-11">
      <h1 className="m-0 mb-[7px] text-[clamp(30px,3.5vw,45px)] font-bold tracking-[-0.03em] text-balance text-white">
        Timilehin Omotugba
      </h1>
      <p className="m-0 mb-5 font-mono text-[13px] text-accent">
        Frontend Developer · Abuja, Nigeria
        <span className="caret" />
      </p>
      <p className="m-0 mb-[22px] max-w-[62ch] text-[16.5px] leading-[1.62] text-fg/85">
        I build responsive, performant interfaces with React, Next.js,
        TypeScript and Tailwind CSS. Four years shipping production frontends:
        a commodities trading platform, a multi-currency healthcare donation
        flow, and a grant management system for a national research institute.
      </p>

      <div className="flex flex-wrap gap-2.5">
        {LINKS.map(({ label, href, primary }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 font-mono text-xs transition-colors ${
              primary
                ? "border-accent bg-accent font-medium text-accent-fg hover:brightness-110"
                : "border-card-line bg-card text-fg hover:border-accent hover:text-white"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
