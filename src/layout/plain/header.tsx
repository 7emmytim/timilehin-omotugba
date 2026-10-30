import Image from "next/image";
import { useEffect, useState } from "react";
import { useNav } from "@/context";
import { ViewSwitch } from "./view-switch";

export function Header() {
  const { items, active, goTo } = useNav();
  const [scrolled, setScrolled] = useState(false);

  // The divider only appears once content slides under the header.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 4);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 border-b bg-editor/85 backdrop-blur transition-colors ${
        scrolled ? "border-hair" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[960px] items-center gap-6 px-6 sm:px-10">
        <a
          href={`#${items[0].id}`}
          onClick={(event) => {
            event.preventDefault();
            goTo(items[0].id);
          }}
          className="flex min-w-0 items-center gap-2.5 font-semibold text-white"
        >
          <Image
            src="/avatar.png"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 flex-none rounded-full object-cover ring-1 ring-hair"
          />
          <span className="truncate">Timilehin Omotugba</span>
        </a>

        {/* Phones skip these: the page is short, and a menu is one more thing
            to learn. */}
        <nav aria-label="Sections" className="ml-auto hidden md:block">
          <ul className="m-0 flex list-none gap-5 p-0 text-sm">
            {items.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    goTo(id);
                  }}
                  aria-current={active === id ? "true" : undefined}
                  className={`transition-colors hover:text-white ${
                    active === id ? "text-white" : "text-fg/60"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto md:ml-0">
          <ViewSwitch />
        </div>
      </div>
    </header>
  );
}
