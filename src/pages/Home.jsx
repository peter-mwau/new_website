import React from "react";

function Home() {
  const services = [
    {
      icon: "🌐",
      title: "Web2 Development",
      description:
        "Modern, scalable web applications with cutting-edge technologies",
    },
    {
      icon: "⛓️",
      title: "Web3 & Blockchain",
      description: "Smart contracts, DApps, and decentralized solutions",
    },
    {
      icon: "📱",
      title: "Mobile Development",
      description: "Native and cross-platform Android applications",
    },
    {
      icon: "🚀",
      title: "Hosting Services",
      description:
        "Reliable, secure, and high-performance hosting infrastructure",
    },
  ];

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center pt-20 pb-20"
      style={{
        backgroundImage: "url(/hero1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {/* Main Hero Content */}
        <div className="text-center mb-20">
          <div className="mb-6 inline-block">
            <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-cyan-400/50 transition-colors duration-300">
              <span className="text-sm font-medium text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text">
                ✨ Welcome to Nyota Digital Labs
              </span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">Build the Future</span>{" "}
            <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">
              With Us
            </span>
          </h1>

          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Transform your vision into reality. We specialize in Web2, Web3,
            Mobile Apps, and AI/ML solutions that drive innovation and growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="relative px-8 py-4 font-semibold text-white text-lg overflow-hidden group rounded-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-lg opacity-100 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-lg opacity-50 blur-lg -z-10"></div>
              <span className="relative z-10">Start Your Project</span>
            </button>

            <button className="px-8 py-4 font-semibold text-white text-lg rounded-lg border-2 border-white/30 hover:border-white/60 hover:bg-white/10 backdrop-blur-md transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 p-6 hover:border-white/40 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-cyan-400/20 group-hover:via-purple-400/20 group-hover:to-pink-400/20 transition-all duration-300 rounded-2xl"></div>

              <div className="relative z-10">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* AI/ML Section */}
        <div className="mt-16 relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 via-purple-500/10 to-pink-500/10 border border-white/20 p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-purple-400/10 to-pink-400/0 rounded-2xl"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-black mb-4 text-white">
                AI & Machine Learning
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Leverage the power of artificial intelligence and machine
                learning to automate processes, gain insights, and create
                intelligent solutions that scale.
              </p>
              <ul className="space-y-3">
                {[
                  "Predictive Analytics",
                  "Computer Vision",
                  "NLP Solutions",
                  "Custom ML Models",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-white/80">
                    <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-pink-500/20 rounded-xl backdrop-blur-xl border border-white/20 flex items-center justify-center">
                <span className="text-6xl">🤖</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
