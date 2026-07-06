"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MainError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="grid min-h-[60vh] place-items-center">
      <div className="w-full max-w-2xl rounded-[2.5rem] border border-[var(--border-soft)] bg-[rgba(255,248,234,.92)] p-8 text-center shadow-[var(--shadow-md)] backdrop-blur-2xl">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#fff0e9] text-[#9a3412]">
          <AlertTriangle size={30} />
        </span>
        <h1 className="mt-7 text-4xl font-black tracking-[-0.07em] text-[var(--navy-900)]">
          Bu bölüm yüklenirken sorun oluştu.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-7 text-[var(--text-secondary)]">
          Geçici bir istemci hatası olabilir. Tekrar dene butonuyla bölümü yeniden yükleyebilirsin.
        </p>
        {error?.digest ? (
          <p className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-black text-[var(--text-muted)]">
            Hata kodu: {error.digest}
          </p>
        ) : null}
        <div className="mt-7 flex justify-center">
          <Button type="button" variant="gold" onClick={reset}>
            <RefreshCcw size={18} />
            Tekrar dene
          </Button>
        </div>
      </div>
    </section>
  );
}
