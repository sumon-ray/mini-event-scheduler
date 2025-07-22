import { z } from "zod";

export const eventFormSchema = z.object({
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

// Type for form values
export type EventFormValues = z.infer<typeof eventFormSchema>;
