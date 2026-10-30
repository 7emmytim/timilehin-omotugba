import type { ReactNode } from "react";

/** The page column every plain section sits in. */
export const WRAP = "mx-auto w-full max-w-[1180px] px-[clamp(20px,4vw,48px)]";

/** The one serif italic word a heading leans on ("enjoy", "use", ...). */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <em className="font-serif font-normal tracking-[-0.01em] text-leaf italic">
      {children}
    </em>
  );
}
