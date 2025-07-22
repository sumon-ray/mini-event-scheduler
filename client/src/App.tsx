"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Sparkles } from "lucide-react";
import { useState } from "react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import BannerSection from "./components/layout/Banner";
// import BannerSection from "./components/layout/Banner";
// import Banner from "./components/layout/Banner";

const App = () => {
  const [isEventFormModalOpen, setIsEventFormModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEventFormSuccess = () => {
    setIsEventFormModalOpen(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleGetStarted = () => {
    setIsEventFormModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar onAddEventClick={() => setIsEventFormModalOpen(true)} />

      {/* Hero Banner */}
      <BannerSection onGetStarted={handleGetStarted} />

      {/* Stats Section */}

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 flex-grow bg-gradient-to-br from-gray-50 to-blue-50">
        <EventList refreshTrigger={refreshTrigger} />
      </main>

      {/* Event Form Modal */}
      <Dialog
        open={isEventFormModalOpen}
        onOpenChange={setIsEventFormModalOpen}
      >
        <DialogContent className="sm:max-w-[500px] md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-center space-y-3 pb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                 New Event
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              Fill in the details below to schedule your event with AI-powered
              categorization
            </DialogDescription>
          </DialogHeader>

          <div className="px-2">
            <EventForm onSuccess={handleEventFormSuccess} />
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default App;
