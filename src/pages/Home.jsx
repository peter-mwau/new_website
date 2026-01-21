import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Projects from "../sections/Projects";
import Team from "../sections/Team";
import Contacts from "../sections/Contacts";

import WebThreeRareBG from "../backgrounds/WebThreeRareBg-dark";
import VantaNetBG from "../backgrounds/VantaNetBg";
import VantaGlobeBG from "../backgrounds/VantaGlobeBG";
import VantaDotsBG from "../backgrounds/VantaDotsBg";
import VantaBirdsBG from "../backgrounds/VantaBirdsBg";

function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  const sections = {
    hero: { Component: Hero, Background: WebThreeRareBG },
    services: { Component: Services, Background: VantaNetBG },
    projects: { Component: Projects, Background: VantaGlobeBG },
    team: { Component: Team, Background: VantaDotsBG },
    contacts: { Component: Contacts, Background: VantaBirdsBG },
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Backgrounds (always pointer-events-none to avoid capturing clicks) */}
      <div className="fixed inset-0 z-0">
        {Object.entries(sections).map(([key, { Background }]) => (
          <div
            key={key}
            // ensure background is never on top and never captures pointer events
            className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
              activeSection === key ? "opacity-100" : "opacity-0"
            }`}
            style={{ zIndex: 0 }}
          >
            {/* force no pointer events on the background wrapper */}
            <div className="no-pointer-events">
              <Background />
            </div>
          </div>
        ))}
      </div>

      {/* Navbar */}
      {activeSection !== "hero" && (
        <div className="relative z-50">
          <Navbar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
      )}

      {/* Sections: active section has pointer-events enabled and higher z-index */}
      <div className="relative z-10 h-screen w-full">
        {Object.entries(sections).map(([key, { Component }]) => {
          const isActive = activeSection === key;
          return (
            <div
              key={key}
              // when active: ensure pointer events and top stacking so clicks register
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                  : "opacity-0 translate-x-8 scale-95 pointer-events-none"
              }`}
              style={{ zIndex: isActive ? 40 : 10 }}
            >
              {/* pass onNavigate always; sections that don't use it just ignore it */}
              <Component onNavigate={setActiveSection} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
