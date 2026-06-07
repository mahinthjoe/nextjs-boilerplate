/**
 * VITEST CONFIGURATION
 * --------------------
 * This file tells Vitest how to find, compile, and run your tests.
 * It only runs during `npm test` — it has zero effect on your production build.
 */

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    // @vitejs/plugin-react teaches Vitest how to compile JSX/TSX files.
    // Without this, Vitest would choke on any file that contains <Component />.
    react(),
  ],

  test: {
    // "jsdom" spins up a fake browser DOM inside Node.js.
    // This means your component tests can call document.querySelector,
    // fire click events, etc. — without ever opening a real browser.
    // The alternative "node" environment has no DOM at all (fine for pure functions).
    environment: "jsdom",

    // This file runs once before every test file.
    // We use it to import @testing-library/jest-dom which adds matchers like
    // .toBeInTheDocument() and .toHaveTextContent() to the expect() function.
    setupFiles: ["./vitest.setup.ts"],

    // globals: true makes describe / it / expect available in every test file
    // without needing to import them. It also lets @testing-library/jest-dom
    // extend the global `expect` at setup time — which is required for matchers
    // like .toBeInTheDocument() to work.
    globals: true,

    // By default Vitest only picks up files ending in .test.ts / .test.tsx /
    // .spec.ts / .spec.tsx — this is already the convention, listed here
    // explicitly so it's visible and not "magic".
    include: ["**/*.{test,spec}.{ts,tsx}"],

    // Exclude the build output and node_modules — we never want to test those.
    exclude: ["node_modules", ".next"],
  },

  resolve: {
    alias: {
      // This mirrors the path alias in tsconfig.json: "@/*" → project root.
      // Without this, any import like `import { Quote } from "@/data/quotes"`
      // inside a test file would fail — Vitest wouldn't know what "@" means.
      "@": path.resolve(__dirname, "."),
    },
  },
});
