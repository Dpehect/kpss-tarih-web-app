"use client";

import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BotMessageSquare,
  Database,
  Eraser,
  Maximize2,
  Minimize2,
  Send,
  ShieldCheck,
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
  "Put kırıcı nedir?",
  "Kut anlayışı nedir?",
  "Sened-i İttifak, Tanzimat ve I. Meşrutiyet sırası nedir?",
  "Malazgirt ile Miryokefalon farkı nedir?",
];

const WELCOME_TEXT =
  "Merhaba. Ben KPSS Tarih Rehberi’yim. Önce site bilgi havuzunu tararım; güçlü eşleşme bulursam o bilgiyle, bulamazsam genel tarih bilgisini kullanarak sınav odaklı cevap veririm.";

function renderText(text: string) {
  return text.split("\n").map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < text.split("\n").length - 1 ? <br /> : null}
    </span>
  ));
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
  const inputRef = useRef<HTMLInputElement | null>(null);

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

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || data.error) {
        throw new Error(data.error ?? "Sunucu cevabı alınamadı.");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: "bot",
          text:
            data.reply?.trim() ||
            "Bu soruya şu anda net bir cevap üretemedim. Soruyu biraz daha açık yazar mısın?",
        },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Bağlantı hatası";
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "bot",
          error: true,
          text: `Şu anda cevap alınamadı: ${message}. Birkaç saniye sonra tekrar deneyebilirsin.`,
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

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
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
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-blue-600/25 blur-xl" />
        ) : null}
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={cn(
              "fixed z-[69] flex flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white text-slate-950 shadow-[0_28px_90px_rgba(15,23,42,.22)]",
              "inset-x-3 bottom-24 top-auto h-[min(620px,calc(100dvh-8rem))]",
              "sm:inset-x-auto sm:bottom-24 sm:right-5 sm:w-[410px]",
              "lg:bottom-24 lg:right-6",
              expanded && "sm:w-[560px] lg:w-[680px]"
            )}
          >
            <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950 px-5 py-4 text-white">
              <div className="pointer-events-none absolute -right-12 -top-16 size-44 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/14 text-white ring-1 ring-white/18">
                  <Sparkles size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black tracking-tight">KPSS Tarih Rehberi</p>
                  <p className="truncate text-xs font-semibold text-blue-100">
                    Veri havuzu öncelikli akıllı asistan
                  </p>
                </div>
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

              <div className="relative mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 text-[11px] font-bold text-white ring-1 ring-white/15">
                  <Database size={13} /> Site havuzu
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 text-[11px] font-bold text-white ring-1 ring-white/15">
                  <ShieldCheck size={13} /> Yanlış eşleşmeye kilit
                </span>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 px-4 py-5 scrollbar-clean">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start gap-3",
                      message.role === "user" && "justify-end"
                    )}
                  >
                    {message.role === "bot" ? (
                      <div className="mt-1 grid size-8 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white shadow-sm">
                        <BotMessageSquare size={16} />
                      </div>
                    ) : null}

                    <div
                      className={cn(
                        "max-w-[82%] whitespace-pre-wrap rounded-[1.35rem] px-4 py-3 text-sm leading-7 shadow-sm",
                        message.role === "user"
                          ? "rounded-tr-md bg-blue-700 text-white"
                          : "rounded-tl-md border border-slate-200 bg-white text-slate-800",
                        message.error && "border-rose-200 bg-rose-50 text-rose-800"
                      )}
                    >
                      {renderText(message.text)}
                    </div>
                  </div>
                ))}

                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="grid size-8 place-items-center rounded-2xl bg-blue-600 text-white">
                      <BotMessageSquare size={16} />
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      {[0, 1, 2].map((index) => (
                        <span
                          key={index}
                          className="size-2 animate-pulse rounded-full bg-blue-600"
                          style={{ animationDelay: `${index * 120}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}

                <div ref={endRef} />
              </div>
            </div>

            <div className="shrink-0 border-t border-slate-200 bg-white p-3">
              {messages.length === 1 ? (
                <div className="mb-3 flex gap-2 overflow-x-auto pb-1 scrollbar-clean">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendMessage(prompt)}
                      className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Örn: Put kırıcı nedir?"
                  disabled={loading}
                  autoComplete="off"
                  className="min-w-0 flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-950 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                  whileHover={{ scale: input.trim() && !loading ? 1.04 : 1 }}
                  whileTap={{ scale: input.trim() && !loading ? 0.96 : 1 }}
                  aria-label="Gönder"
                >
                  <Send size={18} />
                </motion.button>
                <button
                  type="button"
                  onClick={resetChat}
                  className="hidden size-12 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 sm:grid"
                  aria-label="Sohbeti temizle"
                >
                  <Eraser size={17} />
                </button>
              </form>
              <p className="mt-2 text-center text-[11px] font-semibold text-slate-500">
                Önce site bilgi havuzu taranır; emin olunmayan eşleşmeler cevap gibi sunulmaz.
              </p>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
