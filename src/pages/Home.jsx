import React from "react";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="w-full min-h-screen flex items-center justify-center pt-20 pb-20 relative overflow-hidden"
        style={{
          backgroundImage: "url(/hero1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Subtle overlay to maintain image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>

        <div className="relative z-10 w-full px-4 md:px-6">
          {/* Main Glassmorphic Container with Unique Cuts */}
          <div className="relative max-w-6xl mx-auto">
            {/* Glassmorphism Background with Corner Cuts */}
            <div className="relative overflow-hidden">
              {/* Glassmorphic Base */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/30 rounded-[40px] p-8 md:p-12 shadow-2xl">
                {/* Corner Cut Decorations */}
                <div className="absolute -top-2 -left-2 w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-purple-500/30 backdrop-blur-sm rounded-lg rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="absolute -top-2 -right-2 w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-bl from-pink-400/30 to-cyan-500/30 backdrop-blur-sm rounded-lg rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-gradient-to-bl from-pink-400 to-cyan-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="absolute -bottom-2 -left-2 w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 backdrop-blur-sm rounded-lg rotate-45 clip-triangle"></div>
                </div>

                <div className="absolute -bottom-2 -right-2 w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400/20 to-purple-500/20 backdrop-blur-sm rounded-lg rotate-45 clip-triangle-reverse"></div>
                </div>

                {/* Diagonal Cut Lines */}
                <div className="absolute top-4 left-4 w-24 h-1 bg-gradient-to-r from-cyan-400/50 to-transparent rotate-45"></div>
                <div className="absolute top-4 right-4 w-24 h-1 bg-gradient-to-l from-pink-400/50 to-transparent -rotate-45"></div>
                <div className="absolute bottom-4 left-4 w-24 h-1 bg-gradient-to-r from-purple-400/50 to-transparent -rotate-45"></div>
                <div className="absolute bottom-4 right-4 w-24 h-1 bg-gradient-to-l from-cyan-400/50 to-transparent rotate-45"></div>

                {/* Content Grid */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                  {/* Left Content - 9 columns */}
                  <div className="lg:col-span-8 text-left">
                    {/* Top Badge */}
                    <div className="inline-block mb-8 px-6 py-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
                      <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text">
                        ✨ Nyota Digital Labs
                      </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                      <span className="block text-white mb-2">Build the</span>
                      <span className="block text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">
                        Future
                      </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
                      Transform your vision into reality with Web2, Web3,
                      Mobile, and AI/ML solutions
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 items-start mb-12">
                      <button className="group relative px-8 sm:px-10 py-4 font-bold text-white text-lg overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 active:scale-95">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-xl opacity-50 blur-xl group-hover:opacity-75 transition-opacity"></div>
                        <span className="relative z-10">
                          Start Your Project
                        </span>
                      </button>

                      <button className="px-8 sm:px-10 py-4 font-semibold text-white text-lg rounded-xl backdrop-blur-md bg-white/10 border-2 border-white/30 hover:border-cyan-400/50 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95">
                        Learn More
                      </button>
                    </div>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap gap-3">
                      {[
                        "Web2 Development",
                        "Web3 & Blockchain",
                        "Mobile Apps",
                        "AI/ML Solutions",
                      ].map((service, i) => (
                        <div
                          key={i}
                          className="px-5 py-2.5 rounded-full backdrop-blur-md bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                        >
                          <span className="text-white/80 font-medium text-sm">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Visual - 3 columns */}
                  <div className="lg:col-span-4 flex items-center justify-center h-full">
                    <div className="relative group">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>

                      {/* Robotic Hand - Fixed Size Issue */}
                      <img
                        src="/robotic hand.png"
                        alt="Robotic Hand"
                        className="relative w-full h-auto max-h-[500px] min-h-[300px] object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          animation: "float 6s ease-in-out infinite",
                        }}
                      />

                      {/* Animated Orbital Dots */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                            style={{
                              top: `${50 + 40 * Math.sin(Date.now() * 0.001 + i * 2)}%`,
                              left: `${50 + 40 * Math.cos(Date.now() * 0.001 + i * 2)}%`,
                              animation: `orbit ${4 + i}s linear infinite`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add custom styles for animations and corner cuts */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes orbit {
            0% {
              transform: rotate(0deg) translateX(150px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translateX(150px) rotate(-360deg);
            }
          }

          .clip-triangle {
            clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
          }

          .clip-triangle-reverse {
            clip-path: polygon(100% 0%, 100% 100%, 0% 100%);
          }
        `}</style>
      </div>
    </>
  );
}

export default Home;
