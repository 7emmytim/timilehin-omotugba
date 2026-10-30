import Link from "next/link";
import { Document, Github, LinkedIn, Mail } from "@/icons";

const ICON = "h-[15px] w-[15px] flex-none";

const LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/timilehin-omotugba/",
    icon: <LinkedIn className={ICON} />,
  },
  {
    label: "GitHub",
    href: "https://github.com/7emmytim",
    icon: <Github className={ICON} />,
  },
  {
    label: "Email me",
    href: "mailto:omotugbatimilehin7@gmail.com",
    icon: <Mail className={ICON} />,
  },
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
        {/* Opens the PDF in a new tab until the résumé dialog lands. */}
        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-accent bg-accent px-3 py-2 font-mono text-xs font-medium text-accent-fg transition-[filter] hover:brightness-110"
        >
          <Document className={ICON} />
          View résumé
        </Link>

        {LINKS.map(({ label, href, icon }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-card-line bg-card px-3 py-2 font-mono text-xs text-fg transition-colors hover:border-accent hover:text-white"
          >
            {icon}
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
