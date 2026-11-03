[https://muhammedalperenturan-frontend.vercel.app](https://muhammedalperenturan-frontend.vercel.app)

# Kampüs Etkinlikleri — Frontend (Sprint 6 & Vize)

## Kurulum ve Çalıştırma

```bash
cd frontend
npm install
npm run dev
```

Üretim derlemesi almak için:

```bash
npm run build
npm run preview
```

## Özellikler
- **10 Route & 10 Sayfa**: `/`, `/events`, `/events/:id`, `/admin`, `/admin/new`, `/admin/:id/edit`, `/login`, `/register`, `/forgot-password`, `*` (`NotFoundPage`).
- **Context API (`EventsContext`)**: `events`, `addEvent`, `updateEvent`, `deleteEvent` ile merkezi durum yönetimi.
- **Form Doğrulama**: `validateEvent` ile etkinlik ekleme/güncelleme, giriş, kayıt ve şifremi unuttum formlarında anlık hata kontrolü.
- **Responsive Tasarım**: Masaüstünde yönetim tablosu, mobilde (`<= 699px`) kart görünümü.
