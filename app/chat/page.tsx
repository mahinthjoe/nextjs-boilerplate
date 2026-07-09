import type { Metadata } from "next";
import ChatRoom from "@/components/ChatRoom";

// Force dynamic rendering so a missing Supabase config fails a request
// instead of failing the entire site's build at prerender time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chat",
  description: "A realtime chat room powered by Supabase Realtime channels.",
};

export default function ChatPage() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-background px-6 py-24">
      <main className="w-full max-w-2xl mx-auto">
        <ChatRoom />
      </main>
    </div>
  );
}
