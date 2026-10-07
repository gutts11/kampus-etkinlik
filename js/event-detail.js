import { events } from "./data.js";

function formatDateTR(dateStr, timeStr) {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
        let day, month, year;
        if (parts[0].length === 4) {
            year = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10) - 1;
            day = parseInt(parts[2], 10);
        } else {
            day = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10) - 1;
            year = parseInt(parts[2], 10);
        }
        const d = new Date(year, month, day);
        const formatliTarih = d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
        return timeStr ? `${formatliTarih}, ${timeStr}` : formatliTarih;
    }
    return dateStr;
}

const container = document.querySelector("#detay");

if (container) {
    const id = new URLSearchParams(location.search).get("id");
    const event = events.find(e => e.id === id);

    if (!event) {
        container.innerHTML = `
            <div class="hata-kutu">
                <p><strong>"${id ? id : 'Geçersiz'}"</strong> numaralı bir etkinlik bulunamadı. Listeden geçerli bir etkinlik seçin.</p>
                <a href="etkinlikler.html" class="btn-primary">&larr; Listeye dön</a>
            </div>
        `;
    } else {
        document.title = `${event.title} - Kampüs Etkinlikleri`;

        const tarihMetni = formatDateTR(event.date, event.time);

        container.innerHTML = `
            <article class="detay-sayfa">
                <h2>${event.title}</h2>
                <div class="detay-grid">
                    <div class="detay-gorsel">
                        <figure>
                            <img src="afis.jpg" alt="${event.title} afişi">
                            <figcaption>Şekil 1: ${event.title} afişi</figcaption>
                        </figure>
                    </div>
                    <div class="detay-sag">
                        <dl class="kunye">
                            <dt>Tarih / Saat</dt>
                            <dd><time datetime="${event.date}T${event.time}">${tarihMetni}</time></dd>
                            
                            <dt>Yer</dt>
                            <dd>${event.location}</dd>
                            
                            <dt>Kategori</dt>
                            <dd>${event.category}</dd>
                            
                            <dt>Kontenjan</dt>
                            <dd>${event.capacity ? event.capacity + " kişi" : "Belirtilmedi"}</dd>
                        </dl>
                    </div>
                </div>

                <div class="detay-aciklama">
                    <h3>Açıklama</h3>
                    <p>${event.description}</p>
                </div>

                <div class="detay-butonlar">
                    <a href="etkinlikler.html" class="btn-secondary">&larr; Listeye dön</a>
                    <a href="etkinlik-guncelle.html?id=${event.id}" class="btn-primary">Bu etkinliği güncelle</a>
                </div>
            </article>
        `;
    }
}
