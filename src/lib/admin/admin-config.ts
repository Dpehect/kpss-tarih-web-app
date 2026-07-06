/**
 * Sadece bu email admin kabul edilir.
 * Kullanıcının verdiği hesabı geçerli Gmail formatına çevirerek ekledik.
 */
export const ADMIN_EMAILS = ["gurlekyunusemre2@gmail.com"];

export function isAdminEmail(email?: string | null) {
  if (!email) return false;

  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}
