import { events } from "./data.js";

// Tarih ayrıştırma ve Türkçe formatlama yardımcısı
function formatDateTR(dateStr, timeStr) {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
        // DD-MM-YYYY veya YYYY-MM-DD kontrolü
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

function parseDateForSort(dateStr) {
    if (!dateStr) return 0;
    const parts = dateStr.split("-");
    if (parts.length === 3) {
        if (parts[0].length === 4) {
            return new Date(parts[0], parts[1] - 1, parts[2]).getTime();
        } else {
            return new Date(parts[2], parts[1] - 1, parts[0]).getTime();
        }
    }
    return 0;
}

// Kart üreten fonksiyon (Adım 4)
function createCard(event) {
    const tarihMetni = formatDateTR(event.date, event.time);
    return `
        <article class="kart">
            <h2>${event.title}</h2>
            <p class="kategori-tarih">${event.category} · ${tarihMetni}</p>
            <p class="info-text">Yer: ${event.location}</p>
            <p class="info-text">Kontenjan: ${event.capacity || "-"} kişi</p>
            <p class="aciklama">${event.description}</p>
            <a href="etkinlik-detay.html?id=${event.id}">Detayları gör &rarr;</a>
        </article>
    `;
}

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
    if (!list) return;
    list.innerHTML = dizi.map(createCard).join("");
}

// Filtre alanları kontrolü (Adım 6 & 7)
const filtreFormu = document.querySelector("#filtre-formu");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

if (list) {
    if (list.dataset.limit) {
        // Ana sayfa: Tarihi en yakın N etkinliği sırala ve göster (Adım 5)
        const yaklasan = [...events]
            .sort((a, b) => parseDateForSort(a.date) - parseDateForSort(b.date))
            .slice(0, Number(list.dataset.limit));
        render(yaklasan);
    } else {
        // Liste sayfası (etkinlikler.html)
        if (kategoriSelect) {
            // Kategorileri dinamik veriden üret (new Set)
            const kategoriler = Array.from(new Set(events.map(e => e.category)));
            kategoriler.forEach(kat => {
                const opt = document.createElement("option");
                opt.value = kat;
                opt.textContent = kat;
                kategoriSelect.appendChild(opt);
            });
        }

        function filtrele() {
            const aranan = aramaInput ? aramaInput.value.trim().toLocaleLowerCase("tr-TR") : "";
            const secilenKategori = kategoriSelect ? kategoriSelect.value : "";

            const sonuc = events.filter(e => {
                const metinUyuyor = !aranan || 
                    e.title.toLocaleLowerCase("tr-TR").includes(aranan) ||
                    e.description.toLocaleLowerCase("tr-TR").includes(aranan) ||
                    e.location.toLocaleLowerCase("tr-TR").includes(aranan) ||
                    e.category.toLocaleLowerCase("tr-TR").includes(aranan);

                const kategoriUyuyor = !secilenKategori || e.category === secilenKategori;

                return metinUyuyor && kategoriUyuyor;
            });

            render(sonuc);

            if (sonucSatiri) {
                if (sonuc.length > 0) {
                    sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
                } else {
                    list.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 2rem;">Aramanıza uygun etkinlik bulunamadı.</p>`;
                    sonucSatiri.textContent = `Aramanıza uygun etkinlik bulunamadı.`;
                }
            }
        }

        if (aramaInput) aramaInput.addEventListener("input", filtrele);
        if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);
        if (filtreFormu) filtreFormu.addEventListener("submit", (e) => e.preventDefault());

        filtrele();
    }
}
