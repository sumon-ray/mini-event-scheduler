import { AxiosError } from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "../utils/api"; 

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component in shadcn/ui
import { toast } from "sonner";

interface EventFormProps {
  onSuccess: () => void;
}

// 1. Define your form schema with Zod
const eventFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  date: z.string().min(1, {
    message: "Date is required.",
  }),
  time: z.string().min(1, {
    message: "Time is required.",
  }),
  notes: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

const EventForm = ({ onSuccess }: EventFormProps) => {
  // 2. Initialize the form with useForm
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      date: "",
      time: "",
      notes: "",
    },
  });

  // 3. Define the onSubmit handler

  const onSubmit = async (values: EventFormValues) => {
    try {
      await api.post("/events", values);
      form.reset();
     
      onSuccess();
      toast.success("Event has been created.");
    } catch (error: unknown) {
      console.error("Failed to add event:", error);

      if (error instanceof AxiosError) {
        if (!error.response) {
          toast.error(
            "Server is currently unavailable. Please try again later."
          );
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Event Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Field */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Time Field */}
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes Field */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any additional notes?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add Event
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
