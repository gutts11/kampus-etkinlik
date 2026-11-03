import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CampusEvent, Category, EventFormData } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (formData: EventFormData) => void;
  updateEvent: (id: string, formData: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

function toCampusEvent(id: string, formData: EventFormData): CampusEvent {
  return {
    id,
    title: formData.title.trim(),
    category: formData.category as Category,
    capacity: Number(formData.capacity),
    date: formData.date,
    time: formData.time,
    location: formData.location.trim(),
    description: formData.description.trim(),
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(formData: EventFormData) {
    setEvents([...events, toCampusEvent(`event-${Date.now()}`, formData)]);
  }

  function updateEvent(id: string, formData: EventFormData) {
    setEvents(
      events.map((e) =>
        e.id === id ? { ...toCampusEvent(id, formData), image: e.image } : e
      )
    );
  }

  function deleteEvent(id: string) {
    setEvents(events.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents(): EventsContextValue {
  const ctx = useContext(EventsContext);
  if (ctx === null) {
    throw new Error("useEvents, EventsProvider içinde kullanılmalı.");
  }
  return ctx;
}
