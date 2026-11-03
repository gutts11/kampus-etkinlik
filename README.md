[https://sprint-03-gamma.vercel.app/](https://sprint-03-gamma.vercel.app/)

# Kampüs Etkinlikleri - Sprint 4 (Vite, TypeScript ve React)

Bu proje, Kampüs Etkinlikleri uygulamasının React ve TypeScript (Vite `react-ts` şablonu) kullanılarak geliştirilmiş versiyonudur.

## Öğrenci Bilgileri

- **Öğrenci Adı:** Alperen
- **Öğrenci No:** `2011012045`
- **Hesaplanan Ton:** `205` (`mod(2011012045, 360) = 205`)
- **Hesaplanan Font (Son hane 5):** `"Times New Roman", Times, serif`

## Adım 2: Proje Dosyaları ve Görevleri

- **`package.json`**: Proje adını, çalıştırma/derleme komutlarını (`dev`, `build`, `preview`) ve bağımlı paket listesini tutar.
- **`package-lock.json`**: Yüklenen tüm paketlerin ve alt bağımlılıklarının tam sürüm ağaçlarını kilitler.
- **`node_modules/`**: İndirilen harici kütüphanelerin bulunduğu klasördür; `.gitignore` ile GitHub'a gönderilmez.
- **`tsconfig*.json`**: TypeScript derleyicisinin sıkı tip denetimi ve modül çözümleme ayarlarını içerir.
- **`vite.config.ts`**: Vite geliştirme sunucusu ve üretim derlemesi yapılandırmasını, React eklentisini barındırır.
- **`index.html`**: Uygulamanın tek HTML sayfasıdır; React bileşenlerinin içine çizileceği boş `<div id="root">` elemanını taşır.
- **`src/main.tsx`**: React uygulamasını başlatır ve `createRoot` ile `App` bileşenini `#root` elemanına bağlar.
- **`src/App.tsx`**: Uygulamanın ana bileşenidir; 5 sayfanın tamamını, state yönetimini (`useState`) ve sekme başlığı efektini (`useEffect`) barındırır.
- **`src/App.css`**: Uygulamanın öğrenci numarasına göre özelleştirilmiş (Sprint 2/3'ten taşınan) tüm görsel stillerini içerir.
- **`src/index.css`**: Tüm sayfaya uygulanan genel sıfırlama/temel stil dosyasıdır (bu sprintte boş bırakılmıştır).
- **`public/`**: Vite tarafından işlenmeden doğrudan kök dizine kopyalanan statik dosyaları (`afis.svg`, `favicon.svg`) tutar.
- **`src/types/campus-event.ts`**: Etkinlik nesnesinin yapısını (`CampusEvent` arayüzü) ve `Category` birleşim tipini (`union type`) tanımlar.
- **`src/data/events.ts`**: `CampusEvent[]` tipinde en az 6 örnek kampüs etkinliği verisini barındırır.
- **`src/utils/filter-events.ts`**: DOM'a dokunmadan çalışan saf (pure) arama (`searchEvents`), kategori filtreleme (`filterByCategory`) ve ID ile bulma (`findEventById`) fonksiyonlarını içerir.
