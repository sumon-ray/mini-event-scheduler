import EventForm from "@/components/EventForm";
import EventList from "@/components/EventList";
import { useState } from "react";

const MyEventsPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleEventSuccess = () => {
    // যখন নতুন ইভেন্ট add হবে তখন এই state টগল করুন
    setRefreshTrigger(prev => !prev);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add new Events</h1>
      <EventForm onSuccess={handleEventSuccess} />
      <EventList refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default MyEventsPage;
