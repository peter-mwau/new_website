//src/sections/Hero.jsx
import WebThreeRareBG from "../backgrounds/WebThreeRareBg-dark";

const Hero = ({ onNavigate }) => {
  return (
    <>
      <div className="relative w-full h-screen bg-linear-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* Hero Vanta background */}

        <div className="absolute inset-0 z-0 pointer-events-none">
          <WebThreeRareBG />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-wider text-center">
            Nyota Digital Labs
          </h1>

          {/* Tagline */}
          <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-300 text-center max-w-2xl">
            Crafting stellar digital experiences.
          </p>

          {/* Minimal navigation below tagline */}
          <nav className="mt-8">
            <ul className="flex items-center justify-center divide-x divide-white/20">
              {[
                { label: "HOME", section: "hero" },
                { label: "SERVICES", section: "services" },
                { label: "PROJECTS", section: "projects" },
                { label: "TEAM", section: "team" },
                { label: "CONTACT", section: "contacts" },
              ].map((item) => (
                <li key={item.section} className="first:pl-0 px-4">
                  <button
                    onClick={() => onNavigate(item.section)}
                    className="uppercase tracking-widest text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
export default Hero;
