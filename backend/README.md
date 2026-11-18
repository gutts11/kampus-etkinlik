# Kampüs Etkinlikleri — Backend REST API (Sprint 8: MongoDB Persistence)

Express.js ve Mongoose (MongoDB) ile geliştirilmiş kalıcı veritabanı mimarisine sahip REST API sunucusu.

## Kurulum ve Çalıştırma

1. Bağımlılıkları yükleyin:
```bash
cd backend
npm install
```

2. Ortam değişkenlerini ayarlayın (`.env.example` dosyasını `.env` olarak kopyalayıp `MONGODB_URI` adresinizi girin):
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/kampus
```

3. Örnek verileri veritabanına ekleyin (Seed):
```bash
npm run seed
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde ayağa kalkacaktır.

Üretim modunda çalıştırmak için:
```bash
npm start
```

## Ortam Değişkenleri (Environment Variables)

| Değişken | Açıklama | Örnek Yer Tutucu |
| :--- | :--- | :--- |
| `PORT` | Express sunucusunun dinleyeceği port numarası | `3000` |
| `MONGODB_URI` | MongoDB bağlantı adresi (Atlas veya yerel) | `mongodb://127.0.0.1:27017/kampus` |

> **Uyarı:** Gerçek MongoDB Atlas şifre ve bağlantı adresini yalnızca yerel `.env` dosyasına yazın. `.env` dosyası `.gitignore` ile GitHub'a gönderilmez.

## REST Sözleşmesi (API Endpoints)

| Method | Endpoint | Amaç | Başarılı Status | Hata Status | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Sunucu sağlık kontrolü ve öğrenci no | `200 OK` | — | Aktif |
| **GET** | `/events` | MongoDB'deki tüm etkinlikleri tarihe göre sıralı getirir (`?category=` destekli) | `200 OK` | — | Aktif |
| **GET** | `/events/:id` | MongoDB `_id` değerine göre tekil etkinlik getirir | `200 OK` | `404 Not Found` | Aktif |
| **POST** | `/events` | Mongoose schema doğrulamasından geçirerek yeni etkinlik oluşturur | `201 Created` | `400 Bad Request` | Aktif |
| **PATCH** | `/events/:id` | Etkinlik günceller | `200 OK` | `400, 404` | Sprint 9 |
| **DELETE** | `/events/:id` | Etkinlik siler | `204 No Content` | `404 Not Found` | Sprint 9 |

### Hata Yanıt Formatı
Eksik/geçersiz isteklerde ve bulunamayan kayıtlarda API JSON mesajı döndürür:
```json
{
  "message": "Event not found"
}
```

## Postman Koleksiyonu
Test istekleri `backend/requests/kampus-api.json` dosyası içinde Postman Collection v2.1 formatında yer alır.
