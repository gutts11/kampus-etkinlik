[https://muhammedalperenturan-frontend.vercel.app](https://muhammedalperenturan-frontend.vercel.app)

# Kampüs Etkinlikleri — Fullstack Monorepo (Sprint 1 - 7)

Bu proje deposu içerisinde ön yüz (`frontend/`) ve sunucu (`backend/`) katmanları birbirinden bağımsız iki modül olarak konumlandırılmıştır.

## Öğrenci Bilgileri

- **Öğrenci Adı:** Muhammed Alperen Turan
- **Öğrenci No:** `2011012045`
- **Hesaplanan Ton:** `205` (`mod(2011012045, 360) = 205`)
- **Hesaplanan Font (Son hane 5):** `"Times New Roman", Times, serif`

---

## 🚀 Hızlı Başlangıç (Kurulum ve Çalıştırma)

### 1. Backend (REST API Sunucusu)
```bash
cd backend
npm install
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
├── backend/                      # Node.js + Express REST API (Sprint 7)
│   ├── src/
│   │   ├── controllers/          # event-controller.js
│   │   ├── data/                 # events.js (Bellek içi etkinlik verisi)
│   │   ├── routes/               # event-routes.js
│   │   ├── app.js                # Express app, middleware ve route tanımları
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

## 📡 Backend REST API Sözleşmesi (Sprint 7)

| Method | Endpoint | Amaç | Başarılı | Hata |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Sunucu sağlık durumu ve öğrenci no (`2011012045`) | `200 OK` | — |
| **GET** | `/events` | Etkinlik listesi (`?category=` destekli) | `200 OK` | — |
| **GET** | `/events/:id` | Tekil etkinlik detay | `200 OK` | `404 Not Found` |
| **POST** | `/events` | Yeni etkinlik ekleme | `201 Created` | `400 Bad Request` |
