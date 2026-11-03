import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Category, EventFormData } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";
import type { EventErrors } from "../../utils/validate-event";

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validateEvent(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  }

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      <p className="alan">
        <label htmlFor="title">Etkinlik Adı</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
        />
        <span className="hata-metni">{errors.title}</span>
      </p>

      <p className="alan">
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Seçiniz</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <span className="hata-metni">{errors.category}</span>
      </p>

      <p className="alan">
        <label htmlFor="date">Tarih</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          aria-invalid={errors.date ? true : undefined}
        />
        <span className="hata-metni">{errors.date}</span>
      </p>

      <p className="alan">
        <label htmlFor="time">Saat</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          aria-invalid={errors.time ? true : undefined}
        />
        <span className="hata-metni">{errors.time}</span>
      </p>

      <p className="alan">
        <label htmlFor="location">Yer</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          aria-invalid={errors.location ? true : undefined}
        />
        <span className="hata-metni">{errors.location}</span>
      </p>

      <p className="alan">
        <label htmlFor="capacity">Kontenjan</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined}
        />
        <span className="hata-metni">{errors.capacity}</span>
      </p>

      <p className="alan">
        <label htmlFor="description">Açıklama</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
        />
        <span className="hata-metni">{errors.description}</span>
      </p>

      <p className="form-butonlar">
        <button type="submit" className="buton">
          {submitText}
        </button>
      </p>
    </form>
  );
}

export default EventForm;
