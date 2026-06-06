import type { Quote } from "@/data/quotes";

export default function DailyQuote({ quote }: { quote: Quote }) {
  return (
    <figure className="flex flex-col gap-6">
      <blockquote className="border-l-4 border-foreground/20 pl-6 text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug tracking-tight text-foreground">
        <span
          className="block text-foreground/20 text-6xl font-serif leading-none select-none -mb-4"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        {quote.text}
      </blockquote>
      <figcaption className="pl-6 text-sm text-foreground/60">
        <span className="font-medium text-foreground/80">— {quote.author}</span>
        {quote.source && (
          <span className="block italic mt-0.5">
            {quote.source}
            {quote.year ? `, ${quote.year}` : ""}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
