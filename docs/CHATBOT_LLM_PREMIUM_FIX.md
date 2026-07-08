# Chatbot LLM Premium Fix

Bu paket chatbot'u teknik/amatör görünümlü fallback mesajlarından çıkarıp premium KPSS Tarih öğretmeni davranışına taşır.

## Değişenler

- Chatbot header'ındaki eski rozetler kaldırıldı.
- Panel okunabilir, yazılabilir ve mobil uyumlu hale getirildi.
- Input `textarea` olarak yenilendi; Enter gönderir, Shift+Enter satır açar.
- `/api/chat`, `/api/kpss-tutor`, `/api/gemini`, `/api/ai` tek bir tutor motoruna bağlandı.
- Tutor motoru sıralaması:
  1. Sabit kritik KPSS gerçekleri
  2. Uygulama konu / kavram / soru / timeline havuzu
  3. Vercel ortamında `GEMINI_API_KEY` varsa gerçek Gemini LLM cevabı
  4. Anahtar yoksa teknik hata göstermeyen yerel öğretmen cevabı
- Vercel build'e `audit-chatbot-llm.mjs` eklendi.

## Not

Gerçek çevrim içi LLM cevabı için Vercel Project Settings > Environment Variables bölümüne `GEMINI_API_KEY` eklenmelidir. Kod, anahtar yokken de kullanıcıya teknik hata göstermez.
