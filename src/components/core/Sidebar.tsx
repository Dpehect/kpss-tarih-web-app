const navigation = [
  ["Dashboard", "/"],
  ["Konular", "/topics"],
  ["Timeline", "/timeline"],
  ["Flashcard", "/flashcards"],
  ["Soru Bankası", "/question-bank"],
  ["Denemeler", "/exams"]
];

export function Sidebar() {
  return (
    <aside className="hidden rounded-[2rem] border border-black/5 bg-white/55 p-3 backdrop-blur-xl lg:block">
      <nav className="space-y-1">
        {navigation.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="block rounded-2xl px-4 py-3 text-sm text-neutral-700 transition hover:bg-black/[0.04] hover:text-neutral-950"
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
