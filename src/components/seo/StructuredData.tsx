export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "KPSS Tarih Akademi",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    description:
      "KPSS Tarih için konu özetleri, açıklamalı sorular, denemeler, flashcard tekrarları ve online ilerleme takibi sunan çalışma platformu.",
    educationalCredentialAwarded: "KPSS hazırlık",
    inLanguage: "tr-TR"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  );
}
