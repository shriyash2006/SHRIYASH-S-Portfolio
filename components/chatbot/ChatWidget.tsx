// components/chatbot/ChatWidget.tsx
"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { MessageSquare, X, Send } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const SUGGESTIONS = [
  "What projects has he built?",
  "What's his tech stack?",
  "Tell me about his hackathon wins",
  "How can I contact him?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto‑scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      textareaRef.current?.focus();
    }
  }, [open]);

  const handleToggle = () => setOpen((prev) => !prev);

  const handleSubmit = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: userMsg }] }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Unexpected error ${response.status}`);
      }

      // Stream response text
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let value: Uint8Array | undefined;
      let assistantContent = "";

      // Push a placeholder assistant message that will be updated
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!done) {
        const result = await reader?.read();
        if (!result) break;
        ({ done, value } = result);
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          assistantContent += chunk;
          // Update last assistant message (the placeholder we just pushed)
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: assistantContent };
            return updated;
          });
        }
      }

      // If the streamed response contains an error marker, surface it
      if (assistantContent.includes("[ERROR]")) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: "Sorry, the assistant is temporarily unavailable. Please try again in a moment.",
          };
          return updated;
        });
      }
    } catch (e: any) {
      setError(e.message ?? "An error occurred while contacting the assistant.");
      // Remove the placeholder assistant message on error
      setMessages((prev) => prev.filter((m) => !(m.role === "assistant" && m.content === "")));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit();
    }
  };

  const handleSuggestionClick = (text: string) => {
    setInput(text);
    textareaRef.current?.focus();
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={handleToggle}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-foreground bg-foreground text-background shadow-lg transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-foreground"
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-4 z-30 w-80 max-w-sm rounded-lg border border-foreground bg-background shadow-xl transition-transform duration-300 ease-in-out"
          style={{ maxHeight: "80vh" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-foreground/20 p-3">
            <h2 className="text-sm font-medium uppercase text-foreground">Ask about Shriyash</h2>
            <button
              onClick={handleToggle}
              aria-label="Close chat"
              className="text-foreground hover:text-foreground/70"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Message list */}
          <div className="flex flex-col gap-2 overflow-y-auto p-3" aria-live="polite">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-xs rounded-md p-2 text-sm ${msg.role === "assistant" ? "bg-foreground text-background" : "bg-background text-foreground border border-foreground"}`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-md bg-foreground text-background p-2 text-sm animate-pulse">
                  ...
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start">
                <div className="rounded-md bg-red-600 text-background p-2 text-sm">
                  {error}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestion chips (only when no messages yet) */}
          {messages.length === 0 && !loading && (
            <div className="flex flex-wrap gap-2 p-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestionClick(s)}
                  className="rounded-full border border-foreground px-3 py-1 text-xs uppercase text-foreground hover:bg-foreground hover:text-background transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div className="border-t border-foreground/20 p-3">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 500))}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder="Type a message…"
              className="w-full resize-none rounded border border-foreground bg-background p-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-foreground"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-foreground/60">
              <span>{input.length}/500</span>
              <button
                onClick={handleSubmit}
                disabled={loading || input.trim() === ""}
                className="flex items-center gap-1 rounded bg-foreground px-3 py-1 text-background disabled:opacity-50"
              >
                Send <Send className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
