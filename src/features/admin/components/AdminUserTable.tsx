import type { AdminUserRow } from "@/lib/admin/admin-service";

export function AdminUserTable({ users }: { users: AdminUserRow[] }) {
  return (
    <section className="rounded-[2rem] border border-[#d8c7ad] bg-white p-5 shadow-[0_24px_80px_rgba(16,24,40,.09)]">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9a5d13]">Kullanıcılar</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.055em] text-[#101828]">Aktif kullanıcı verileri</h2>
        </div>
        <p className="text-sm font-bold text-[#475467]">Son aktiviteye göre sıralanır.</p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-[#eadfce] bg-[#fffaf3]">
        <table className="min-w-[980px] w-full border-separate border-spacing-0 text-left">
          <thead>
            <tr className="bg-[#fff3df]">
              {["Kullanıcı", "Konu", "Soru", "Doğru", "Flashcard", "Deneme", "Not", "Son aktivite"].map((heading) => (
                <th
                  key={heading}
                  className="border-b border-[#dcc7a6] px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#7a4a13]"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-8 text-center text-sm font-bold text-[#475467]">
                  Henüz kullanıcı verisi yok.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="bg-white transition hover:bg-[#fffaf3]">
                  <td className="border-b border-[#eadfce] px-5 py-5">
                    <p className="text-sm font-black text-[#101828]">{user.fullName ?? "İsimsiz kullanıcı"}</p>
                    <p className="mt-1 text-xs font-bold text-[#667085]">{user.email ?? user.id}</p>
                  </td>
                  <NumberCell value={user.completedTopics} />
                  <NumberCell value={user.questionAttempts} />
                  <NumberCell value={user.correctAnswers} />
                  <NumberCell value={user.flashcardReviews} />
                  <NumberCell value={user.examResults} />
                  <NumberCell value={user.notes} />
                  <td className="border-b border-[#eadfce] px-5 py-5 text-sm font-black text-[#344054]">
                    {formatDate(user.lastActivity)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function NumberCell({ value }: { value: number }) {
  return (
    <td className="border-b border-[#eadfce] px-5 py-5 text-sm font-black tabular-nums text-[#344054]">
      {value}
    </td>
  );
}

function formatDate(value: string | null) {
  if (!value) return "Yok";

  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}
