import Link from "next/link";
import { Block, SectionHeading } from "./section";

const CHANNELS = [
  {
    label: "Email",
    value: "omotugbatimilehin7@gmail.com",
    href: "mailto:omotugbatimilehin7@gmail.com",
  },
  { label: "Phone", value: "+234 916 406 2040", href: "tel:+2349164062040" },
  {
    label: "LinkedIn",
    value: "/in/timilehin-omotugba",
    href: "https://www.linkedin.com/in/timilehin-omotugba/",
  },
  { label: "GitHub", value: "/7emmytim", href: "https://github.com/7emmytim" },
];

export function Contact() {
  return (
    <Block id="contact">
      <SectionHeading>Contact</SectionHeading>

      <p className="m-0 mb-5 max-w-[58ch] text-[15px] leading-[1.6] text-fg/75">
        Open to frontend roles, full-time or contract, remote or Abuja-based.
        The fastest way to reach me is email.
      </p>

      <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3">
        {CHANNELS.map(({ label, value, href }) => (
          <div
            key={label}
            className="rounded-lg border border-card-line bg-card px-4 py-3.5"
          >
            <dt className="mb-1.5 font-mono text-[10.5px] tracking-[0.12em] uppercase text-mute">
              {label}
            </dt>
            <dd className="m-0">
              <Link
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-mono text-[13px] break-all text-accent hover:text-white"
              >
                {value}
              </Link>
            </dd>
          </div>
        ))}
      </dl>
    </Block>
  );
}
