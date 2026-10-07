[https://kampus-etkinlik-sprint1.vercel.app](https://kampus-etkinlik-sprint1.vercel.app)

# Kampüs Etkinlikleri - Sprint 1, Sprint 2 & Sprint 3

Bu proje, üniversite kampüsündeki seminer, atölye, söyleşi ve konferans etkinliklerini tek bir platformda toplamak amacıyla geliştirilmiştir.

## Proje Yapısı

```
Lecture_1/
├── css/
│   ├── numaran.css        # Sprint 2 CSS değişkenleri, duyarlı (responsive) grid ve bileşen stilleri
│   └── 20231047.css       # Öğrenci numarasına özel CSS dosyası
├── js/
│   ├── data.js            # Etkinlik verilerini barındıran modül (en az 6 etkinlik)
│   ├── event-list.js      # Etkinlik kartlarını üreten, sıralayan ve arama/kategori filtrelemesini çalıştıran modül
│   ├── event-detail.js    # ?id= parametresine göre etkinlik detayını gösteren veya hata kutusu basan modül
│   └── event-form.js      # Ekleme ve güncelleme formlarının novalidate doğrulamalarını yapan modül
├── index.html             # Ana sayfa (Tarihi en yakın 2 etkinlik data-limit="2" ile listelenir)
├── etkinlikler.html       # Tüm etkinlikler ve arama + kategori filtre alanı
├── etkinlik-detay.html    # Etkinlik afişi, künye detayları ve güncelleme bağlantısı
├── etkinlik-ekle.html     # Yeni etkinlik ekleme formu
├── etkinlik-guncelle.html  # Detay sayfasından yönlendirilen ve verileri dolu gelen güncelleme formu
├── afis.jpg               # Etkinlik detay görseli
├── .gitignore
└── README.md
```

## Sprint Detayları

### Sprint 1: Semantik HTML Yapısı (`sprint-01`)
- Semantik HTML5 etiketleri (`header`, `nav`, `main`, `footer`, `section`, `article`, `figure`, `dl`, `dt`, `dd`) kullanılmıştır.
- Her sayfada hiyerarşiye uygun tek bir `<h1>` yer alır.

### Sprint 2: CSS ve Responsive Tasarım (`sprint-02`)
- Örnek Öğrenci No: `20231047` (`--ton: 127`, Hane 7: `"Palatino Linotype", Georgia, serif`).
- Mobil öncelikli (mobile-first) responsive grid yapısı kurulmuştur (Telefonda 1 sütun, geniş ekranda 2-3 sütun).
- CSS değişkenleri (`:root`) ile renk ve tipografi yönetilmiştir.

### Sprint 3: JavaScript ve DOM Manipülasyonu (`sprint-03`)
- `type="module"` ile modüler JS mimarisi kurulmuştur.
- `index.html`: `data-limit="2"` ile tarihi en yakın 2 etkinlik dinamik sıralanıp basılır.
- `etkinlikler.html`: `input` ve `change` dinleyicileri ile canlı arama ve kategori filtresi çalışır.
- `etkinlik-detay.html`: Adres çubuğundaki `?id=...` okunarak doğru etkinlik yüklenir; id bulunamazsa kırmızı hata kutusu gösterilir.
- `etkinlik-ekle.html` & `etkinlik-guncelle.html`: Form `novalidate` ile istemci tarafında denetlenir, hatalı alanlar kırmızı vurgulanır, başarılı gönderimde JSON formatında çıktı basılır.

## Git Etiketleri

- `sprint-01`: HTML iskelet teslimi
- `sprint-02`: CSS ve Responsive arayüz teslimi
- `sprint-03`: JavaScript ve DOM etkileşim teslimi
