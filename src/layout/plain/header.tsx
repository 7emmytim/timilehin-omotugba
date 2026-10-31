import { useEffect, useState } from "react";
import { useNav } from "@/context";
import { ResumeButton } from "./resume-dialog";
import { WRAP } from "./shared";

export function Header() {
  const { items, active, goTo } = useNav();
  // The first item is the hero; the name already takes you there.
  const [top, ...sections] = items;
  const [scrolled, setScrolled] = useState(false);

  // The rule under the header only appears once content slides beneath it.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 4);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 border-b bg-paper/85 backdrop-blur-md transition-colors ${
        scrolled ? "border-rule" : "border-transparent"
      }`}
    >
      <div
        className={`${WRAP} flex h-[68px] items-center gap-3 min-[860px]:h-[76px] min-[860px]:gap-8`}
      >
        <a
          href={`#${top.id}`}
          onClick={(event) => {
            event.preventDefault();
            goTo(top.id);
          }}
          className="min-w-0 text-ink"
        >
          <span className="block truncate text-[15.5px] leading-tight font-semibold tracking-[-0.01em]">
            Timilehin Omotugba
          </span>
          <span className="block truncate text-[13px] text-ink-60">
            Software Engineer
          </span>
        </a>

        {/* Phones skip these: the page is short, and a menu is one more thing
            to learn. */}
        <nav aria-label="Sections" className="ml-auto hidden min-[860px]:block">
          <ul role="list" className="m-0 flex list-none gap-7 p-0 text-[14.5px]">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    goTo(id);
                  }}
                  aria-current={active === id ? "true" : undefined}
                  className={`pb-1 transition-colors hover:text-ink ${
                    active === id
                      ? "text-ink shadow-[0_2px_0_var(--color-leaf)]"
                      : "text-ink-60"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ResumeButton className="ml-auto inline-flex h-9 flex-none items-center gap-2 rounded-full border border-ink px-[13px] text-[13.5px] font-semibold text-ink transition-colors hover:bg-ink hover:text-paper min-[860px]:ml-0 min-[860px]:h-10 min-[860px]:px-4 min-[860px]:text-sm">
          Résumé<span aria-hidden="true" className="hidden min-[860px]:inline"> ↗</span>
        </ResumeButton>
      </div>
    </header>
  );
}
