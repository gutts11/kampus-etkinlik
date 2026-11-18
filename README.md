[https://muhammedalperenturan-frontend.vercel.app](https://muhammedalperenturan-frontend.vercel.app)

# Kampüs Etkinlikleri — Fullstack Monorepo (Sprint 1 - 8)

Bu proje deposu içerisinde ön yüz (`frontend/`) ve MongoDB destekli sunucu (`backend/`) katmanları birbirinden bağımsız iki modül olarak konumlandırılmıştır.

## Öğrenci Bilgileri

- **Öğrenci Adı:** Muhammed Alperen Turan
- **Öğrenci No:** `2011012045`
- **Hesaplanan Ton:** `205` (`mod(2011012045, 360) = 205`)
- **Hesaplanan Font (Son hane 5):** `"Times New Roman", Times, serif`

---

## 🚀 Hızlı Başlangıç (Kurulum ve Çalıştırma)

### 1. Backend (Express + MongoDB REST API)
```bash
cd backend
npm install
# .env.example dosyasını .env olarak kopyalayıp kendi MONGODB_URI bilginizi girin
npm run seed
npm run dev
```
Sunucu `http://localhost:3000` adresinde çalışır.

### 2. Frontend (React + TypeScript Uygulaması)
```bash
cd frontend
npm install
npm run dev
```
Ön yüz `http://localhost:5173` adresinde çalışır.

---

## 📁 Proje Klasör Yapısı

```
kampus-etkinlik/
├── frontend/                     # React + TypeScript + Vite (Sprint 4-6)
│   ├── src/
│   │   ├── components/           # layout, events, forms bileşenleri
│   │   ├── context/              # EventsContext.tsx
│   │   ├── pages/                # 10 route sayfası
│   │   └── utils/
│   ├── package.json
│   └── README.md
├── backend/                      # Node.js + Express + Mongoose (Sprint 7-8)
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js       # MongoDB bağlantı modülü (connectDatabase)
│   │   ├── controllers/
│   │   │   └── event-controller.js
│   │   ├── data/
│   │   │   └── seed-events.js    # Seed verileri (6 özgün etkinlik)
│   │   ├── models/
│   │   │   └── event-model.js    # Mongoose Event şeması ve modeli
│   │   ├── routes/
│   │   │   └── event-routes.js
│   │   ├── app.js                # Express app, middleware ve hata yakalayıcılar
│   │   ├── seed.js               # Veritabanı seed script'i (npm run seed)
│   │   └── server.js             # Sunucu başlatıcı ve port dinleyici
│   ├── requests/
│   │   └── kampus-api.json       # Postman v2.1 Test Koleksiyonu
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── README.md
├── .gitignore
└── README.md
```

---

## 📡 Backend REST API Sözleşmesi (Sprint 8)

| Method | Endpoint | Amaç | Başarılı | Hata |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Sunucu sağlık durumu ve öğrenci no (`2011012045`) | `200 OK` | — |
| **GET** | `/events` | MongoDB etkinlik listesi (`?category=` destekli) | `200 OK` | — |
| **GET** | `/events/:id` | MongoDB `_id` ile tekil etkinlik detay (`isValidObjectId` kontrollü) | `200 OK` | `404 Not Found` |
| **POST** | `/events` | Yeni etkinlik ekleme (Schema doğrulaması ile kalıcı kayıt) | `201 Created` | `400 Bad Request` |
