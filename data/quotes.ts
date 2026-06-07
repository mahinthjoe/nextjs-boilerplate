export interface Quote {
  text: string;
  author: string;
  source?: string;
  year?: number;
}

export const quotes: Quote[] = [
  {
    text: "Those who have a sense of responsibility are owners and those who don't have a sense of responsibility are guests.",
    author: "Ann Chang-ho",
    source: "Address to Korean emigrants",
  },
  {
    text: "The best time to plant a tree was twenty years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  {
    text: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin",
  },
];

/**
 * WHY THIS FUNCTION ACCEPTS AN OPTIONAL `date` PARAMETER
 * -------------------------------------------------------
 * The original version called `new Date()` inside the function body.
 * That made the return value unpredictable — it changed every day,
 * so a test could never say "given this input, I expect this output."
 *
 * This is called a SIDE EFFECT: behaviour that depends on something
 * outside the function's arguments (in this case, the system clock).
 *
 * The fix is called DEPENDENCY INJECTION: instead of reaching out
 * for the date itself, the function accepts it as a parameter.
 * The caller decides what date to use.
 *
 * In production code, the caller (app/page.tsx) passes nothing,
 * so `date` defaults to `new Date()` — behaviour is unchanged.
 *
 * In test code, we pass a specific date like `new Date("2024-01-15")`
 * and the function becomes fully predictable: same input = same output.
 * That's called a PURE FUNCTION, and pure functions are easy to test.
 */
export function getDailyQuote(date: Date = new Date()): Quote {
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
  const dayOfYear = Math.floor((date.getTime() - start.getTime()) / 86400000);
  return quotes[dayOfYear % quotes.length];
}
