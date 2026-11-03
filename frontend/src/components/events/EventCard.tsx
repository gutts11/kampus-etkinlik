import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
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
          onShowDetail(event.id);
        }}
      >
        Detayları gör
      </a>
    </article>
  );
}

export default EventCard;
