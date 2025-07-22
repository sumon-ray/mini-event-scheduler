
import { Mail, Phone, Github, Linkedin, ArrowUpRight, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="
      relative
      bg-gradient-to-br from-blue-900 to-purple-950
      text-white
      pt-16 mt-2 pb-5
      shadow-2xl
      overflow-hidden
    ">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" fillOpacity="0.8" d="M0,192L48,170.7C96,149,192,107,288,106.7C384,107,480,149,576,170.7C672,192,768,192,864,170.7C960,149,1056,107,1152,106.7C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>


      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Organize Your Events!
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Easily create, track, and manage your events.
          </p>
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center mb-12">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('Add New Event button clicked from footer!');
            }}
            className="
              inline-flex items-center justify-center
              bg-white text-blue-800 font-bold
              py-4 px-8 rounded-full shadow-lg
              hover:bg-blue-100 hover:text-blue-900
              transition-all duration-300 transform hover:scale-105
              text-lg
            "
          >
            Get Started Now <ArrowUpRight size={24} className="ml-2" />
          </a>
        </div>

        {/* Contact Info and Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-300">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:sumonray146371@gmail.com"
                  className="flex items-center justify-center md:justify-start space-x-2 hover:text-blue-300 transition-colors duration-200"
                >
                  <Mail size={18} />
                  <span>sumonray146371@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801763604565"
                  className="flex items-center justify-center md:justify-start space-x-2 hover:text-blue-300 transition-colors duration-200"
                >
                  <Phone size={18} />
                  <span>+8801763604565</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-300">Find Us</h3>
            <div className="flex justify-center md:justify-start items-center space-x-4">
              <a
                href="https://github.com/sumon-ray"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors duration-200"
                aria-label="My GitHub Profile"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/sumon60/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors duration-200"
                aria-label="My LinkedIn Profile"
              >
                <Linkedin size={24} />
              </a>
              {/* Uncomment if you have a portfolio website */}
              <a
                href="https://sumon-ray.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors duration-200"
                aria-label="My Portfolio Website"
              >
                <Globe size={24} />
              </a>
            </div>
          </div>

          {/* Additional Section (Optional) */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-300">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300 transition-colors duration-200">Events</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-700/50 pt-6 mt-6 text-sm text-blue-200">
          <p>&copy; {new Date().getFullYear()} Event Scheduler. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
