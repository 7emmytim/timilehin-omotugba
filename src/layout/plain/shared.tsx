import type { ReactNode } from "react";

/** The page column every plain section sits in. */
export const WRAP = "mx-auto w-full max-w-[1180px] px-[clamp(20px,4vw,48px)]";

/** Small green label above a section heading, then the heading itself. */
export function SectionTitle({
  kicker,
  children,
}: {
  kicker: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="m-0 mb-3.5 text-[13px] font-semibold tracking-[0.14em] text-leaf uppercase">
        {kicker}
      </p>
      <h2 className="m-0 text-[clamp(32px,4.4vw,52px)] leading-[1.05] font-semibold tracking-[-0.035em] text-ink">
        {children}
      </h2>
    </div>
  );
}

/** The one serif italic word a heading leans on ("enjoy", "use", ...). */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <em className="font-serif font-normal tracking-[-0.01em] text-leaf italic">
      {children}
    </em>
  );
}
