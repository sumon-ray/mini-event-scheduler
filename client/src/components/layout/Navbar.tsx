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
        <div className="flex items-center gap-1">
          <img className="w-9" src="./logo.svg" alt="Event Scheduler Logo" />
          <a
            href="/"
            className="text-2xl font-semibold font-sans hover:text-[#e63946] transition-colors duration-200"
          >
            Event Scheduler
          </a>
        </div>

        {/* Desktop Menu */}
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

        {/* Mobile Menu Toggle Button (Hamburger/Close Icon) */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-black focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-1"
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden  absolute top-full left-0 w-full bg-[#ba1952]  flex flex-col items-center py-6 space-y-6 z-40">
          <a
            href="#"
            className="text-lg rounded-md w-4/5 max-w-xs py-1 text-center bg-white border-white  hover:text-blue-200 transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            Events
          </a>
          <Button
            variant="outline"
            className="w-4/5 max-w-xs border-white hover:bg-white/10 hover:text-black text-lg py-3"
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