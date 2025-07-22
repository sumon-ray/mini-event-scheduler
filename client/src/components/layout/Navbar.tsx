import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavbarProps {
  onAddEventClick: () => void;
}

const Navbar = ({ onAddEventClick }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className="
      backdrop-blur-xl
  
      shadow-lg
      p-4 sticky top-0 z-50
      border-b border-blue-800/50
    "
    >
      <div className="container mx-auto flex justify-between items-center">
        <a
          href="/"
          className="text-2xl font-sans hover:text-blue-200 transition-colors duration-200"
        >
          Event Scheduler
        </a>

        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="text-black hover:text-[#e63946] px-2 py-1 rounded-md transition-colors duration-200"
          >
            Events
          </a>
          <Button
            variant="ghost"
            className="text-white bg-[#e63946] hover:bg-transparent hover:border border-[#e63946] transition-all  hover:text-black"
            onClick={onAddEventClick}
          >
            Add New Event
          </Button>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-1"
            aria-label="মোবাইল মেনু টগল করুন"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

     {/* mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-blue-950/90 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 z-40">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-1"
            aria-label="মোবাইল মেনু বন্ধ করুন"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <a
            href="#"
            className="text-3xl font-semibold text-white hover:text-blue-200 transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            Events
          </a>
          <Button
            variant="outline"
            className="w-4/5 max-w-xs text-white border-white hover:bg-white/10 hover:text-white text-lg py-3"
            onClick={() => {
              onAddEventClick(); 
              toggleMobileMenu();
            }}
          >
            Add New Event
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
