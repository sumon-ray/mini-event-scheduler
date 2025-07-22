// src/App.tsx
import { useState } from "react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import Navbar from "./components/layout/Navbar"; // আপনার Navbar-এর সঠিক পথ নিশ্চিত করুন

// Shadcn UI Dialog কম্পোনেন্টগুলো ইম্পোর্ট করুন
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Footer from "./components/layout/Footer";

const App = () => {
  const [isEventFormModalOpen, setIsEventFormModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); 

  const handleEventFormSuccess = () => {
    setIsEventFormModalOpen(false); 
    setRefreshTrigger((prev) => prev + 1); 
  };

  return (
    <div className="min-h-screen  flex flex-col">
      <Navbar onAddEventClick={() => setIsEventFormModalOpen(true)} />

      <main className="container mx-auto py-8 px-4 flex-grow">
        <EventList refreshTrigger={refreshTrigger} />
      </main>

      <Dialog open={isEventFormModalOpen} onOpenChange={setIsEventFormModalOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-xl lg:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">   Add New Event</DialogTitle>
            <DialogDescription>
            Please fill in the following details to schedule a new event
            </DialogDescription>
          </DialogHeader>
          {/* DialogContent-এর মধ্যে EventForm রেন্ডার করুন */}
          <EventForm onSuccess={handleEventFormSuccess} />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default App;