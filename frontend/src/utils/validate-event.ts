import type { EventFormData } from "../types/campus-event";

export type EventErrors = Partial<Record<keyof EventFormData, string>>;

export function validateEvent(data: EventFormData): EventErrors {
  const errors: EventErrors = {};

  if (data.title.trim().length < 3) {
    errors.title = "Etkinlik adı en az 3 karakter olmalı.";
  }
  if (data.category === "") {
    errors.category = "Bir kategori seçin.";
  }
  if (data.date === "") {
    errors.date = "Tarih seçin.";
  }
  if (data.time === "") {
    errors.time = "Saat seçin.";
  }
  if (data.location.trim() === "") {
    errors.location = "Yer boş olamaz.";
  }
  const capacityNum = Number(data.capacity);
  if (!Number.isInteger(capacityNum) || capacityNum < 1 || capacityNum > 1000) {
    errors.capacity = "Kontenjan 1 ile 1000 arasında bir tam sayı olmalı.";
  }
  if (data.description.trim().length < 10) {
    errors.description = "Açıklama en az 10 karakter olmalı.";
  }

  return errors;
}
