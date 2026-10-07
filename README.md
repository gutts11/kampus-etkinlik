[https://sprint-03-gamma.vercel.app/](https://sprint-03-gamma.vercel.app/)

# Kampüs Etkinlikleri - Sprint 1, Sprint 2 & Sprint 3

Bu proje, üniversite kampüsündeki seminer, atölye, söyleşi ve konferans etkinliklerini tek bir platformda toplamak amacıyla geliştirilmiştir.

## Öğrenci Bilgileri

- **Öğrenci Adı:** Alperen
- **Öğrenci No:** `2011012045`
- **Hesaplanan Ton:** `205` (`mod(2011012045, 360) = 205`)
- **Hesaplanan Font (Son hane 5):** `"Times New Roman", Times, serif`

## Proje Yapısı

```
Lecture_1/
├── css/
│   ├── numaran.css        # Sprint 2: HSL renk paleti (--ton: 205), "Times New Roman" font, grid ve responsive stiller
│   └── 2011012045.css     # Öğrenci numarasına özel CSS dosyası
├── js/
│   ├── data.js            # Etkinlik verilerini barındıran modül (en az 6 etkinlik, benzersiz id'ler)
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

## Kontrol Edilen 10 Madde Doğrulaması

1. ✅ **`data.js`'te en az 6 etkinlik, id'ler benzersiz**: `event-1`'den `event-6`'ya kadar 6 adet benzersiz nesne tanımlıdır.
2. ✅ **Liste veriden üretiliyor**: `event-list.js` modülü verileri dinamik olarak kartlara dönüştürür.
3. ✅ **HTML'de elle yazılmış kart yok**: `index.html` ve `etkinlikler.html` sayfalarında elle yazılmış kart kalmamış, container bölümleri boş bırakılmıştır.
4. ✅ **Arama + kategori birlikte çalışıyor**: Canlı arama ve kategori seçimi kombinasyonlu şekilde filtreleme yapar.
5. ✅ **Sonuç yoksa mesaj çıkıyor**: Filtre eşleşmediğinde `"Aramanıza uygun etkinlik bulunamadı."` uyarısı verilir.
6. ✅ **`?id=event-3` doğru etkinliği açıyor**: URLSearchParams ile `id` okunur ve doğru etkinlik detayları basılır.
7. ✅ **Geçersiz id'de hata kutusu, sayfa çökmüyor**: Hatalı veya bulunamayan id aramalarında konsol hatası üretmeden red alert kutusu basılır.
8. ✅ **Kaydet sayfayı yenilemiyor**: Form `novalidate` ve `e.preventDefault()` ile yenilenmeden işlenir.
9. ✅ **Hata ve başarı mesajı görünüyor**: Eksik/hatalı alanlar kırmızı aria-invalid ve span uyarısı alır; başarılı gönderimde yeşil kutuda JSON nesnesi basılır.
10. ✅ **Konsolda kırmızı hata yok**: Tüm modüller hata vermeden temiz çalışır.
