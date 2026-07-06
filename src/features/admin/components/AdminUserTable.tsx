import type { AdminUserRow } from "@/lib/admin/admin-service";

export function AdminUserTable({ users }: { users: AdminUserRow[] }) {
  return (
    <section className="rounded-[2rem] parchment-surface p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f6c465]">Kullanıcılar</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">Aktif kullanıcı verileri</h2>
        </div>
        <p className="text-sm text-[#ead7b7]/58">Son aktiviteye göre sıralanır.</p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-[960px] w-full border-separate border-spacing-y-2 text-left">
          <thead>
            <tr className="text-xs uppercase tracking-[0.18em] text-[#ead7b7]/46">
              <th className="px-4 py-2">Kullanıcı</th>
              <th className="px-4 py-2">Konu</th>
              <th className="px-4 py-2">Soru</th>
              <th className="px-4 py-2">Doğru</th>
              <th className="px-4 py-2">Flashcard</th>
              <th className="px-4 py-2">Deneme</th>
              <th className="px-4 py-2">Not</th>
              <th className="px-4 py-2">Son aktivite</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={8} className="rounded-2xl bg-white/[0.055] px-4 py-5 text-[#ead7b7]/64">
                  Henüz kullanıcı verisi yok.
                </td>
              </tr>
            ) : users.map((user) => (
              <tr key={user.id} className="bg-white/[0.055] text-sm text-[#ead7b7]/76">
                <td className="rounded-l-2xl px-4 py-4">
                  <p className="font-black text-[#fff8e8]">{user.fullName ?? "İsimsiz kullanıcı"}</p>
                  <p className="mt-1 text-xs text-[#ead7b7]/52">{user.email ?? user.id}</p>
                </td>
                <td className="px-4 py-4">{user.completedTopics}</td>
                <td className="px-4 py-4">{user.questionAttempts}</td>
                <td className="px-4 py-4">{user.correctAnswers}</td>
                <td className="px-4 py-4">{user.flashcardReviews}</td>
                <td className="px-4 py-4">{user.examResults}</td>
                <td className="px-4 py-4">{user.notes}</td>
                <td className="rounded-r-2xl px-4 py-4">{formatDate(user.lastActivity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function formatDate(value: string | null) {
  if (!value) return "Yok";

  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}
