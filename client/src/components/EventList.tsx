import { useEffect, useState } from 'react';
import api from '../utils/api';
import EventCard from './EventCard';
import type { IEvent } from '@/types/event';

const EventList = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      const data = response.data?.data; // <-- ঠিক এখানেই সমস্যা ছিল

      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        console.error('Unexpected format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="grid gap-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onUpdate={fetchEvents} />
      ))}
    </div>
  );
};

export default EventList;
