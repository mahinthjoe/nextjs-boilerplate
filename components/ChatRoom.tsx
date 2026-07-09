"use client";

import { useEffect, useRef, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

const ROOM_NAME = "chat-room:lobby";
const USERNAME_STORAGE_KEY = "chat-room:username";

type ChatMessage = {
  id: string;
  username: string;
  body: string;
  sentAt: string;
};

function randomUsername() {
  return `Guest${Math.floor(1000 + Math.random() * 9000)}`;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatRoom() {
  const [username, setUsername] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineCount, setOnlineCount] = useState(1);
  const [status, setStatus] = useState<"connecting" | "connected" | "error">(
    "connecting"
  );

  const channelRef = useRef<RealtimeChannel | null>(null);
  const presenceKeyRef = useRef<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Pick (or restore) a display name once on mount.
  useEffect(() => {
    const stored = window.localStorage.getItem(USERNAME_STORAGE_KEY);
    const name = stored || randomUsername();
    window.localStorage.setItem(USERNAME_STORAGE_KEY, name);
    // localStorage isn't available during SSR, so this has to run post-mount —
    // rendering it straight from state would mismatch the server-rendered HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsername(name);
    presenceKeyRef.current = crypto.randomUUID();
  }, []);

  // Open the realtime channel once we have a username.
  useEffect(() => {
    if (!username) return;

    const channel = supabase.channel(ROOM_NAME, {
      config: {
        broadcast: { self: true },
        presence: { key: presenceKeyRef.current },
      },
    });
    channelRef.current = channel;

    channel
      .on("broadcast", { event: "message" }, ({ payload }) => {
        setMessages((prev) => [...prev, payload as ChatMessage]);
      })
      .on("presence", { event: "sync" }, () => {
        setOnlineCount(Object.keys(channel.presenceState()).length);
      })
      .subscribe(async (subscribeStatus) => {
        if (subscribeStatus === "SUBSCRIBED") {
          await channel.track({ username });
          setStatus("connected");
        } else if (subscribeStatus === "CHANNEL_ERROR" || subscribeStatus === "TIMED_OUT") {
          setStatus("error");
        }
      });

    return () => {
      supabase.removeChannel(channel);
      channelRef.current = null;
    };
  }, [username]);

  // Keep the latest message in view.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    const body = draft.trim();
    const channel = channelRef.current;
    if (!body || !channel) return;

    channel.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: crypto.randomUUID(),
        username,
        body,
        sentAt: new Date().toISOString(),
      } satisfies ChatMessage,
    });
    setDraft("");
  }

  return (
    <div className="flex h-[70vh] w-full flex-col overflow-hidden rounded-xl border border-foreground/10">
      <header className="flex items-center justify-between border-b border-foreground/10 px-4 py-3">
        <div>
          <h1 className="text-sm font-semibold">Lobby</h1>
          <p className="text-xs text-foreground/50">
            You are <span className="text-foreground/80">{username || "…"}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-foreground/50">
          <span
            className={`h-2 w-2 rounded-full ${
              status === "connected"
                ? "bg-green-500"
                : status === "error"
                  ? "bg-red-500"
                  : "bg-yellow-500"
            }`}
          />
          {status === "connected"
            ? `${onlineCount} online`
            : status === "error"
              ? "connection error"
              : "connecting…"}
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {messages.length === 0 && (
          <p className="pt-8 text-center text-sm text-foreground/40">
            No messages yet — say hello.
          </p>
        )}
        {messages.map((message) => {
          const isOwn = message.username === username;
          return (
            <div
              key={message.id}
              className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                  isOwn
                    ? "bg-foreground text-background"
                    : "bg-foreground/10 text-foreground"
                }`}
              >
                {!isOwn && (
                  <p className="mb-0.5 text-xs font-semibold text-foreground/60">
                    {message.username}
                  </p>
                )}
                <p className="whitespace-pre-wrap break-words">{message.body}</p>
              </div>
              <span className="mt-1 text-[10px] text-foreground/40">
                {formatTime(message.sentAt)}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="flex items-center gap-2 border-t border-foreground/10 p-3"
      >
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message…"
          maxLength={500}
          disabled={status !== "connected"}
          className="flex-1 rounded-md border border-foreground/15 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-foreground/40 focus:border-foreground/40 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status !== "connected" || !draft.trim()}
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
