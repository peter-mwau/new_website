import React from "react";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="w-full min-h-screen flex items-center justify-center pt-20 pb-20 relative"
        style={{
          backgroundImage: "url(/hero1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Subtle overlay to maintain image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>

        <div className="relative z-10 w-full px-6">
          {/* Main Glassmorphic Container - Flex Row Layout */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {/* Left Content - 80% (cols 1-4) */}
              <div className="md:col-span-4 text-left">
                {/* Top Badge */}
                <div className="inline-block mb-8 px-6 py-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:border-cyan-400/50 transition-all duration-300">
                  <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text">
                    ✨ Nyota Digital Labs
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                  <span className="block text-white mb-2">Build the</span>
                  <span className="block text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">
                    Future
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-xl leading-relaxed">
                  Transform your vision into reality with Web2, Web3, Mobile,
                  and AI/ML solutions
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <button className="group relative px-10 py-4 font-bold text-white text-lg overflow-hidden rounded-xl transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-xl opacity-50 blur-xl group-hover:opacity-75 transition-opacity"></div>
                    <span className="relative z-10">Start Your Project</span>
                  </button>

                  <button className="px-10 py-4 font-semibold text-white text-lg rounded-xl backdrop-blur-md bg-white/10 border-2 border-white/30 hover:border-cyan-400/50 hover:bg-white/20 transition-all duration-300">
                    Learn More
                  </button>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-4 mt-12">
                  {[
                    "Web2 Development",
                    "Web3 & Blockchain",
                    "Mobile Apps",
                    "AI/ML Solutions",
                  ].map((service, i) => (
                    <div
                      key={i}
                      className="px-6 py-3 rounded-full backdrop-blur-md bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300"
                    >
                      <span className="text-white/80 font-medium">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual - 20% (col 5) */}
              <div className="md:col-span-1 flex flex-col items-center justify-center h-full">
                <img
                  src="/robotic hand.png"
                  alt="Robotic Hand"
                  className=" relativeh-full w-auto max-h-96 object-contain filter drop-shadow-lg hover:scale-110 transition-transform duration-700"
                  style={{
                    animation: "bounce 10s infinite",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
