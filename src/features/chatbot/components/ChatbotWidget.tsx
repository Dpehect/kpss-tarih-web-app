"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BotMessageSquare, Send, X, Sparkles, RotateCcw, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  error?: boolean;
};

type HistoryItem = { role: "user" | "bot"; text: string };

const QUICK_PROMPTS = [
  "Kut anlayışı nedir?",
  "Tanzimat ile Islahat farkı?",
  "Saltanat ne zaman kaldırıldı?",
  "Lozan'da neler düzenlendi?",
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Merhaba! Ben KPSS Tarih asistanınım, Gemini AI ile çalışıyorum. Konu özetleri, kavramlar, tarihler veya sınav stratejisi hakkında her şeyi sorabilirsin. 🎯",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 100);
    }
  }, [messages, open]);

  async function sendMessage(text: string = input.trim()) {
    if (!text || loading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Konuşma geçmişini oluştur (welcome mesajı hariç)
    const history: HistoryItem[] = messages
      .filter((m) => m.id !== "welcome" && !m.error)
      .map((m) => ({ role: m.role, text: m.text }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error ?? "Sunucu hatası");
      }

      setMessages((prev) => [
        ...prev,
        { id: `b-${Date.now()}`, role: "bot", text: data.reply },
      ]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Bağlantı hatası";
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "bot",
          text: errMsg.includes("GEMINI_API_KEY")
            ? "⚠️ GEMINI_API_KEY ayarlanmamış. Lütfen .env.local dosyasına API anahtarınızı ekleyin: GEMINI_API_KEY=..."
            : `⚠️ Hata: ${errMsg}. Lütfen tekrar deneyin.`,
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function clearChat() {
    setMessages([
      {
        id: "welcome",
        role: "bot",
        text: "Sohbet sıfırlandı. Yeni sorun nedir? 🎯",
      },
    ]);
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="KPSS Tarih AI Asistanı"
        className="fixed bottom-24 right-5 z-[60] flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-indigo-800 text-white shadow-[0_8px_32px_rgba(30,58,138,.45)] lg:bottom-6 lg:right-6"
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.92 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <BotMessageSquare size={22} />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-blue-600/30 animate-ping" style={{ animationDuration: "2.4s" }} />
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed bottom-44 right-5 z-[59] flex flex-col overflow-hidden rounded-[1.8rem] border border-white/10 shadow-[0_32px_100px_rgba(15,23,42,.3)] backdrop-blur-2xl transition-[width,height] duration-300 lg:bottom-24 lg:right-6",
              expanded ? "w-[min(96vw,720px)]" : "w-[min(94vw,420px)]"
            )}
            style={{ 
              height: expanded ? "min(780px, calc(100dvh - 110px))" : "min(580px, calc(100dvh - 160px))", 
              background: "var(--sb-surface-strong)" 
            }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-gradient-to-r from-blue-700 to-indigo-800 px-5 py-4">
              <div className="grid size-9 shrink-0 place-items-center rounded-2xl bg-white/15">
                <Sparkles size={17} className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-black text-white">KPSS Tarih AI</p>
                <p className="text-[11px] text-white/65">Gemini ile güçlendirilmiş asistan</p>
              </div>
              <button
                type="button"
                onClick={clearChat}
                title="Sohbeti sıfırla"
                className="grid size-8 place-items-center rounded-xl text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                title={expanded ? "Küçült" : "Genişlet"}
                className="grid size-8 place-items-center rounded-xl text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-8 place-items-center rounded-xl text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Kapat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "bot" && (
                    <div className="mr-2 mt-1 grid size-7 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                      <Sparkles size={12} />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-[1.1rem] px-4 py-2.5 text-[13px] leading-6 ${
                      msg.role === "user"
                        ? "rounded-br-sm bg-gradient-to-br from-blue-600 to-indigo-700 text-white"
                        : msg.error
                        ? "rounded-bl-sm border border-red-200 bg-red-50 text-red-700"
                        : "rounded-bl-sm border border-[var(--sb-line)] bg-[var(--sb-surface)] text-[var(--sb-text)]"
                    }`}
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex items-start justify-start gap-2">
                  <div className="grid size-7 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                    <Sparkles size={12} />
                  </div>
                  <div className="rounded-[1.1rem] rounded-bl-sm border border-[var(--sb-line)] bg-[var(--sb-surface)] px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="size-2 rounded-full bg-blue-500"
                          style={{ animation: `sb-bounce 1.2s ease-in-out ${i * 0.18}s infinite` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick prompts (shown when only welcome message) */}
            {messages.length === 1 && !loading && (
              <div className="shrink-0 border-t border-[var(--sb-line)] px-4 py-3">
                <p className="mb-2 text-[10px] font-black uppercase tracking-wider text-[var(--sb-text-muted)]">Hızlı sorular</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      className="rounded-full border border-[var(--sb-line)] bg-[var(--sb-surface)] px-3 py-1 text-[11px] font-semibold text-[var(--sb-text-soft)] transition hover:border-blue-500/30 hover:bg-blue-600/5 hover:text-blue-700"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="shrink-0 border-t border-[var(--sb-line)] p-3">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Konu, kavram veya tarih sor..."
                  disabled={loading}
                  className="min-w-0 flex-1 rounded-2xl border border-[var(--sb-line)] bg-[var(--sb-surface)] px-4 py-2.5 text-[13px] text-[var(--sb-text)] outline-none transition placeholder:text-[var(--sb-text-muted)] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                />
                <motion.button
                  type="button"
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md disabled:opacity-40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Gönder"
                >
                  <Send size={15} />
                </motion.button>
              </div>
              <p className="mt-2 text-center text-[10px] text-[var(--sb-text-muted)]">
                Gemini AI · Yalnızca KPSS Tarih konularında
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes sb-bounce {
          0%, 100% { transform: translateY(0); opacity: .6; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
