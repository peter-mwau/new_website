// src/sections/Services.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { coder, cloud, ml, cyber, mobile, speed } from "../assets/images";
import VantaDotsBG from "../backgrounds/VantaDotsBg";
import {
  Code2,
  Cloud,
  Brain,
  Shield,
  Smartphone,
  Gauge,
  Terminal,
  X,
  ArrowRightFromLineIcon,
} from "lucide-react";

// Services data (each service now declares a techStack array)
const services = [
  {
    icon: Code2,
    title: "Custom Development",
    description:
      "Tailored software solutions built with modern frameworks and best practices for scalable, maintainable codebases.",
    image: coder,
    imageKeyword: "software development, coding",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "GraphQL"],
  },
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description:
      "Design and deploy robust cloud infrastructure on AWS, GCP, or Azure with optimized performance and cost efficiency.",
    image: cloud,
    imageKeyword: "cloud infrastructure, cloud computing",
    techStack: ["AWS", "Docker", "Kubernetes"],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Integrate intelligent automation and predictive analytics to transform your business processes and decision-making.",
    image: ml,
    imageKeyword: "artificial intelligence, machine learning",
    techStack: ["Python", "TensorFlow", "Redis"],
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Comprehensive security audits, penetration testing, and implementation of enterprise-grade protection systems.",
    image: cyber,
    imageKeyword: "cybersecurity, security audit",
    techStack: ["Docker", "Kubernetes", "AWS"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
    image: mobile,
    imageKeyword: "mobile apps, smartphone app",
    techStack: ["React", "TypeScript", "Node.js"],
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    description:
      "Speed up your applications with advanced caching, CDN integration, and database optimization strategies.",
    image: speed,
    imageKeyword: "performance optimization, speed up app",
    techStack: ["Redis", "PostgreSQL", "AWS"],
  },
];

// Duplicate services for seamless loop
const loopedServices = [...services, ...services];

// Tech stack data (meta for the sidebar)
const technologies = [
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "AI/ML" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "PostgreSQL", category: "Database" },
  { name: "GraphQL", category: "API" },
  { name: "Kubernetes", category: "Orchestration" },
  { name: "TensorFlow", category: "AI/ML" },
  { name: "Redis", category: "Cache" },
  { name: "Next.js", category: "Framework" },
];

