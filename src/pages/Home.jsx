// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Projects from "../sections/Projects";
import Team from "../sections/Team";
import Contacts from "../sections/Contacts";
import WebThreeRareBG from '../backgrounds/WebThreeRareBg-dark';
import VantaNetBG from "../backgrounds/VantaNetBg";
import VantaGlobeBG from "../backgrounds/VantaGlobeBG";
import VantaDotsBG from "../backgrounds/VantaDotsBg";
import VantaBirdsBG from "../backgrounds/VantaBirdsBg";
import Footer from "../components/Footer";


function Home() {
  const [activeBackground, setActiveBackground] = useState('hero');
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let active = 'hero';
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            active = entry.target.id;
          }
        });
        setActiveBackground(active);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const renderBackground = () => {
    switch (activeBackground) {
      case 'hero':
        return <WebThreeRareBG />;
      case 'services':
        return <VantaNetBG />;
      case 'projects':
        return <VantaGlobeBG />;
      case 'team':
        return <VantaDotsBG />;
      case 'contacts':
        return <VantaBirdsBG />;
      default:
        return <WebThreeRareBG />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-0">
        {renderBackground()}
      </div>
      <div className="relative z-10">
        <div id="hero" ref={(el) => (sectionsRef.current[0] = el)}>
          <Hero />
        </div>
        <div id="services" ref={(el) => (sectionsRef.current[1] = el)}>
          <Services />
        </div>
        <div id="projects" ref={(el) => (sectionsRef.current[2] = el)}>
          <Projects />
        </div>
        <div id="team" ref={(el) => (sectionsRef.current[3] = el)}>
          <Team />
        </div>
        <div id="contacts" ref={(el) => (sectionsRef.current[4] = el)}>
          <Contacts />
        </div>
        <div id="footer" ref={(el) => (sectionsRef.current[5] = el)}>
          <Footer />
        </div>

      </div>
    </>
  );
}
export default Home;
