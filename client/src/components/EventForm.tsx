"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { eventFormDefaultValues } from "@/constants/formDefaults"
import { eventFormSchema, type EventFormValues } from "@/schemas/event.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Calendar, Clock, FileText, Plus, Loader2 } from "lucide-react"
import api from "../utils/api"

interface EventFormProps {
  onSuccess: () => void
}

const EventForm = ({ onSuccess }: EventFormProps) => {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventFormDefaultValues,
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: EventFormValues) => {
    try {
      await api.post("/events", values)
      form.reset()
      onSuccess()
      toast.success("Event created successfully! 🎉", {
        description: "Your event has been added to the schedule.",
      })
    } catch (error: unknown) {
      console.error("Failed to add event:", error)
      if (error instanceof AxiosError) {
        if (!error.response) {
          toast.error("Connection Error", {
            description: "Server is currently unavailable. Please try again later.",
          })
        } else {
          toast.error("Something went wrong", {
            description: "Please check your information and try again.",
          })
        }
      } else {
        toast.error("Unexpected Error", {
          description: "An unexpected error occurred. Please try again.",
        })
      }
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Event Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your event title..."
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Date and Time Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Date
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Time
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Notes Field */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Additional Notes
                  <span className="text-gray-400 font-normal ml-1">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any additional details or notes for this event..."
                    className="min-h-[100px] border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Event...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </>
              )}
            </Button>
          </div>

          {/* Helper Text */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              Your event will be automatically categorized using AI-powered analysis
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EventForm
