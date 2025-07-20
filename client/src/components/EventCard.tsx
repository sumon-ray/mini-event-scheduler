import type { IEvent } from '@/types/event';
import api from '../utils/api';

interface Props {
  event: IEvent;
  onUpdate: () => void;
}

const EventCard = ({ event, onUpdate }: Props) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/events/${event.id}`);
      onUpdate();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleArchive = async () => {
    try {
      await api.patch(`/events/${event.id}`, {
        archived: !event.archived,
      });
      onUpdate();
    } catch (error) {
      console.error('Error archiving event:', error);
    }
  };

  return (
    <div className="border rounded p-4 shadow-sm flex justify-between items-start bg-gray-50">
      <div>
        <h2 className="font-semibold text-lg">{event.title}</h2>
        <p>{event.date} at {event.time}</p>

        {event.notes && (
          <p className="text-sm mt-1">📝 {event.notes}</p>
        )}

        <span className="text-xs text-gray-500">📂 {event.category}</span>
        <span className="ml-2 text-xs text-gray-600 italic">
          {event.archived ? 'archived' : 'active'}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleArchive}
          className="text-blue-600 text-sm hover:underline"
        >
          {event.archived ? '🔓 Unarchive' : '🗄 Archive'}
        </button>

        <button
          onClick={handleDelete}
          className="text-red-600 text-sm hover:underline"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
