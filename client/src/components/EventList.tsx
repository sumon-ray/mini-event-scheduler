import { useEffect, useState } from 'react';
import api from '../utils/api';
import type { IEvent } from '@/types/event';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
interface Props {
    refreshTrigger: boolean;
  }
const EventList = ({refreshTrigger}:Props) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterArchived, setFilterArchived] = useState<boolean>(false);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      const data = response.data?.data;

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
  }, [refreshTrigger]);

  const handleDelete = async (eventId: string) => {
    try {
      await api.delete(`/events/${eventId}`);
      fetchEvents(); // Refresh list after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleArchive = async (eventId: string, checked: boolean) => {
    try {
      await api.patch(`/events/${eventId}`, {
        archived: checked,
      });
      fetchEvents(); // Refresh list after archiving
    } catch (error) {
      console.error('Error archiving event:', error);
    }
  };

  const filteredEvents = events.filter((event) => {
    // Safely access properties using nullish coalescing (?? '') to ensure they are strings
    // before calling .toLowerCase() or .includes()
    const matchesSearch =
      (event.title ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.notes ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.category ?? '').toLowerCase().includes(searchTerm.toLowerCase());


    const matchesArchiveFilter = filterArchived ? event.archived : !event.archived;
    return matchesSearch && matchesArchiveFilter;
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Event Management Dashboard</h1>

      <div className="flex justify-between items-center mb-6 gap-4">
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center space-x-2">
          <Switch
            id="filter-archive"
            checked={filterArchived}
            onCheckedChange={setFilterArchived}
          />
          <label htmlFor="filter-archive">Show Archived Events</label>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <Table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.date} at {event.time}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell className="text-sm text-gray-600">{event.notes || '-'}</TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={event.archived}
                    onCheckedChange={(checked) => handleArchive(event.id, checked)}
                    aria-label={`Toggle archive status for ${event.title}`}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-8">No events found.</p>
      )}
    </div>
  );
};

export default EventList;