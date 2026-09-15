import type { ReactNode } from "react";

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <p className="m-0 mb-[18px] flex items-center gap-3 font-mono text-xs tracking-[0.1em] uppercase text-mute after:h-px after:flex-1 after:bg-card-line after:content-['']">
      {children}
    </p>
  );
}

export function Block({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mb-11 last:mb-0 scroll-mt-6">
      {children}
    </section>
  );
}
