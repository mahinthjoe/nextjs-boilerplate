/**
 * COMPONENT TESTS: <DailyQuote />
 * ================================
 *
 * A "component test" renders your React component into the fake jsdom
 * browser, then makes assertions about what a user would see.
 *
 * KEY PRINCIPLE: test behaviour, not implementation.
 * ---------------------------------------------------
 * BAD:  expect(container.querySelector(".pl-6")).toHaveTextContent("hello")
 *       ↑ breaks the moment you rename a CSS class
 *
 * GOOD: expect(screen.getByText("hello")).toBeInTheDocument()
 *       ↑ survives any styling/structural refactor; reflects what users see
 *
 * This is why React Testing Library deliberately doesn't expose
 * internals like component state or refs. It nudges you to write
 * tests that only care about observable output.
 *
 * WHAT `render()` DOES
 * --------------------
 * render(<DailyQuote quote={...} />) drops your component into the
 * fake DOM. After that, `screen` is a handle onto everything visible
 * in that fake document — you query it just like a user would perceive it.
 *
 * WHAT `screen` IS
 * ----------------
 * screen.getByText("hello")   → finds an element that contains this text; throws if absent
 * screen.queryByText("hello") → same, but returns null instead of throwing if absent
 * screen.getByRole("figure")  → finds by ARIA role — more robust than querying by tag name
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DailyQuote from "./DailyQuote";
import type { Quote } from "@/data/quotes";

// A fixed test fixture — a Quote we control completely.
// Using a fixture means tests don't depend on whatever happens
// to be in the real quotes array today.
const QUOTE_WITH_SOURCE: Quote = {
  text: "Test quote text",
  author: "Test Author",
  source: "Test Source Book",
  year: 2024,
};

const QUOTE_WITHOUT_SOURCE: Quote = {
  text: "Another test quote",
  author: "Another Author",
};

describe("DailyQuote", () => {
  // TEST 1: Core content
  // --------------------
  // The most important thing the component does: show the quote text.
  // If this fails, nothing else matters.
  it("renders the quote text", () => {
    render(<DailyQuote quote={QUOTE_WITH_SOURCE} />);
    expect(screen.getByText("Test quote text")).toBeInTheDocument();
  });

  // TEST 2: Attribution
  // -------------------
  // Users need to know who said this — the author must always appear.
  // We use a regex here (/Test Author/) instead of an exact string
  // because the template is "— Test Author" and we don't want to
  // hard-code the em dash into the test.
  it("renders the author attribution", () => {
    render(<DailyQuote quote={QUOTE_WITH_SOURCE} />);
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
  });

  // TEST 3: Optional source — present case
  // ---------------------------------------
  // When a quote has a source, both the book title and year should appear.
  it("renders the source and year when provided", () => {
    render(<DailyQuote quote={QUOTE_WITH_SOURCE} />);
    expect(screen.getByText(/Test Source Book/)).toBeInTheDocument();
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  // TEST 4: Optional source — absent case
  // ---------------------------------------
  // When a quote has NO source, we should not render an empty element.
  // queryByText (not getByText) is the right tool here because we EXPECT
  // the element to be absent — getByText would throw an error if it
  // doesn't find it, which would confuse the intent of the test.
  it("does not render source text when source is absent", () => {
    render(<DailyQuote quote={QUOTE_WITHOUT_SOURCE} />);
    expect(screen.queryByText(/Another Author/)).toBeInTheDocument(); // author still shows
    expect(screen.queryByText(/source/i)).not.toBeInTheDocument();    // but no source line
  });
});
