/**
 * UNIT TESTS: getDailyQuote()
 * ===========================
 *
 * A "unit test" tests one small piece of logic in complete isolation —
 * no network, no database, no DOM, no filesystem. Just: given this input,
 * do I get the expected output?
 *
 * HOW TO READ THESE TESTS
 * -----------------------
 * describe("subject") groups related tests together.
 * it("should do X") is a single test case — one behaviour, one assertion.
 * expect(actual).toBe(expected) is the assertion: "I claim these are equal."
 *
 * If the assertion is wrong, the test turns RED and shows you exactly
 * what value you got vs. what you expected. That's the whole point.
 *
 * TDD DISCIPLINE REMINDER
 * -----------------------
 * In strict TDD you write the test FIRST (it fails — RED),
 * then write just enough code to make it pass (GREEN),
 * then clean up (REFACTOR).
 *
 * We've already written the production code, so these tests start green.
 * When you ADD a new quote or change the rotation logic in the future,
 * write the test first — let it fail — then make it pass.
 */

import { describe, it, expect } from "vitest";
import { getDailyQuote, quotes } from "./quotes";

describe("getDailyQuote", () => {
  // TEST 1: Shape check
  // ------------------
  // The most basic test: does the function return something that looks
  // like a Quote? We check for `text` and `author` because those are
  // the required fields on the Quote interface.
  it("returns a Quote object with text and author", () => {
    const quote = getDailyQuote(new Date("2024-06-01"));
    expect(typeof quote.text).toBe("string");
    expect(quote.text.length).toBeGreaterThan(0);
    expect(typeof quote.author).toBe("string");
    expect(quote.author.length).toBeGreaterThan(0);
  });

  // TEST 2: Determinism
  // -------------------
  // "Deterministic" means: the same input always produces the same output.
  // Call the function twice with the exact same date — you must get the
  // exact same quote back both times.
  // If this test ever fails, it means the function has a hidden side effect
  // (something is changing between calls that shouldn't be).
  it("returns the same quote when called twice with the same date", () => {
    const date = new Date("2024-03-15");
    const first = getDailyQuote(date);
    const second = getDailyQuote(date);
    expect(first).toEqual(second);
  });

  // TEST 3: Rotation
  // ----------------
  // Consecutive days should (usually) return different quotes —
  // otherwise the "daily" feature is broken.
  // We pick two dates that land on different indices in the quotes array.
  // Note: this test only works because we have more than 1 quote.
  it("returns a different quote for a date one year apart", () => {
    const dayOne = getDailyQuote(new Date("2024-01-01"));
    const dayTwo = getDailyQuote(new Date("2024-01-02"));
    // toStrictEqual checks deep equality — two different objects with the
    // same contents would pass. We use not.toEqual here to confirm
    // that the content itself is different.
    expect(dayOne).not.toEqual(dayTwo);
  });

  // TEST 4: Wrap-around (the modulo logic)
  // --------------------------------------
  // The function uses `dayOfYear % quotes.length` to cycle through the
  // array. This test confirms that it wraps back to index 0 correctly
  // instead of going out of bounds.
  //
  // We pick two dates exactly `quotes.length` days apart in the same year.
  // They should land on the same array index, so they must return equal quotes.
  it("wraps around to index 0 after cycling through all quotes", () => {
    const msPerDay = 86_400_000;
    const baseDate = new Date("2024-01-01");
    const wrappedDate = new Date(baseDate.getTime() + quotes.length * msPerDay);

    const base = getDailyQuote(baseDate);
    const wrapped = getDailyQuote(wrappedDate);

    expect(base).toEqual(wrapped);
  });
});
