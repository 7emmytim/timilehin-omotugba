import { useMemo } from "react";

const INKS = [
  "var(--color-s-blue)",
  "var(--color-s-str)",
  "var(--color-s-com)",
  "var(--color-s-fn)",
  "var(--color-s-var)",
  "var(--color-s-key)",
];

/**
 * Decorative. A real minimap of prose would be meaningless, so this is a
 * deterministic abstraction, same shape on server and client, no hydration
 * mismatch, no layout cost.
 */
export function Minimap({ rows = 140 }: { rows?: number }) {
  const bars = useMemo(() => {
    let seed = 7;
    const rnd = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };
    return Array.from({ length: rows }, () => ({
      width: rnd() < 0.12 ? 0 : 18 + rnd() * 78,
      ink: INKS[Math.floor(rnd() * INKS.length)],
    }));
  }, [rows]);

  return (
    <div
      aria-hidden="true"
      className="hidden overflow-hidden border-l border-hair bg-editor px-1.5 py-2 lg:block"
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className="mb-[2px] h-[3px] rounded-[1px] opacity-50"
          style={{ width: `${bar.width}%`, background: bar.ink }}
        />
      ))}
    </div>
  );
}
