import React, { useState } from "react";

function Navbar({ activeSection, setActiveSection }) {
  const menuItems = [
    { label: "Home", section: "hero" },
    { label: "Services", section: "services" },
    { label: "Projects", section: "projects" },
    { label: "Team", section: "team" },
    { label: "Contact", section: "contacts" },
  ];

  const handleNavigate = (section) => {
    setActiveSection(section);
  };

  return (
    <nav className="relative z-50 px-8 py-5 bg-black/40 backdrop-blur-xl shadow-2xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div
          onClick={() => handleNavigate("hero")}
          className="flex flex-row gap-3 items-center transition-all duration-300 group cursor-pointer text-white"
        >
          <img
            src="/vite.svg"
            alt="Logo"
            className="h-8 w-auto group-hover:rotate-12 transition-transform"
          />
          <span className="text-xl font-black bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Nyota Digital Labs
          </span>
        </div>

        {/* Navigation Links (desktop) */}
        <ul className="hidden lg:flex gap-10 items-center">
          {menuItems.map((item) => (
            <li key={item.section}>
              <button
                onClick={() => handleNavigate(item.section)}
                className={`relative text-sm font-medium transition-all duration-300 group ${
                  activeSection === item.section
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400 transition-all duration-300 ${
                    activeSection === item.section
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-end">
          <MobileMenu
            menuItems={menuItems}
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />
        </div>

        {/* CTA Button */}
        {/* <button className="relative ml-6 px-6 py-2 font-semibold text-white text-sm overflow-hidden group rounded-lg transition-all duration-300"> */}
        {/* Gradient background */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}

        {/* Border glow effect */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-lg opacity-50 blur-md group-hover:opacity-100 transition-opacity duration-300 -z-10"></div> */}

        {/* Button text */}
        {/* <span className="relative z-10 block">Get Started</span> */}
        {/* </button> */}
      </div>
    </nav>
  );
}

function MobileMenu({ menuItems, activeSection, onNavigate }) {
  const [open, setOpen] = useState(false);

  const handleItemClick = (section) => {
    onNavigate(section);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((s) => !s)}
        className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-white focus:outline-none"
      >
        <svg
          className={`w-6 h-6 transition-transform ${open ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg py-3 z-50">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <li key={item.section}>
                <button
                  onClick={() => handleItemClick(item.section)}
                  className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                    activeSection === item.section
                      ? "text-white bg-white/10"
                      : "text-white/90 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
