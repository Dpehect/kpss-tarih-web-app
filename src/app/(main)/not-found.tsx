import { ArrowLeft, Search } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export default function MainNotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center">
      <div className="surface-dark relative w-full max-w-3xl overflow-hidden rounded-[2.75rem] p-8 text-center md:p-12">
        <div className="absolute right-[-5rem] top-[-5rem] size-64 rounded-full bg-[rgba(201,162,39,.18)] blur-3xl" />
        <p className="kicker">404</p>
        <h1 className="heading-display relative z-10 mt-5 text-5xl text-[var(--text-inverse)] md:text-7xl">
          Bu bölüm bulunamadı.
        </h1>
        <p className="relative z-10 mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--text-inverse-muted)]">
          Aradığın içerik taşınmış olabilir. Dashboard’a dönebilir veya arama yapabilirsin.
        </p>
        <div className="relative z-10 mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/dashboard" variant="gold">
            <ArrowLeft size={18} />
            Dashboard’a dön
          </ButtonLink>
          <ButtonLink href="/search" variant="ghost">
            <Search size={18} />
            Arama yap
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
