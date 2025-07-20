import type { IEvent } from '@/types/event';
import api from '../utils/api';
import { Switch } from '@/components/ui/switch'; // Assuming shadcn/ui switch path
import { Label } from '@/components/ui/label';   // Assuming shadcn/ui label path
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui button path
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; // Assuming shadcn/ui card path

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

  const handleArchive = async (checked: boolean) => {
    try {
      await api.patch(`/events/${event.id}`, {
        archived: checked,
      });
      onUpdate();
    } catch (error) {
      console.error('Error archiving event:', error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>
          {event.date} at {event.time} | 📂 {event.category}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {event.notes && <p className="text-sm text-gray-700">📝 {event.notes}</p>}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Switch
            id={`archive-switch-${event.id}`}
            checked={event.archived}
            onCheckedChange={handleArchive}
          />
          <Label htmlFor={`archive-switch-${event.id}`}>
            {event.archived ? 'Archived' : 'Active'}
          </Label>
        </div>
        <Button variant="destructive" onClick={handleDelete} size="sm">
          🗑 Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;