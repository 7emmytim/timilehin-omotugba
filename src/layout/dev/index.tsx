import { useMemo } from "react";
import { buildSource } from "./source";
import { CodeLine } from "./tokens";

export { Terminal } from "./terminal";

export function DevPane() {
  const sections = useMemo(() => buildSource(), []);

  return (
    <div className="py-3.5 font-mono text-[12.5px] leading-[22px] [counter-reset:l] sm:text-[13.4px]">
      {sections.map(({ id, lines }) => (
        <section key={id} id={id} className="scroll-mt-2">
          {lines.map((tokens, i) => (
            <CodeLine key={i} tokens={tokens} />
          ))}
        </section>
      ))}
    </div>
  );
}
