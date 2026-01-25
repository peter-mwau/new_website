// src/sections/Hero.jsx
import { useState } from "react";
import { ChevronUp } from "lucide-react";
import WebThreeRareBG from "../backgrounds/WebThreeRareBg-dark";

const Hero = ({ onNavigate }) => {
  const [navOpen, setNavOpen] = useState(false);

  const items = [
    { label: "SERVICES", section: "services" },
    { label: "PROJECTS", section: "projects" },
    { label: "TEAM", section: "team" },
    { label: "CONTACT", section: "contacts" },
  ];

  return (
    <div className="relative w-full h-screen bg-linear-to-b from-black via-gray-900/60 to-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <WebThreeRareBG />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white"
          style={{ letterSpacing: "0.35em" }}
        >
          NOVALORX LABS
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center mt-4 gap-3 sm:gap-0 w-full">
          <div className="hidden sm:block h-px bg-white w-32" />
          <p
            className="font-medium text-sm sm:text-base md:text-lg text-white px-4"
            style={{ letterSpacing: "0.35em" }}
          >
            Crafting Stellar Digital Experiences
          </p>
          <div className="hidden sm:block h-px bg-white w-32" />
        </div>

        {/* Desktop navbar */}
        <nav className="hidden md:block absolute bottom-12 backdrop-blur-md py-4">
          <ul className="flex items-center justify-center divide-x divide-white/20">
            {items.map((item) => (
              <li key={item.section} className="px-16">
                <button
                  onClick={() => onNavigate?.(item.section)}
                  className="uppercase tracking-widest font-medium text-white/80 hover:text-white transition"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile bottom button */}
      <button
        onClick={() => setNavOpen((v) => !v)}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30
                   w-12 h-12 rounded-full
                   bg-gray-900/80 border border-white/20
                   flex items-center justify-center
                   backdrop-blur-md"
        aria-label="Toggle navigation"
      >
        <ChevronUp
          className={`text-white transition-transform duration-300 ${
            navOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Mobile nav drawer */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-20
                    bg-gray-900/40 backdrop-blur-xl border-t border-white/10
                    transition-transform duration-300
                    ${navOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <ul className="flex flex-col items-center py-7 mb-15 space-y-6 border-b border-white/10">
          {items.map((item) => (
            <li key={item.section}>
              <button
                onClick={() => {
                  setNavOpen(false);
                  onNavigate?.(item.section);
                }}
                className="text-white uppercase tracking-widest text-sm"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Click-away overlay */}
      {navOpen && (
        <div
          onClick={() => setNavOpen(false)}
          className="md:hidden fixed inset-0 z-10 bg-black/40"
        />
      )}
    </div>
  );
};

export default Hero;
