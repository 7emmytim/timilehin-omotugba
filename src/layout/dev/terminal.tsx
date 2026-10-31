import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useNav } from "@/context";
import { SoonButton } from "@/layout/editor/soon-button";

const OUTPUT = [
  {
    key: "email",
    value: "omotugbatimilehin7@gmail.com",
    href: "mailto:omotugbatimilehin7@gmail.com",
  },
  { key: "phone", value: "+234 916 406 2040", href: "tel:+2349164062040" },
  {
    key: "linkedin",
    value: "/in/timilehin-omotugba",
    href: "https://www.linkedin.com/in/timilehin-omotugba/",
  },
  { key: "github", value: "/7emmytim", href: "https://github.com/7emmytim" },
  { key: "resume", value: "resume.pdf", href: "/resume.pdf" },
];

/** Dev mode's contact section: the terminal panel, where contact info belongs. */
export function Terminal() {
  const {
    terminalOpen: open,
    setTerminalOpen: setOpen,
    contactPending,
    contactShown,
  } = useNav();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [flash, setFlash] = useState(false);

  // contact.ts in the explorer asked for the contact details, so land on them.
  // Browsers hide the focus ring after a mouse click, and the terminal is often
  // already open, so the lines light up briefly to show where the click went.
  useEffect(() => {
    if (!contactPending || !open) return;
    bodyRef.current?.scrollTo({ top: 0 });
    bodyRef.current?.querySelector<HTMLElement>("a")?.focus();
    setFlash(true);
    contactShown();
  }, [contactPending, open, contactShown]);

  useEffect(() => {
    if (!flash) return;
    const timer = window.setTimeout(() => setFlash(false), 1400);
    return () => window.clearTimeout(timer);
  }, [flash]);

  return (
    <div className="border-t border-hair bg-editor">
      <div className="flex items-center gap-[18px] border-b border-hair px-4 py-2 font-mono text-[11px] tracking-[0.08em] text-mute uppercase">
        <b className="pb-[7px] font-medium text-white shadow-[inset_0_-2px_0_var(--color-accent)]">
          Terminal
        </b>
        {/* They look like tabs, so say they're not built yet rather than
            silently ignoring the click. */}
        {["Problems", "Output"].map((tab) => (
          <span key={tab} className="hidden sm:inline-flex">
            <SoonButton
              label={tab}
              className="pb-[7px] font-mono text-[11px] tracking-[0.08em] text-mute uppercase hover:text-fg"
            >
              {tab}
            </SoonButton>
          </span>
        ))}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="terminal-body"
          className="ml-auto cursor-pointer px-1 text-[13px] normal-case hover:text-fg"
          title={open ? "Collapse panel" : "Expand panel"}
        >
          {open ? "⌄" : "⌃"}
        </button>
      </div>

      {open && (
        <div
          ref={bodyRef}
          id="terminal-body"
          className="max-h-[30vh] overflow-y-auto px-4 pt-3 pb-4 font-mono text-[12.5px] leading-[21px] editor-scroll sm:max-h-[34vh] sm:text-[13px]"
        >
          <div>
            <span className="text-s-type">timilehin@portfolio</span>{" "}
            <span className="text-s-blue">~</span> ${" "}
            <span className="text-fg">contact --hire</span>
          </div>

          {OUTPUT.map(({ key, value, href }) => (
            <div
              key={key}
              // Lights up fast, fades out slowly.
              className={`-mx-2 flex gap-2 rounded px-2 text-fg/80 transition-colors motion-reduce:transition-none ${
                flash
                  ? "bg-accent/20 duration-150"
                  : "bg-transparent duration-1000"
              }`}
            >
              <span aria-hidden="true">→</span>
              <span className="w-[4.5rem] flex-none">{key}</span>
              <Link
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="min-w-0 break-all text-s-blue hover:text-white"
              >
                {value}
              </Link>
            </div>
          ))}

          <div>
            <span className="text-s-type">timilehin@portfolio</span>{" "}
            <span className="text-s-blue">~</span> $<span className="caret" />
          </div>
        </div>
      )}
    </div>
  );
}
