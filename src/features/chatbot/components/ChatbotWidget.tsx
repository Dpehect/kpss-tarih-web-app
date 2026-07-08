"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BotMessageSquare, CheckCircle2, Database, Loader2, Maximize2, Minimize2, Send, ShieldCheck, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/cn";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  sourceMode?: "site-knowledge" | "direct-fact" | "safe-fallback";
  error?: boolean;
};

const QUICK_PROMPTS = [
  "Put kırıcı nedir?",
  "Artuklular neyle bilinir?",
  "Sened-i İttifak → Tanzimat → I. Meşrutiyet sırası doğru mu?",
  "Miryokefalon'un önemi nedir?",
];

function renderText(text: string) {
  const html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function sourceLabel(sourceMode?: Message["sourceMode"]) {
  if (sourceMode === "site-knowledge") return "Site havuzundan";
  if (sourceMode === "direct-fact") return "Doğrulanmış hızlı bilgi";
  if (sourceMode === "safe-fallback") return "Güvenli yanıt";
  return "KPSS Tarih";
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      sourceMode: "site-knowledge",
      text: "Merhaba. Ben KPSS Tarih Rehberi'yim. Önce sitenin konu, soru, flashcard ve kronoloji havuzunu tararım; eşleşme bulursam onu sınav odaklı açıklarım.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const panelSize = useMemo(
    () =>
      expanded
        ? "fixed inset-x-3 bottom-20 top-20 z-[70] sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[760px] sm:w-[560px]"
        : "fixed inset-x-3 bottom-20 z-[70] sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[620px] sm:w-[420px]",
    [expanded],
  );

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      inputRef.current?.focus();
    }, 80);
    return () => window.clearTimeout(timer);
  }, [messages, open]);

  async function sendMessage(text = input.trim()) {
    if (!text || loading) return;
    setMessages((current) => [...current, { id: `u-${Date.now()}`, role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      if (!response.ok || data.error) throw new Error(data.error ?? "Yanıt alınamadı");

      setMessages((current) => [
        ...current,
        {
          id: `b-${Date.now()}`,
          role: "bot",
          text: String(data.reply ?? data.answer ?? "Bu soruya güvenli bir yanıt üretemedim."),
          sourceMode: data.sourceMode,
        },
      ]);
    } catch (error) {
      const errorText = error instanceof Error ? error.message : "Bağlantı hatası";
      setMessages((current) => [
        ...current,
        {
          id: `e-${Date.now()}`,
          role: "bot",
          error: true,
          text: `Bağlantı sorunu oluştu: ${errorText}. Birkaç saniye sonra tekrar dene.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <motion.button
        type="button"
        aria-label="KPSS Tarih Rehberi"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-24 right-5 z-[65] grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950 text-white shadow-[0_18px_45px_rgba(30,58,138,.38)] ring-1 ring-white/20 lg:bottom-6 lg:right-6"
        whileHover={{ y: -2, scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        {open ? <X size={22} /> : <BotMessageSquare size={24} />}
        {!open ? <span className="absolute -right-1 -top-1 size-3 rounded-full bg-amber-400 ring-4 ring-white dark:ring-slate-950" /> : null}
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className={cn(
              panelSize,
              "overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/96 shadow-[0_24px_80px_rgba(15,23,42,.24)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/96",
            )}
          >
            <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-blue-800 via-indigo-800 to-slate-950 px-5 py-4 text-white">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-amber-400/20 blur-3xl" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/12 ring-1 ring-white/20">
                    <Sparkles size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black tracking-tight">KPSS Tarih Rehberi</p>
                    <p className="mt-0.5 text-xs font-medium text-blue-100">Veri havuzu öncelikli akıllı asistan</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setExpanded((value) => !value)}
                    className="grid size-8 place-items-center rounded-xl text-white/70 transition hover:bg-white/10 hover:text-white"
                    aria-label={expanded ? "Küçült" : "Büyüt"}
                  >
                    {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="grid size-8 place-items-center rounded-xl text-white/70 transition hover:bg-white/10 hover:text-white"
                    aria-label="Kapat"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              <div className="relative mt-4 flex flex-wrap gap-2 text-[11px] font-bold text-blue-50">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 ring-1 ring-white/15"><Database size={13} /> Site havuzu</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 ring-1 ring-white/15"><ShieldCheck size={13} /> Yanlış eşleşmeye kilit</span>
              </div>
            </header>

            <div className="flex h-[calc(100%-148px)] flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
                {messages.map((message) => (
                  <div key={message.id} className={cn("flex gap-2", message.role === "user" ? "justify-end" : "justify-start")}>
                    {message.role === "bot" ? (
                      <div className="mt-1 grid size-8 shrink-0 place-items-center rounded-xl bg-blue-700 text-white shadow-sm">
                        <BotMessageSquare size={16} />
                      </div>
                    ) : null}
                    <div className={cn("max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-6", message.role === "user" ? "bg-blue-700 text-white shadow-lg shadow-blue-700/20" : "border border-slate-200 bg-slate-50 text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-100", message.error && "border-red-200 bg-red-50 text-red-700")}> 
                      {message.role === "bot" ? (
                        <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-white/10">
                          <CheckCircle2 size={11} /> {sourceLabel(message.sourceMode)}
                        </div>
                      ) : null}
                      <p>{renderText(message.text)}</p>
                    </div>
                  </div>
                ))}
                {loading ? (
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Loader2 className="animate-spin" size={16} /> Site veri havuzu taranıyor...
                  </div>
                ) : null}
                <div ref={endRef} />
              </div>

              {messages.length === 1 && !loading ? (
                <div className="border-t border-slate-200/70 px-4 py-3 dark:border-white/10">
                  <p className="mb-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Hızlı doğrulama</p>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => sendMessage(prompt)}
                        className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="border-t border-slate-200/70 bg-white/95 p-3 dark:border-white/10 dark:bg-slate-950/95">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 ring-blue-500/10 focus-within:ring-4 dark:border-white/10 dark:bg-white/5">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    placeholder="Örn: Put kırıcı kimdir?"
                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-60 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || loading}
                    className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-700 text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Gönder"
                  >
                    <Send size={17} />
                  </button>
                </div>
                <p className="mt-2 text-center text-[10px] font-semibold text-slate-400">Önce site havuzu taranır; emin olmayan bilgi uydurulmaz.</p>
              </div>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}
