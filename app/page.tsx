import DailyQuote from "@/components/DailyQuote";
import { getDailyQuote } from "@/data/quotes";

export const revalidate = 86400;

export default function Home() {
  const quote = getDailyQuote();
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-background">
      <main className="w-full max-w-2xl mx-auto px-6 py-24">
        <h1 className="sr-only">Mahinth Joe Christensen</h1>
        <DailyQuote quote={quote} />
        <p className="mt-10 pl-6 text-xs text-foreground/40 tracking-wide uppercase">
          Mahinth Joe Christensen — developer, builder, and creator
        </p>
      </main>
    </div>
  );
}
