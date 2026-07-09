"use client";

import type { FormEvent, KeyboardEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BotMessageSquare,
  BrainCircuit,
  Eraser,
  Maximize2,
  Minimize2,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  error?: boolean;
};

type HistoryItem = {
  role: "user" | "bot";
  text: string;
};

const QUICK_PROMPTS = [
  "Put kırıcı kimdir?",
  "Kut anlayışı KPSS'de nasıl sorulur?",
  "Sened-i İttifak, Tanzimat ve I. Meşrutiyet sırası nedir?",
  "Malazgirt ile Miryokefalon farkı nedir?",
];

const WELCOME_TEXT =
  "Merhaba. Ben KPSS Tarih Rehberi’yim. Sorunu önce uygulamadaki konu, kavram, kronoloji ve soru havuzuyla eşleştiririm; ardından öğretmen gibi kısa, net ve sınav odaklı açıklarım.";

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="font-extrabold">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function renderMessage(text: string): ReactNode {
  const lines = text.split("\n");

  return lines.map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <div key={`space-${index}`} className="h-3" />;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
      return (
        <div key={`${line}-${index}`} className="flex gap-2 text-[13px] leading-6">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-current opacity-60" />
          <span>{renderInlineMarkdown(trimmed.replace(/^[-•]\s*/, ""))}</span>
        </div>
      );
    }

    return (
      <p key={`${line}-${index}`} className="text-[13px] leading-6">
        {renderInlineMarkdown(line)}
      </p>
    );
  });
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "bot", text: WELCOME_TEXT },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const hasConversation = useMemo(
    () => messages.some((message) => message.id !== "welcome"),
    [messages],
  );

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      inputRef.current?.focus({ preventScroll: true });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [messages, open]);

  async function sendMessage(rawText = input) {
    const text = rawText.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text };
    const history: HistoryItem[] = messages
      .filter((message) => message.id !== "welcome" && !message.error)
      .map((message) => ({ role: message.role, text: message.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      const reply = data.reply?.trim();

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: "bot",
          text:
            response.ok && reply
              ? reply
              : "Şu an kısa bir bağlantı gecikmesi var. Sorunu farklı kelimelerle tekrar yaz; KPSS Tarih açısından en net şekilde açıklayayım.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "bot",
          error: true,
          text: "Bağlantı kısa süreli kesildi. Sorunu tekrar gönder; konu, kronoloji ve soru havuzunu dikkate alarak açıklayacağım.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  function resetChat() {
    setMessages([{ id: "welcome", role: "bot", text: WELCOME_TEXT }]);
    setInput("");
    window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 60);
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="KPSS Tarih Rehberi"
        className="fixed bottom-24 right-5 z-[70] grid size-14 place-items-center rounded-full bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950 text-white shadow-[0_22px_70px_rgba(30,58,138,.38)] ring-1 ring-white/20 lg:bottom-6 lg:right-6"
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
      >
        {open ? <X size={22} /> : <BotMessageSquare size={23} />}
        {!open ? (
          <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-amber-400 text-[10px] font-black text-slate-950 ring-4 ring-white">
            AI
          </span>
        ) : null}
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "fixed bottom-[6.2rem] right-3 z-[80] flex max-h-[min(760px,calc(100vh-7.5rem))] w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[30px] border border-slate-200 bg-white text-slate-950 shadow-[0_26px_90px_rgba(15,23,42,.24)] lg:bottom-24 lg:right-6",
              expanded ? "sm:w-[720px]" : "sm:w-[440px]",
            )}
            role="dialog"
            aria-label="KPSS Tarih Rehberi sohbet paneli"
          >
            <header className="kpss-chatbot-header relative overflow-hidden bg-gradient-to-br from-blue-800 via-indigo-800 to-slate-950 px-5 py-4 text-white">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,.22),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(217,119,6,.22),transparent_26%)]" />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/12 text-white ring-1 ring-white/20">
                    <BrainCircuit size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-black tracking-tight text-white">
                      KPSS Tarih Rehberi
                    </p>
                    <p className="truncate text-xs font-semibold text-blue-100">
                      LLM destekli sınav öğretmeni
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={resetChat}
                    className="grid size-9 place-items-center rounded-xl text-white/75 transition hover:bg-white/12 hover:text-white"
                    aria-label="Sohbeti temizle"
                  >
                    <Eraser size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpanded((value) => !value)}
                    className="grid size-9 place-items-center rounded-xl text-white/75 transition hover:bg-white/12 hover:text-white"
                    aria-label={expanded ? "Küçült" : "Genişlet"}
                  >
                    {expanded ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="grid size-9 place-items-center rounded-xl text-white/75 transition hover:bg-white/12 hover:text-white"
                    aria-label="Sohbeti kapat"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 px-4 py-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {message.role === "bot" ? (
                      <div className="mt-1 grid size-9 shrink-0 place-items-center rounded-2xl bg-blue-700 text-white shadow-sm">
                        <Sparkles size={16} />
                      </div>
                    ) : null}

                    <div
                      className={cn(
                        "max-w-[84%] rounded-[22px] px-4 py-3 shadow-sm ring-1",
                        message.role === "user"
                          ? "bg-blue-700 text-white ring-blue-700"
                          : message.error
                            ? "bg-rose-50 text-rose-950 ring-rose-200"
                            : "bg-white text-slate-800 ring-slate-200",
                      )}
                    >
                      <div
                        className={cn(
                          "space-y-1",
                          message.role === "user" && "[&_p]:text-white [&_strong]:text-white",
                        )}
                      >
                        {renderMessage(message.text)}
                      </div>
                    </div>
                  </div>
                ))}

                {loading ? (
                  <div className="flex gap-3">
                    <div className="mt-1 grid size-9 shrink-0 place-items-center rounded-2xl bg-blue-700 text-white shadow-sm">
                      <Sparkles size={16} />
                    </div>
                    <div className="rounded-[22px] bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <span>Cevap hazırlanıyor</span>
                        {[0, 1, 2].map((index) => (
                          <motion.span
                            key={index}
                            animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: index * 0.12 }}
                            className="size-1.5 rounded-full bg-blue-600"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
                <div ref={endRef} />
              </div>
            </div>

            <div className="border-t border-slate-200 bg-white p-3">
              {!hasConversation ? (
                <div className="mb-3 flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendMessage(prompt)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="flex items-end gap-2 rounded-[22px] border border-slate-200 bg-slate-50 p-2 shadow-inner focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tarih sorunu yaz: örn. Put kırıcı kimdir?"
                  disabled={loading}
                  rows={1}
                  className="max-h-28 min-h-[44px] flex-1 resize-none rounded-2xl border-0 bg-white px-4 py-3 text-[15px] font-semibold leading-5 text-slate-950 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                />
                <motion.button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/20 transition disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                  whileHover={{ y: loading ? 0 : -1 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="Mesaj gönder"
                >
                  <Send size={18} />
                </motion.button>
              </form>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}
