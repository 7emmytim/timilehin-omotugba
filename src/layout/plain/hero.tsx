import Link from "next/link";
import { Accent, WRAP } from "./shared";

const BUTTON =
  "inline-flex items-center justify-center gap-2.5 rounded-full px-3 py-3.5 text-[15px] font-semibold transition min-[860px]:px-[22px]";

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/timilehin-omotugba/" },
  { label: "GitHub", href: "https://github.com/7emmytim" },
];

export function Hero() {
  return (
    // id="about" is the first nav item; the header name scrolls here.
    <section
      id="about"
      className="pt-10 pb-11 min-[860px]:pt-[clamp(64px,10vw,136px)] min-[860px]:pb-[clamp(48px,7vw,88px)]"
    >
      <div className={WRAP}>
        <p className="m-0 mb-[22px] flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[15px] text-ink-60 min-[860px]:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-leaf-line bg-leaf-dim px-3 py-1.5 text-[13.5px] font-semibold text-leaf">
            <i
              aria-hidden="true"
              className="block h-[7px] w-[7px] rounded-full bg-leaf shadow-[0_0_0_4px_rgba(42,110,76,0.15)]"
            />
            Open to work
          </span>
          <span>Frontend developer · Abuja, Nigeria</span>
        </p>

        <h1 className="m-0 max-w-[15ch] text-[clamp(44px,7.6vw,104px)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance text-ink">
          I build websites and apps people <Accent>enjoy</Accent> using.
        </h1>

        <div className="mt-7 grid gap-7 min-[860px]:mt-[clamp(32px,4vw,48px)] min-[860px]:grid-cols-[minmax(0,1fr)_auto] min-[860px]:items-end min-[860px]:gap-x-12">
          <p className="m-0 max-w-[40ch] text-[clamp(19px,1.9vw,23px)] leading-[1.45] tracking-[-0.01em] text-ink-60">
            Four years shipping real products for trading, healthcare and
            research teams. Currently at AFEX.
          </p>

          {/* Phones: two equal buttons, links on their own line underneath. */}
          <div className="grid grid-cols-2 gap-2.5 min-[860px]:flex min-[860px]:flex-wrap min-[860px]:items-center min-[860px]:gap-3.5">
            {/* Opens the PDF in a new tab until the résumé dialog lands. */}
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`${BUTTON} bg-leaf text-white hover:brightness-110`}
            >
              View résumé →
            </Link>
            <Link
              href="mailto:omotugbatimilehin7@gmail.com"
              className={`${BUTTON} border border-rule bg-paper-raised text-ink hover:border-ink-60`}
            >
              Email me
            </Link>

            <div className="col-span-2 mt-1 flex gap-5 text-[14.5px] text-ink-60 min-[860px]:mt-0 min-[860px]:ml-2">
              {LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  {label} ↗
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