const Services = () => {
  const [showTechStack, setShowTechStack] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);

  // Image helper
  const getImageUrl = (service) => {
    if (service.image && service.image.startsWith("/")) return service.image;
    const keyword = encodeURIComponent(service.imageKeyword || service.title);
    return `https://source.unsplash.com/800x450/?${keyword}`;
  };

  // Continuous auto-scroll (requestAnimationFrame) with mouse-reactive speed
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const baseSpeed = 0.6; // base px per frame
    const maxMultiplier = 3.0; // how much the cursor affects speed

    // state kept in refs for performance inside RAF
    const speedRef = { current: baseSpeed };
    let rafId = null;

    // compute half-width of the scrollable content (since we duplicated items)
    const getHalfWidth = () => el.scrollWidth / 2 || 0;

    // main loop
    const loop = () => {
      // If content shorter than container, don't scroll
      if (el.scrollWidth > el.clientWidth && !pausedRef.current) {
        el.scrollLeft += speedRef.current;

        const half = getHalfWidth();
        // wrap seamlessly: when we've scrolled past half the duplicated content, jump back
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
        // If moving left (negative) and we go before 0, jump forward
        if (el.scrollLeft <= 0) {
          el.scrollLeft += half;
        }
      }
      rafId = requestAnimationFrame(loop);
    };

    // pointer handling (react to cursor over the container)
    let rect = null;
    const onPointerMove = (e) => {
      rect = el.getBoundingClientRect();
      // clientX relative to center (-1 .. 1)
      const x = e.clientX - rect.left;
      const normalized = (x / rect.width - 0.5) * 2; // -1 left, 0 center, +1 right

      // speed multiplier: when pointer is to the right -> speed up positive direction,
      // to the left -> negative speed (reverse). Center gives baseSpeed.
      speedRef.current = baseSpeed * (1 + normalized * maxMultiplier);
    };

    const onPointerLeave = () => {
      speedRef.current = baseSpeed; // reset
    };

    // Support touch: use touchmove
    const onTouchMove = (e) => {
      if (!e.touches || !e.touches[0]) return;
      rect = el.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const normalized = (x / rect.width - 0.5) * 2;
      speedRef.current = baseSpeed * (1 + normalized * maxMultiplier);
    };

    // Attach listeners
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onPointerLeave);

    // start loop
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onPointerLeave);
    };
  }, []);

  // Pause autoplay when modal opens; add ESC handler to close modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && showModal) {
        closeModal();
      }
    };
    if (showModal) pausedRef.current = true;
    else pausedRef.current = false;

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showModal]);

  const openModalFor = (index) => {
    // index might be from duplicated array; map to original
    const idx = index % services.length;
    setSelectedService(services[idx]);
    setShowTechStack(true);
    setShowModal(true);
    pausedRef.current = true;
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
    // keep tech stack open as the user requested the sidebar, but you can also close it
    // setShowTechStack(false);
    pausedRef.current = false;
  };

  // When sidebar is open and a service is selected, filter techs to show only relevant ones
  const sidebarTechs = selectedService
    ? technologies.filter((t) => selectedService.techStack.includes(t.name))
    : technologies;

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black text-white">
      <style>{`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <VantaDotsBG />
      </div>

      {/* Floating Tech Stack Button */}
      <button
        onClick={() => setShowTechStack((v) => !v)}
        className="fixed right-4 top-1/2 z-50 bg-blue-300 hover:bg-blue-400 text-black p-3 rounded-full shadow-lg"
        title="View Tech Stack"
      >
        <Terminal className="w-5 h-5" />
      </button>

      {/* Tech Stack Panel (shows filtered techs when a service is selected) */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: showTechStack ? 0 : "100%" }}
        transition={{ duration: 0.35 }}
        className="fixed top-0 right-0 h-full w-80 backdrop-blur-sm z-60 p-6 overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-500 text-2xl font-bold text-center gradient-text">
            Tech Stack
          </h3>
          <button
            onClick={() => setShowTechStack(false)}
            aria-label="Close tech stack"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {selectedService && (
          <div className="mb-4 text-sm text-gray-400">
            Showing techs related to:{" "}
            <strong className="text-white">{selectedService.title}</strong>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {sidebarTechs.map((tech, i) => (
            <div key={i} className="glass rounded-lg p-3 text-center">
              <div className="font-mono text-sm text-blue-300">{tech.name}</div>
              <div className="text-xs text-gray-400">{tech.category}</div>
            </div>
          ))}

          {sidebarTechs.length === 0 && (
            <div className="text-gray-400">
              No specific techs listed for this service.
            </div>
          )}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="relative text-center mb-30">
          {/* Background text */}
          <h2
            className="absolute inset-0 flex items-center justify-center text-7xl md:text-8xl lg:text-9xl
            font-extrabold text-white/10 uppercase tracking-widest pointer-events-none select-none"
          >
            Expertise
          </h2>

          {/* Foreground content */}
          <div className="relative z-10">
            <h3 className="text-gray-400 text-3xl md:text-4xl mb-4 tracking-widest backdrop-blur-sm inline-block px-3 py-1 rounded-3xl">
              Our Services
            </h3>

            {/* 
            <p className="text-gray-400 max-w-2xl mx-auto">
              End-to-end technology solutions designed to accelerate your
              digital transformation.
            </p> */}
          </div>
        </div>

        {/* Continuous Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-scroll no-scrollbar touch-none select-none"
          aria-label="Services carousel"
        >
          {loopedServices.map((service, i) => (
            <article
              key={i}
              onClick={() => openModalFor(i)}
              className="cursor-pointer flex-shrink-0 w-[320px] md:w-[360px] bg-gray-900/60 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm shadow-lg"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openModalFor(i);
              }}
            >
              <div className="h-40 md:h-44 bg-gray-800">
                <img
                  src={getImageUrl(service)}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 mt-4 mb-6 flex items-center justify-center rounded-md bg-blue-300/10">
                  <service.icon className="w-7 h-7 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-300 text-sm">{service.description}</p>
                <p className="text-sm text-blue-300 mt-4 hover:text-blue-300"> Learn More <ArrowRightFromLineIcon className="w-4 h-4 inline ml-1" /></p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeModal}
            aria-hidden
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative z-50 max-w-3xl w-full mx-4 md:mx-0 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedService.title} details`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-56 bg-gray-800">
              <img
                src={getImageUrl(selectedService)}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {selectedService.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {selectedService.description}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="ml-4"
                >
                  <X className="w-6 h-6 text-gray-300" />
                </button>
              </div>

              <div className="mt-4">
                <h4 className="text-sm text-gray-400 mb-2">
                  Relevant Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.techStack.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-gray-800/60 border border-gray-700 text-blue-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    // close modal + sidebar, then tell parent to navigate to contacts
                    closeModal();
                    setShowTechStack(false);
                    if (typeof onNavigate === "function")
                      onNavigate("contacts");
                  }}
                  aria-label="Get in touch"
                  className="px-4 py-2 rounded-md bg-blue-500 text-black font-medium"
                >
                  Get in touch
                </button>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="px-4 py-2 rounded-md border border-gray-700 text-gray-200"
                >
                  View case study
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Services;
