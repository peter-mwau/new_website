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

  const ActiveSectionComponent = sections[activeSection].component;
  const ActiveBackgroundComponent = sections[activeSection].background;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Fixed background layer with transitions */}
      <div className="fixed inset-0 z-0">
        {Object.entries(sections).map(([key, { background: BgComponent }]) => (
          <div
            key={key}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSection === key ? "opacity-100" : "opacity-0"
            }`}
          >
            <BgComponent />
          </div>
        ))}
      </div>

      {/* Navbar */}
      <div className="relative z-50">
        <Navbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      {/* Section content with transitions */}
      <div className="relative z-10 h-screen w-full">
        {Object.entries(sections).map(
          ([key, { component: SectionComponent }]) => (
            <div
              key={key}
              className={`absolute inset-0 h-screen w-full transition-all duration-700 ease-in-out ${
                activeSection === key
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 translate-x-8 scale-95 pointer-events-none"
              }`}
            >
              <SectionComponent />
            </div>
          ),
        )}
      </div>
    </div>
  );
}
export default Home;
