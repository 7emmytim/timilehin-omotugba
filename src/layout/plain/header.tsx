import Image from "next/image";
import { useNav } from "@/context";
import { DevModeToggle } from "@/layout/common/dev-mode-toggle";

export function Header() {
  const { items, active, goTo } = useNav();
  // The first item is the hero; the name already takes you there.
  const [top, ...sections] = items;

  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-[1180px] items-center gap-8 px-[clamp(20px,4vw,48px)] min-[860px]:h-[68px]">
        <a
          href={`#${top.id}`}
          onClick={(event) => {
            event.preventDefault();
            goTo(top.id);
          }}
          className="flex min-w-0 items-center gap-2.5 text-base font-semibold tracking-[-0.01em] text-ink"
        >
          <Image
            src="/avatar.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 flex-none rounded-full object-cover"
          />
          <span className="truncate">Timilehin Omotugba</span>
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
                  className={`transition-colors hover:text-ink ${
                    active === id ? "text-ink" : "text-ink-60"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto min-[860px]:ml-0">
          <DevModeToggle tone="light" />
        </div>
      </div>
    </header>
  );
}
