import { PageHeader } from "@/components/core/PageHeader";
import { flashcards, topics } from "@/data/kpss-history";
import { FlashcardTrainer } from "@/features/flashcards/components/FlashcardTrainer";

/**
 * Flashcard sayfası.
 * Emoji kullanılmaz; sade, modern ve düzenli bir tekrar ekranı sunar.
 */
export function FlashcardsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={`${flashcards.length} Flashcard`}
        title="Kartı sürükle, çevir, hatırla."
        description="Sağa sürükle: biliyorum. Sola sürükle: tekrar gerekli. Kartlar konuya göre filtrelenir ve ilerleme dashboard verilerine bağlanır."
        actions={
          <a
            href="/analytics"
            className="inline-flex rounded-full bg-[#f2c15f] px-5 py-3 font-black text-[#120b07] transition hover:-translate-y-1"
          >
            Tekrar analizini gör
          </a>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
          <p className="text-sm text-[#ead7b7]/58">Toplam kart</p>
          <p className="mt-2 text-3xl font-black tracking-[-0.06em]">{flashcards.length}</p>
          <p className="mt-2 text-sm leading-6 text-[#ead7b7]/58">Aktif hatırlama için hazır kart sayısı.</p>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
          <p className="text-sm text-[#ead7b7]/58">Konu desteği</p>
          <p className="mt-2 text-3xl font-black tracking-[-0.06em]">{topics.length} başlık</p>
          <p className="mt-2 text-sm leading-6 text-[#ead7b7]/58">Kartları konu bazlı filtreleyebilirsin.</p>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
          <p className="text-sm text-[#ead7b7]/58">Etkileşim</p>
          <p className="mt-2 text-3xl font-black tracking-[-0.06em]">Drag + flip</p>
          <p className="mt-2 text-sm leading-6 text-[#ead7b7]/58">Kart gerçekten hareket eder, cevap taşmaz.</p>
        </article>
      </section>

      <FlashcardTrainer cards={flashcards} topics={topics} />
    </div>
  );
}
