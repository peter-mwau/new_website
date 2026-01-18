import React, { useState, useEffect } from "react";

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > 100) {
        setIsVisible(false);
      }

      // Add background when scrolled down
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-black/40 backdrop-blur-xl shadow-2xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div
          className={`flex flex-row gap-3 items-center transition-all duration-300 group cursor-pointer ${
            isScrolled ? "text-white" : "text-white"
          }`}
        >
          <img
            src="/vite.svg"
            alt="Logo"
            className="h-8 w-auto group-hover:rotate-12 transition-transform"
          />
          <span className="text-xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Nyota Digital Labs
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-10 items-center">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <li key={item}>
              <a
                href="#"
                className={`relative text-sm font-medium transition-all duration-300 group ${
                  isScrolled
                    ? "text-gray-200 hover:text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="relative ml-6 px-6 py-2 font-semibold text-white text-sm overflow-hidden group rounded-lg transition-all duration-300">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Border glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-lg opacity-50 blur-md group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

          {/* Button text */}
          <span className="relative z-10 block">Get Started</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
