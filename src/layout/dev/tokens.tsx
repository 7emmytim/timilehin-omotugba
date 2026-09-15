import Link from "next/link";

/** Syntax classes, mapped to the sage palette in globals.css. */
export type Ink =
  | "key"
  | "fn"
  | "str"
  | "num"
  | "com"
  | "type"
  | "var"
  | "blue"
  | "punc";

export type Token = { text: string; ink?: Ink; href?: string };
export type Line = Token[];

const INK: Record<Ink, string> = {
  key: "text-s-key",
  fn: "text-s-fn",
  str: "text-s-str",
  num: "text-s-num",
  com: "text-s-com",
  type: "text-s-type",
  var: "text-s-var",
  blue: "text-s-blue",
  punc: "text-fg",
};

/* Token builders, keep the source model readable where it's assembled. */
export const t = {
  kw: (text: string): Token => ({ text, ink: "key" }),
  fn: (text: string): Token => ({ text, ink: "fn" }),
  str: (text: string, href?: string): Token => ({
    text: `"${text}"`,
    ink: "str",
    href,
  }),
  num: (text: string | number): Token => ({ text: String(text), ink: "num" }),
  com: (text: string): Token => ({ text, ink: "com" }),
  type: (text: string): Token => ({ text, ink: "type" }),
  prop: (text: string): Token => ({ text, ink: "var" }),
  lit: (text: string): Token => ({ text, ink: "blue" }),
  p: (text: string): Token => ({ text, ink: "punc" }),
};

export function CodeLine({ tokens }: { tokens: Line }) {
  return (
    <div className="grid grid-cols-[38px_minmax(0,1fr)] break-words whitespace-pre-wrap before:[counter-increment:l] before:pr-3 before:text-right before:tabular-nums before:text-gutter before:select-none before:content-[counter(l)] hover:bg-hover lg:grid-cols-[58px_minmax(0,1fr)] lg:before:pr-5">
      <code className="pr-4 pl-4 -indent-4 text-fg sm:pr-6 sm:pl-0 sm:indent-0">
        {tokens.map((token, i) =>
          token.href ? (
            <Link
              key={i}
              href={token.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${INK[token.ink ?? "punc"]} underline decoration-dotted underline-offset-2 hover:text-white`}
            >
              {token.text}
            </Link>
          ) : (
            <span key={i} className={INK[token.ink ?? "punc"]}>
              {token.text}
            </span>
          ),
        )}
      </code>
    </div>
  );
}
