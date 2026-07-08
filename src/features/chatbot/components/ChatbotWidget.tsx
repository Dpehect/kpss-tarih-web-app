"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BotMessageSquare, Send, X, ChevronDown } from "lucide-react";
import { topics, questions, glossary } from "@/data/kpss-history";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
};

// ─── Offline KPSS Tarih Yanıt Motoru ────────────────────────────────────────

function normalize(text: string) {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
}

function generateReply(userMessage: string): string {
  const msg = normalize(userMessage);

  // Selamlama
  if (/^(merhaba|selam|iyi|hey|naber)/.test(msg)) {
    return "Merhaba! Ben KPSS Tarih çalışma asistanınım. Konu özetleri, kavramlar veya tarih soruları hakkında sorularını yanıtlayabilirim.";
  }

  // Yardım
  if (/yardim|ne yapabilirsin|ne biliyorsun/.test(msg)) {
    return "KPSS Tarih konularında şunları yapabilirim:\n• Konu özetleri sunmak\n• Kavram tanımları açıklamak\n• Önemli tarih ve olayları anlatmak\n• Sınavda sık sorulan konuları vurgulamak\n\nHangi konu veya kavramı merak ediyorsunuz?";
  }

  // Konu araması
  for (const topic of topics) {
    const topicNorm = normalize(topic.title);
    const keywords = topic.keywords.map(normalize);

    if (msg.includes(topicNorm) || keywords.some((k) => msg.includes(k))) {
      const summary = topic.summary[0];
      const mustKnow = topic.mustKnow.slice(0, 3).join(", ");
      return `**${topic.title}**\n\n${summary?.body ?? topic.shortDescription}\n\n📌 Kesinlikle bilinmesi gerekenler:\n${mustKnow}\n\n⚠️ Sık yapılan hata: ${topic.commonMistakes[0] ?? "Kavram ve dönem ilişkisini karıştırmak"}`;
    }
  }

  // Kavram/glossary araması
  for (const item of glossary) {
    const termNorm = normalize(item.term);
    if (msg.includes(termNorm) || termNorm.includes(msg)) {
      return `**${item.term}**\n\n${item.definition}\n\n${item.example ? `Örnek: ${item.example}` : ""}`;
    }
  }

  // Soru araması (konu bazlı)
  for (const q of questions) {
    const stemNorm = normalize(q.stem);
    if (msg.split(" ").filter((w) => w.length > 4).some((w) => stemNorm.includes(w))) {
      const correct = q.choices.find((c) => c.id === q.correctChoiceId);
      return `Bu konuyla ilgili örnek bir soru:\n\n**${q.stem}**\n\nDoğru cevap: ${correct?.id ?? "?"}) ${correct?.text ?? ""}\n\n📖 Açıklama: ${q.explanation}`;
    }
  }

  // Tarihsel dönem soruları
  if (/kut|tan[rı]i/.test(msg)) {
    return "**Kut Anlayışı:**\nTürklerde yönetme yetkisini simgeleyen, Tanrı tarafından bağışlanan siyasi güçtür. Kalıtsal değil, Tanrı''nın takdirine bağlıdır; bu nedenle her an geri alınabilir.";
  }
  if (/timar|sipahi/.test(msg)) {
    return "**Tımar Sistemi:**\nOsmanlı''da askerlik hizmeti karşılığında belirli bir bölgenin vergi gelirinin sipahiye bırakılmasıdır. Mülkiyet değil, gelir devri söz konusudur. Merkezi otoritenin taşraya uzanmasını sağlamıştır.";
  }
  if (/tanzimat|islahat|mesrutiyet/.test(msg)) {
    return "**Osmanlı Yenileşme Süreci:**\n• Tanzimat Fermanı (1839) – Abdülmecit döneminde ilan edilmiş, eşitlik ilkelerini getirmiştir.\n• Islahat Fermanı (1856) – Gayrimüslim haklarını genişletmiştir.\n• I. Meşrutiyet (1876) – Kanun-i Esasi ilan edilmiştir.\n• II. Meşrutiyet (1908) – İttihat ve Terakki dönemi başlamıştır.";
  }
  if (/mondros|lozan|sevr|mudanya/.test(msg)) {
    return "**Önemli Antlaşmalar:**\n• Mondros (30 Ekim 1918) – Osmanlı''nın I. Dünya Savaşı''ndan çekilişi.\n• Sevr (1920) – TBMM tarafından tanınmamıştır.\n• Mudanya (1922) – Ateşkes; İstanbul ve Trakya TBMM''ye bırakıldı.\n• Lozan (24 Temmuz 1923) – Türkiye''nin uluslararası bağımsızlığını tescil eden antlaşma.";
  }
  if (/saltanat|halifelik/.test(msg)) {
    return "**Kritik Tarih Ayrımı:**\n• Saltanat: 1 Kasım 1922''de kaldırılmıştır.\n• Halifelik: 3 Mart 1924''te kaldırılmıştır.\n\nBu iki tarihi karıştırmak KPSS''nin en sık hata yaptırdığı noktalardan biridir!";
  }
  if (/ataturk ilkeleri|alti ok/.test(msg)) {
    return "**Atatürk''ün Altı İlkesi (Altı Ok):**\n1. Cumhuriyetçilik\n2. Milliyetçilik\n3. Halkçılık\n4. Devletçilik\n5. Laiklik\n6. İnkılapçılık\n\nBu ilkelerin her biri belirli inkılaplarla doğrudan ilişkilidir. Hangi ilkeyi merak ediyorsunuz?";
  }

  // Sınav ipucu
  if (/ipucu|strateji|nasil calisayim|tavsiye/.test(msg)) {
    return "**KPSS Tarih Çalışma Stratejisi:**\n1. Önce konu özetini oku, ana kavramları not al.\n2. Kronoloji: yüzyıl filtresi kur, sonra tarihleri sırala.\n3. Benzer kurumları (tımar/devşirme/vakıf) karşılaştırmalı öğren.\n4. Her konudan en az 10 soru çöz; yanlışları not et.\n5. Son 2 haftada yalnızca yanlış yaptığın konulara odaklan.";
  }

  // Genel fallback
  const topicList = topics
    .slice(0, 6)
    .map((t) => t.title)
    .join(", ");
  return `Bu konuda spesifik bir bilgim bulunamadı. Şu konularda yardımcı olabilirim: ${topicList}...\n\nDaha net bir konu veya kavram adı yazarsanız daha ayrıntılı bilgi verebilirim.`;
}

