import { useState, useEffect } from "react";
import "./App.css";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const selected = selectedId
    ? findEventById(events, selectedId)
    : undefined;

  const pageTitles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected ? selected.title : "Etkinlik Bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };

  const title = pageTitles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories = [...new Set(events.map((e) => e.category))];

  const filtered = filterByCategory(
    searchEvents(events, searchText),
    category
  );

  const menuItems: { key: PageName; label: string }[] = [
    { key: "home", label: "Ana Sayfa" },
    { key: "events", label: "Etkinlikler" },
    { key: "add", label: "Ekle" },
  ];

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <span className="kategori-etiket">{event.category}</span>
        <p className="info-text">
          Tarih: <time dateTime={event.date}>{formatDate(event.date)}</time>,{" "}
          {event.time}
        </p>
        <p className="info-text">Yer: {event.location}</p>
        <p className="info-text">Kontenjan: {event.capacity} kişi</p>
        <p className="aciklama">{event.description}</p>
        <a
          href={`#detail-${event.id}`}
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{title}</h1>
        {page === "home" && (
          <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
        )}
        {page === "events" && (
          <p>Ekim ve Kasım ayında kampüste düzenlenen etkinlikler.</p>
        )}
        <nav className="menu">
          {menuItems.map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              aria-current={page === item.key ? "page" : undefined}
              className={page === item.key ? "active" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.key);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
            <p style={{ marginTop: "1.5rem" }}>
              <a
                href="#events"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör
              </a>
            </p>
          </section>
        )}

        {page === "events" && (
          <>
            <form
              className="filtre"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="filtre-grup">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  id="arama"
                  type="search"
                  placeholder="Örn. atölye, kariyer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="filtre-grup">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as Category | "")
                  }
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p className="sonuc-satiri">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-listesi">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <div className="hata-kutu">
            <p>
              Aradığınız etkinlik bulunamadı. Lütfen listeden geçerli bir
              etkinlik seçin.
            </p>
            <a
              href="#events"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              &larr; Listeye dön
            </a>
          </div>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            <div className="detay-grid">
              {selected.image && (
                <div className="detay-gorsel">
                  <figure>
                    <img
                      src={selected.image}
                      alt={`${selected.title} afişi`}
                    />
                    <figcaption>{selected.title} afişi</figcaption>
                  </figure>
                </div>
              )}

              <div className="kunye-kutu">
                <h2>Etkinlik Künyesi</h2>
                <dl className="kunye">
                  <dt>Tarih</dt>
                  <dd>
                    <time dateTime={`${selected.date}T${selected.time}`}>
                      {formatDate(selected.date)}, {selected.time}
                    </time>
                  </dd>

                  <dt>Yer</dt>
                  <dd>{selected.location}</dd>

                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>

                  <dt>Kontenjan</dt>
                  <dd>{selected.capacity} kişi</dd>
                </dl>
              </div>
            </div>

            <div className="detay-aciklama">
              <h2>Açıklama</h2>
              <p>{selected.description}</p>
            </div>

            <div className="detay-butonlar">
              <a
                href="#events"
                className="btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                &larr; Listeye dön
              </a>
              <a
                href={`#update-${selected.id}`}
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  go("update", selected.id);
                }}
              >
                Bu etkinliği güncelle
              </a>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <form
            className="form"
            onSubmit={(e) => e.preventDefault()}
          >
            <p style={{ marginBottom: "1rem", color: "#666", fontSize: "0.9rem" }}>
              Bu sprintte form sadece görünüm; kayıt yapılmaz.
            </p>

            <label htmlFor="title">Etkinlik Adı</label>
            <input
              id="title"
              type="text"
              maxLength={80}
              placeholder="Örn. Kariyer Günleri 2026"
            />

            <label htmlFor="category">Kategori</label>
            <select id="category" defaultValue="">
              <option value="">Seçiniz</option>
              <option value="Seminer">Seminer</option>
              <option value="Atölye">Atölye</option>
              <option value="Söyleşi">Söyleşi</option>
              <option value="Yarışma">Yarışma</option>
            </select>

            <label htmlFor="date">Tarih</label>
            <input id="date" type="date" />

            <label htmlFor="time">Saat</label>
            <input id="time" type="time" />

            <label htmlFor="location">Yer</label>
            <input
              id="location"
              type="text"
              placeholder="Örn. A Blok Konferans Salonu"
            />

            <label htmlFor="capacity">Kontenjan</label>
            <input id="capacity" type="number" />

            <label htmlFor="description">Açıklama</label>
            <textarea id="description" rows={5} />

            <button type="submit" className="btn-primary">
              {page === "add" ? "Kaydet" : "Güncelle"}
            </button>
          </form>
        )}
      </main>

      <footer>
        <p>Alperen &middot; 2011012045 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;
