import WebThreeRareBG from "../backgrounds/WebThreeRareBg-dark";

const Hero = ({ onNavigate }) => {
  // debug: show whether the prop arrived
  console.log("Hero mounted — onNavigate is", typeof onNavigate);

  const items = [
    // { label: "HOME", section: "hero" },
    { label: "SERVICES", section: "services" },
    { label: "PROJECTS", section: "projects" },
    { label: "TEAM", section: "team" },
    { label: "CONTACT", section: "contacts" },
  ];

  return (
    <div className="relative w-full h-screen bg-linear-to-b from-black via-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <WebThreeRareBG />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white text-center"
          style={{ letterSpacing: '0.45em' }}
        >
          NOVALORX LABS
        </h1>
        <div className="flex items-center justify-center mt-4 w-full mx-auto">
          <div className="h-px bg-white w-40"></div> {/* left line */}
          <p
            className="font-medium md:text-lg text-white px-4 text-center"
            style={{ letterSpacing: '0.45em' }}
          >
            Crafting stellar digital experiences
          </p>
          <div className="h-px bg-white w-40"></div> {/* right line */}
        </div>

        <nav className="mt-8 absolute bottom-12 backdrop-blur-md py-4">
          <ul className="flex items-center justify-center divide-x divide-white/20">
            {items.map((item) => (
              <li key={item.section} className="first:pl-0 px-20">
                <button
                  type="button"
                  onClick={() => {
                    console.log("Hero button clicked:", item.section);
                    // defensive call
                    if (typeof onNavigate === "function") {
                      onNavigate(item.section);
                    } else {
                      console.warn("onNavigate is not a function (Hero).");
                    }
                  }}
                  className="uppercase tracking-widest font-medium text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Hero;
