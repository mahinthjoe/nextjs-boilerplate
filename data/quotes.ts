export interface Quote {
  text: string;
  author: string;
  source?: string;
  year?: number;
}

export const quotes: Quote[] = [
    {
    text:"To write is to forget. Literature is the most agreeable way of ignoring life.",
    author: "Fernando Pessoa",
    source: "Portugese poet:Quote of the Day: 13 June",
  },
  {
    text: "Those who have a sense of responsibility are owners and those who don't have a sense of responsibility are guests.",
    author: "Ann Chang-ho",
    source: "Address to Korean emigrants",
  },
];

export function getDailyQuote(): Quote {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 0));
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return quotes[dayOfYear % quotes.length];
}
