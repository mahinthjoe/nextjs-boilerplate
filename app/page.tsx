import DailyQuote from "@/components/DailyQuote";
import { getDailyQuote } from "@/data/quotes";

export const revalidate = 86400;

export default function Home() {
  const quote = getDailyQuote();
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-background">
      <main className="w-full max-w-2xl mx-auto px-6 py-24">
        <DailyQuote quote={quote} />
      </main>
    </div>
  );
}
