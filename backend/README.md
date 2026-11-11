# Kampüs Etkinlikleri — Backend REST API (Sprint 7)

Express.js ile geliştirilmiş, bellek içi (in-memory) veri saklama mimarisine sahip REST API sunucusu.

## Kurulum ve Çalıştırma

Gerekli bağımlılıkları yüklemek ve geliştirme modunda çalıştırmak için:

```bash
cd backend
npm install
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde ayağa kalkacaktır.

Üretim modunda çalıştırmak için:

```bash
npm start
```

## Ortam Değişkenleri (Environment Variables)

Proje kök dizinindeki `.env` dosyasında şu değişken tanımlanır:

| Değişken | Açıklama | Varsayılan |
| :--- | :--- | :--- |
| `PORT` | Express sunucusunun dinleyeceği port numarası | `3000` |

Örnek şablon için `.env.example` dosyasına bakabilirsiniz.

## REST Sözleşmesi (API Endpoints)

| Method | Endpoint | Amaç | Başarılı Status | Hata Status | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Sunucu sağlık kontrolü ve öğrenci no | `200 OK` | — | Bu sprint |
| **GET** | `/events` | Tüm etkinlik listesini getirir (kategori filtreli) | `200 OK` | — | Bu sprint |
| **GET** | `/events/:id` | ID'ye göre tekil etkinlik getirir | `200 OK` | `404 Not Found` | Bu sprint |
| **POST** | `/events` | Yeni etkinlik oluşturur | `201 Created` | `400 Bad Request` | Bu sprint |
| **PATCH** | `/events/:id` | Etkinlik günceller | `200 OK` | `400, 404` | Sprint 9 |
| **DELETE** | `/events/:id` | Etkinlik siler | `204 No Content` | `404 Not Found` | Sprint 9 |

### Hata Yanıt Formatı
Tüm hata durumlarında API standart hata nesnesi döndürür:
```json
{
  "error": {
    "message": "Event not found"
  }
}
```

## Postman Koleksiyonu
Otomatik test istekleri `backend/requests/kampus-api.json` dosyası içinde Postman Collection v2.1 formatında bulunmaktadır.
