import { useState, useEffect } from "react";
import "./App.css";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const pageTitles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected ? selected.title : "Etkinlik Bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };

  const title = pageTitles[page];
  const headerText =
    page === "home"
      ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
      : page === "events"
        ? "Ekim ve Kasım ayında kampüste düzenlenen etkinlikler."
        : undefined;

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <Header title={title} text={headerText}>
        <Navigation current={page} onNavigate={(next) => go(next)} />
      </Header>

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList
              events={upcoming}
              onShowDetail={(id) => go("detail", id)}
            />
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
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && (
              <p className="sonuc-satiri">
                {filtered.length} etkinlik listeleniyor.
              </p>
            )}
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
            />
          </>
        )}

        {page === "detail" && !selected && (
          <div className="hata-kutu">
            <p>Aradığınız etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
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
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => {}} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
