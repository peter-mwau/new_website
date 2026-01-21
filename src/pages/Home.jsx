// src/pages/Home.jsx
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
import Footer from "../components/Footer";

function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  const sections = {
    hero: { component: Hero, background: WebThreeRareBG },
    services: { component: Services, background: VantaNetBG },
    projects: { component: Projects, background: VantaGlobeBG },
    team: { component: Team, background: VantaDotsBG },
    contacts: { component: Contacts, background: VantaBirdsBG },
  };

  // Using mapped components directly below; no need for separate vars

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Fixed background layer with transitions */}
      <div className="fixed inset-0 z-0">
        {Object.keys(sections).map((key) => (
          <div
            key={key}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
              activeSection === key ? "opacity-100" : "opacity-0"
            }`}
          >
            {React.createElement(sections[key].background)}
          </div>
        ))}
      </div>

      {/* Navbar (hidden on hero) */}
      {activeSection !== "hero" && (
        <div className="relative z-50">
          <Navbar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
      )}

      {/* Section content with transitions */}
      <div className="relative z-10 h-screen w-full">
        {Object.keys(sections).map((key) => (
          <div
            key={key}
            className={`absolute inset-0 h-screen w-full transition-all duration-700 ease-in-out ${
              activeSection === key
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-8 scale-95 pointer-events-none"
            }`}
          >
            {key === "hero"
              ? React.createElement(sections[key].component, {
                  onNavigate: setActiveSection,
                })
              : React.createElement(sections[key].component)}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
