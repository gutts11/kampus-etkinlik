import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const formMesaj = document.querySelector("#form-mesaj");

if (form) {
    const isGuncelleMode = form.dataset.mode === "guncelle";
    const searchParams = new URLSearchParams(location.search);
    const eventId = searchParams.get("id");
    let mevcutEtkinlik = null;

    if (isGuncelleMode) {
        mevcutEtkinlik = events.find(e => e.id === eventId);

        if (!eventId || !mevcutEtkinlik) {
            // id yoksa veya bulunamazsa uyarı göster ve formu gizle (Adım 11)
            form.outerHTML = `
                <div class="hata-kutu">
                    <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki <strong>"Bu etkinliği güncelle"</strong> butonunu kullanın.</p>
                    <a href="etkinlikler.html" class="btn-primary">Etkinliklere git</a>
                </div>
            `;
        } else {
            // Form alanlarını doldur
            if (form.elements.ad) form.elements.ad.value = mevcutEtkinlik.title;
            if (form.elements.kategori) form.elements.kategori.value = mevcutEtkinlik.category;
            
            // Tarih formatını HTML date input (YYYY-MM-DD) uyumlu yap
            if (form.elements.tarih) {
                let tarihVal = mevcutEtkinlik.date;
                if (tarihVal && tarihVal.includes("-") && tarihVal.split("-")[0].length === 2) {
                    const [d, m, y] = tarihVal.split("-");
                    tarihVal = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
                }
                form.elements.tarih.value = tarihVal;
            }

            if (form.elements.saat) form.elements.saat.value = mevcutEtkinlik.time || "";
            if (form.elements.yer) form.elements.yer.value = mevcutEtkinlik.location;
            if (form.elements.kontenjan) form.elements.kontenjan.value = mevcutEtkinlik.capacity || "";
            if (form.elements.aciklama) form.elements.aciklama.value = mevcutEtkinlik.description;
        }
    }

    // Form gönderme dinleyicisi (Adım 9 & 10)
    const aktifForm = document.querySelector("#etkinlik-formu");
    if (aktifForm) {
        aktifForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Eski hataları temizle
            const alanlar = aktifForm.querySelectorAll("input, select, textarea");
            alanlar.forEach(alan => {
                alan.removeAttribute("aria-invalid");
            });

            const hataSpanlar = aktifForm.querySelectorAll(".hata-mesaj");
            hataSpanlar.forEach(span => span.textContent = "");

            if (formMesaj) formMesaj.innerHTML = "";

            const fd = new FormData(aktifForm);
            
            const data = {
                id: isGuncelleMode && mevcutEtkinlik ? mevcutEtkinlik.id : `event-${events.length + 1}`,
                title: (fd.get("ad") || "").toString().trim(),
                category: (fd.get("kategori") || "").toString(),
                date: (fd.get("tarih") || "").toString(),
                time: (fd.get("saat") || "").toString(),
                location: (fd.get("yer") || "").toString().trim(),
                capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
                description: (fd.get("aciklama") || "").toString().trim()
            };

            const errors = {};

            // Doğrulama kuralları (Adım 10)
            if (!data.title || data.title.length < 3) {
                errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
            }

            if (!data.category) {
                errors.kategori = "Bir kategori seçin.";
            }

            if (!data.date) {
                errors.tarih = "Tarih seçin.";
            }

            if (!data.time) {
                errors.saat = "Saat seçin.";
            }

            if (!data.location) {
                errors.yer = "Yer bilgisini yazın.";
            }

            if (data.capacity !== null && (isNaN(data.capacity) || data.capacity < 1 || data.capacity > 1000)) {
                errors.kontenjan = "Kontenjan girildiyse 1–1000 arasında bir sayı olmalı.";
            }

            // Hata varsa göster
            if (Object.keys(errors).length > 0) {
                Object.keys(errors).forEach(key => {
                    const alan = aktifForm.elements[key];
                    if (alan) alan.setAttribute("aria-invalid", "true");

                    const hataSpan = aktifForm.querySelector(`#${key}-hata`);
                    if (hataSpan) hataSpan.textContent = errors[key];
                });

                if (formMesaj) {
                    formMesaj.innerHTML = `<div class="hata-kutu"><p>Formda hatalı alanlar var. Lütfen kırmızı ile belirtilen alanları kontrol edin.</p></div>`;
                }
                return;
            }

            // Hata yoksa başarılı mesajı göster (JSON.stringify)
            if (formMesaj) {
                const baslikMesaj = isGuncelleMode ? "Etkinlik güncellendi" : "Etkinlik oluşturuldu";
                formMesaj.innerHTML = `
                    <div class="basari-kutu">
                        <p><strong>${baslikMesaj} (bu sprintte kaydedilmez):</strong></p>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    </div>
                `;
            }
        });
    }
}
