import projects from "@/data/projects.json";
import { yearsShipping } from "@/lib";
import { WRAP } from "./shared";

const FACTS = [
  { value: `${yearsShipping()}+ years`, label: "building for the web" },
  { value: `${projects.length} products`, label: "live and in use" },
  { value: "Remote", label: "or on site in Abuja" },
  { value: "Full-time", label: "or contract roles" },
];

/** Four things a recruiter can take in at a glance. */
export function Facts() {
  return (
    <div className="min-[860px]:border-y min-[860px]:border-rule min-[860px]:bg-paper-raised">
      <ul
        role="list"
        className={`${WRAP} m-0 grid list-none grid-cols-2 gap-x-4 min-[860px]:grid-cols-4 min-[860px]:gap-x-0`}
      >
        {FACTS.map(({ value, label }) => (
          <li
            key={value}
            className="border-t border-rule py-4 min-[860px]:border-t-0 min-[860px]:py-7 min-[860px]:pr-6 min-[860px]:not-first:border-l min-[860px]:not-first:pl-6"
          >
            <b
              suppressHydrationWarning
              className="block text-[22px] font-semibold tracking-[-0.03em] text-ink min-[860px]:text-[clamp(24px,3vw,36px)]">
              {value}
            </b>
            <span className="text-[13px] text-ink-60 min-[860px]:text-sm">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
