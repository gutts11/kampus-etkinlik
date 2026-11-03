import { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { findEventById } from "../../utils/filter-events";

const routeTitles: { path: string; title: string; text?: string }[] = [
  {
    path: "/",
    title: "Kampüs Etkinlikleri",
    text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
  },
  {
    path: "/events",
    title: "Tüm Etkinlikler",
    text: "Ekim ayında kampüste düzenlenen etkinlikler.",
  },
  { path: "/admin", title: "Etkinlik Yönetimi" },
  { path: "/admin/new", title: "Etkinlik Ekle" },
  { path: "/login", title: "Giriş Yap" },
  { path: "/register", title: "Kayıt Ol" },
  { path: "/forgot-password", title: "Şifremi Unuttum" },
];

function Header() {
  const { pathname } = useLocation();
  const { events } = useEvents();

  const detailMatch =
    matchPath("/events/:id", pathname) ??
    matchPath("/admin/:id/edit", pathname);

  const matchedEvent = detailMatch
    ? findEventById(events, detailMatch.params.id ?? "")
    : undefined;

  const matchedRoute = routeTitles.find((r) => matchPath(r.path, pathname));

  const title = matchedEvent
    ? matchedEvent.title
    : matchedRoute
      ? matchedRoute.title
      : "Sayfa Bulunamadı";

  const text = matchedEvent
    ? `${matchedEvent.category} · ${matchedEvent.location}`
    : matchedRoute?.text;

  useEffect(() => {
    const base = "Kampüs Etkinlikleri";
    document.title = title === base ? base : `${title} — ${base}`;
  }, [title]);

  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}

export default Header;
