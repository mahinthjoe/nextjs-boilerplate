/**
 * GLOBAL TEST SETUP
 * -----------------
 * This file runs before every test file in the project.
 * Its only job here is to load the jest-dom matchers.
 *
 * Without this import, expect() only knows about generic matchers like:
 *   expect(value).toBe(...)
 *   expect(array).toHaveLength(...)
 *
 * After this import, expect() also knows DOM-specific matchers like:
 *   expect(element).toBeInTheDocument()   ← is it in the fake browser DOM?
 *   expect(element).toHaveTextContent("hello")  ← does it contain this text?
 *   expect(button).toBeDisabled()
 *
 * These matchers produce much clearer failure messages than raw DOM assertions.
 * That's the only reason this file exists — quality-of-life for test output.
 */
// The "/vitest" entry point is the version of jest-dom that knows how to
// extend Vitest's `expect` specifically. The plain "@testing-library/jest-dom"
// import targets Jest's global — using the wrong entry causes a runtime error.
import "@testing-library/jest-dom/vitest";