// ─── Bileşen ─────────────────────────────────────────────────────────────────

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Merhaba! Ben KPSS Tarih çalışma asistanınım. Konu özetleri, kavramlar ve tarih soruları hakkında sorularını yanıtlayabilirim.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [messages, open]);

  function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply = generateReply(text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + "-bot", role: "bot", text: reply },
      ]);
      setLoading(false);
    }, 420);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="KPSS Tarih Asistanı"
        className="fixed bottom-24 right-5 z-[60] grid size-14 place-items-center rounded-full bg-gradient-to-br from-blue-700 to-indigo-800 text-white shadow-[0_8px_32px_rgba(30,58,138,.42)] transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(30,58,138,.52)] lg:bottom-6 lg:right-6"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        {open ? <X size={22} /> : <BotMessageSquare size={22} />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-44 right-5 z-[59] flex h-[520px] w-[min(92vw,400px)] flex-col overflow-hidden rounded-[1.8rem] border border-white/12 bg-[var(--sb-surface-strong)] shadow-[0_32px_100px_rgba(15,23,42,.28)] backdrop-blur-2xl lg:bottom-24 lg:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[var(--sb-line)] bg-gradient-to-r from-blue-700 to-indigo-800 px-5 py-4">
              <div className="grid size-9 place-items-center rounded-2xl bg-white/15">
                <BotMessageSquare size={18} className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-white">KPSS Tarih Asistanı</p>
                <p className="text-[11px] text-white/70">Konu, kavram ve soru sora bilirsin</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-8 place-items-center rounded-xl text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Kapat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="scrollbar-clean flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-[1.1rem] px-4 py-2.5 text-sm leading-6 ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white"
                        : "border border-[var(--sb-line)] bg-[var(--sb-surface)] text-[var(--sb-text)]"
                    }`}
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-[1.1rem] border border-[var(--sb-line)] bg-[var(--sb-surface)] px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="size-2 rounded-full bg-[var(--sb-text-muted)]"
                          style={{
                            animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[var(--sb-line)] p-3">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Konu veya kavram sor..."
                  className="min-w-0 flex-1 rounded-2xl border border-[var(--sb-line)] bg-[var(--sb-surface)] px-4 py-2.5 text-sm text-[var(--sb-text)] outline-none transition placeholder:text-[var(--sb-text-muted)] focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/10"
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40"
                  aria-label="Gönder"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-[var(--sb-text-muted)]">
                Konu adı, kavram veya tarih hakkında soru sorabilirsin
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
