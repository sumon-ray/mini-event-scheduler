import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IEvent } from "@/types/event";
import { useEffect, useState } from "react";
import api from "../utils/api";
interface Props {
  refreshTrigger: number;
}
const EventList = ({ refreshTrigger }: Props) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterArchived, setFilterArchived] = useState<boolean>(false);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      const data = response.data?.data;

      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        console.error("Unexpected format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [refreshTrigger]);

  const handleDelete = async (eventId: string) => {
    try {
      await api.delete(`/events/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleArchive = async (eventId: string, checked: boolean) => {
    try {
      await api.patch(`/events/${eventId}`, {
        archived: checked,
      });
      fetchEvents(); // Refresh list after archiving
    } catch (error) {
      console.error("Error archiving event:", error);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      (event.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.notes ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.category ?? "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesArchiveFilter = filterArchived
      ? event.archived
      : !event.archived;
    return matchesSearch && matchesArchiveFilter;
  });

  return (
    <div className=" container mx-auto min-h-screen">
      <h1 className="text-md md:text-3xl font-sans mb-6 text-center">
        Event Management Dashboard
      </h1>

      <div className="flex justify-between  items-center mb-6 gap-4">
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm outline outline-amber-300 border border-[#e63946]"
        />
        <div className="flex items-center space-x-2">
          <Switch
            id="filter-archive"
            checked={filterArchived}
            onCheckedChange={setFilterArchived}
          />
          <label htmlFor="filter-archive" className="hidden md:flex">Show Archived Events</label>
          <label htmlFor="filter-archive" className="text-sm md:hidden">Archived</label>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <Table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader >
            <TableRow >
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Date & Time</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Notes</TableHead>
              <TableHead className="text-center font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>
                  {event.date} at {event.time}
                </TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell className="text-sm text-gray-600">
                  {event.notes || "-"}
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={event.archived}
                    onCheckedChange={(checked) =>
                      handleArchive(event.id, checked)
                    }
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
        <p className="text-center text-gray-500 text-lg mt-8">
          No events found.
        </p>
      )}
    </div>
  );
};

export default EventList;
