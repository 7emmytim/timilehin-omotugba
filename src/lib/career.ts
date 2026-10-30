/** First frontend role: AFEX, January 2021. Every "N years" on the site derives from this. */
const START = { year: 2021, month: 0 };

/** Whole years since the first role, so the copy never goes stale. */
export function yearsShipping(today = new Date()) {
  const months =
    (today.getFullYear() - START.year) * 12 + today.getMonth() - START.month;
  return Math.floor(months / 12);
}

const WORDS = [
  "zero", "one", "two", "three", "four", "five", "six",
  "seven", "eight", "nine", "ten", "eleven", "twelve",
];

/** "five" (or "Five") for prose; falls back to digits past twelve. */
export function yearsInWords({ capitalize = false } = {}) {
  const years = yearsShipping();
  const word = WORDS[years] ?? String(years);
  return capitalize ? word[0].toUpperCase() + word.slice(1) : word;
}
