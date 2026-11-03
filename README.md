[https://muhammedalperenturan-frontend.vercel.app](https://muhammedalperenturan-frontend.vercel.app)

# Kampüs Etkinlikleri — Sprint 6 ve Vize Projesi (React Router, Context API & Form Mimarisi)

Bu proje, Kampüs Etkinlikleri uygulamasının **React Router v7 (`react-router-dom`)**, **Context API (`EventsContext`)** ve **Controlled Form Doğrulama (`validateEvent`)** mimarisiyle geliştirilmiş 10 sayfalı vize teslim sürümüdür.

## Öğrenci Bilgileri

- **Öğrenci Adı:** Alperen
- **Öğrenci No:** `2011012045`
- **Hesaplanan Ton:** `205` (`mod(2011012045, 360) = 205`)
- **Hesaplanan Font (Son hane 5):** `"Times New Roman", Times, serif`

## Route Haritası (10 Adres, 10 Sayfa)

| Adres | Sayfa Bileşeni | Açıklama |
| :--- | :--- | :--- |
| `/` | `HomePage` | Tarihi en yakın 2 etkinliği ve tüm etkinliklere geçiş bağlantısını gösterir. |
| `/events` | `EventsPage` | Canlı arama ve kategori filtresiyle tüm etkinlikleri listeler. |
| `/events/:id` | `EventDetailPage` | Adresteki ID'ye göre etkinliğin afişini, künyesini ve açıklamasını gösterir. |
| `/admin` | `AdminPage` | Etkinlik yönetim tablosu (masaüstünde tablo, mobilde kart görünümü; onaylı silme). |
| `/admin/new` | `AddEventPage` | Doğrulamalı yeni etkinlik ekleme formu. |
| `/admin/:id/edit` | `EditEventPage` | Mevcut etkinliği düzenleme ve güncelleme formu. |
| `/login` | `LoginPage` | E-posta ve şifre doğrulamalı giriş sayfası. |
| `/register` | `RegisterPage` | Ad soyad, e-posta ve şifre eşleşme kontrollü kayıt sayfası. |
| `/forgot-password` | `ForgotPasswordPage` | E-posta doğrulamalı şifre sıfırlama sayfası. |
| `*` | `NotFoundPage` | Geçersiz adres veya bulunamayan etkinlikler için 404 hata sayfası. |

## Klasör ve Dosya Yapısı (`frontend/`)

- **`src/context/EventsContext.tsx`**: Merkezi `events` listesini ve `addEvent`, `updateEvent`, `deleteEvent` fonksiyonlarını sağlayan Context yapısı.
- **`src/pages/`**: 10 route'a karşılık gelen 10 sayfa bileşeni (`HomePage`, `EventsPage`, `EventDetailPage`, `AdminPage`, `AddEventPage`, `EditEventPage`, `LoginPage`, `RegisterPage`, `ForgotPasswordPage`, `NotFoundPage`).
- **`src/components/layout/`**: `Header` (route'a göre dinamik başlık ve `document.title`), `Navigation` (`NavLink` ile aktif sayfa vurgusu) ve `Footer`.
- **`src/components/events/`**: `EventCard`, `EventList`, `EventFilter`, `EventDetail`.
- **`src/components/forms/`**: `EventForm` (controlled input'lar ve `noValidate` ile özel hata mesajları).
- **`src/utils/`**: `filter-events.ts`, `format-date.ts` ve `validate-event.ts`.
- **`src/types/campus-event.ts`**: `Category`, `CampusEvent` ve `EventFormData` tip tanımları.
- **`src/data/events.ts`**: Başlangıçtaki 6 kampüs etkinliği verisi.
