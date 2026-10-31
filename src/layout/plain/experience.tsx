import Link from "next/link";
import experiences from "@/data/experiences.json";
import { Accent, SectionTitle, WRAP } from "./shared";

/**
 * The short version of each role, one plain sentence. The long descriptions
 * stay in the data for the dev view and the résumé.
 */
export function Experience() {
  return (
    <section
      id="experience"
      className="pt-16 min-[860px]:pt-[clamp(72px,10vw,128px)]"
    >
      <div
        className={`${WRAP} grid gap-6 min-[860px]:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] min-[860px]:gap-[clamp(32px,6vw,96px)]`}
      >
        {/* Stays in view while the roles scroll past, on wide screens. */}
        <div className="min-[860px]:sticky min-[860px]:top-[116px] min-[860px]:self-start">
          <SectionTitle kicker="Experience">
            Where I&apos;ve <Accent>worked</Accent>
          </SectionTitle>
          <p className="m-0 mt-3 mb-3.5 max-w-[32ch] text-[15px] leading-[1.6] text-ink-60 min-[860px]:mt-[18px] min-[860px]:mb-[22px] min-[860px]:text-base">
            The short version. The full story, with tools and details, is in my
            résumé.
          </p>
          <Link
            href="/resume.pdf"
            download="Timilehin-Omotugba-Resume.pdf"
            className="inline-flex items-center gap-2 border-b border-leaf-line pb-[3px] text-[15px] font-semibold text-leaf transition-colors hover:border-leaf"
          >
            Download résumé ↓
          </Link>
        </div>

        <ol role="list" className="m-0 list-none p-0">
          {experiences.map(({ company, title, type, location, period, summary }) => (
            <li
              key={`${company}-${title}`}
              className="grid gap-1.5 border-t border-rule py-[22px] last:border-b min-[860px]:grid-cols-[150px_minmax(0,1fr)] min-[860px]:gap-6 min-[860px]:py-7"
            >
              <span className="text-sm text-ink-60 tabular-nums min-[860px]:pt-1">
                {period}
              </span>
              <div>
                <h3 className="m-0 text-xl font-semibold tracking-[-0.015em] text-ink">
                  {title} <span className="font-medium text-ink-60">at {company}</span>
                </h3>
                <span className="mt-1 block text-[13.5px] text-ink-60">
                  {type} · {location}
                </span>
                <p className="m-0 mt-2.5 text-base leading-[1.6] text-ink-75">
                  {summary}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
