# Chatbot fallback düzeltmesi

Bu paket chatbot'un kullanıcıya teknik API anahtarı, model durumu veya güven kıran eşleşme mesajları göstermesini engeller.

## Değişiklikler

- `/api/chat`, `/api/kpss-tutor`, `/api/gemini`, `/api/ai` aynı güvenli tutor handler'ına bağlandı.
- Yerel bilgi havuzu önceliklidir.
- Yerel bilgi yeterli değilse ve Gemini anahtarı varsa model yanıtı kullanılır.
- Model anahtarı yoksa kullanıcıya teknik hata gösterilmez; netleştirici ve profesyonel bir öğretmen cevabı döner.
- Vercel build sırasında `scripts/audit-chatbot-copy.mjs` çalışır.
