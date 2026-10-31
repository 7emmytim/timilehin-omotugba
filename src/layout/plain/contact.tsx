import Image from "next/image";
import Link from "next/link";
import { WRAP } from "./shared";

const CHANNELS = [
  { label: "+234 916 406 2040", href: "tel:+2349164062040" },
  {
    label: "LinkedIn ↗",
    href: "https://www.linkedin.com/in/timilehin-omotugba/",
  },
  { label: "GitHub ↗", href: "https://github.com/7emmytim" },
];

/**
 * The one dark block on the light page, in the editor's colours as a nod to
 * the code view. The photo lives here rather than in the hero: it adds warmth
 * where someone decides to get in touch. Phones skip it.
 */
export function Contact() {
  return (
    <div className={WRAP}>
      <section
        id="contact"
        className="mt-16 grid gap-5 rounded-[22px] bg-editor px-6 py-7 text-fg min-[860px]:mt-[clamp(72px,10vw,128px)] min-[860px]:grid-cols-[minmax(0,1fr)_auto] min-[860px]:items-center min-[860px]:gap-[clamp(32px,5vw,72px)] min-[860px]:rounded-[28px] min-[860px]:p-[clamp(36px,6vw,72px)]"
      >
        <div>
          <p className="m-0 mb-3.5 text-[13px] font-semibold tracking-[0.14em] text-accent uppercase">
            Contact
          </p>
          <h2 className="m-0 max-w-[15ch] text-[clamp(34px,4.6vw,60px)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance text-white">
            Hiring for a frontend role?{" "}
            <em className="font-serif font-normal tracking-[-0.01em] whitespace-nowrap text-accent italic">
              Let&apos;s talk.
            </em>
          </h2>
          <p className="m-0 mt-3.5 mb-6 max-w-[50ch] text-[15.5px] leading-[1.6] text-fg/75 min-[860px]:mt-5 min-[860px]:mb-9 min-[860px]:text-[17px]">
            Open to full-time or contract work, remote or on site. Email is the
            fastest way to reach me, and I usually reply within a day.
          </p>

          <Link
            href="mailto:omotugbatimilehin7@gmail.com"
            className="inline-flex items-center gap-2 border-b-2 border-accent pb-1.5 text-base font-semibold tracking-[-0.02em] [overflow-wrap:anywhere] transition-colors hover:text-accent min-[860px]:gap-3.5 min-[860px]:text-[clamp(20px,2.6vw,30px)]"
          >
            omotugbatimilehin7@gmail.com →
          </Link>

          <ul
            role="list"
            className="m-0 mt-7 flex list-none flex-wrap gap-x-5 gap-y-2.5 p-0 text-sm text-fg/60 min-[860px]:mt-10 min-[860px]:gap-x-7 min-[860px]:text-[15px]"
          >
            {CHANNELS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="transition-colors hover:text-fg"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/resume.pdf"
                download="Timilehin-Omotugba-Resume.pdf"
                className="transition-colors hover:text-fg"
              >
                Résumé (PDF) ↓
              </Link>
            </li>
          </ul>
        </div>

        <figure className="m-0 hidden w-[clamp(220px,24vw,300px)] min-[860px]:block">
          <span className="relative block aspect-[4/5] overflow-hidden rounded-[20px]">
            <Image
              src="/timilehin.jpg"
              alt="Timilehin Omotugba"
              fill
              sizes="300px"
              // Already cropped to 4:5, so nothing gets cut off here.
              className="object-cover"
            />
          </span>
          <figcaption className="mt-3 text-[13.5px] text-fg/60">
            Timilehin Omotugba
          </figcaption>
        </figure>
      </section>
    </div>
  );
}
