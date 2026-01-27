// src/sections/Services.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import servicesData from "../constants/services"; // <- your services JS module
import { coder, cloud, ml, web3, mobile } from "../assets/images";
import VantaDotsBG from "../backgrounds/VantaDotsBg";
import {
  Code2,
  Cloud,
  Brain,
  Smartphone,
  Terminal,
  X,
  ArrowRightFromLineIcon,
  BlocksIcon,
} from "lucide-react";

// --- Map service ids to icons/images you have available in your assets/icons ---
const iconMap = {
  web2: Code2,
  web3: BlocksIcon,
  android: Smartphone,
  ai_ml: Brain,
  cloud: Cloud,
};

const imageMap = {
  web2: coder,
  web3: web3,
  android: mobile,
  ai_ml: ml,
  cloud: cloud,
};

// --- Convert imported JSON services into the shape the component expects ---
const services = servicesData.services.map((s) => {
  const techStack = s.tech_stack ? Object.values(s.tech_stack).flat() : [];

  return {
    id: s.id,
    title: s.name,
    description: s.description,
    image: imageMap[s.id] || "", // local image import (fallback to empty)
    imageKeyword: s.offerings?.[0] || s.tags?.[0] || s.name,
    techStack,
    offerings: s.offerings || [],
    tags: s.tags || [],
    useCases: s.use_cases || [],
    deliveryModel: s.delivery_model || [],
    icon: iconMap[s.id] || Code2,
  };
});

// Duplicate services for seamless loop
const loopedServices = [...services, ...services];

// (You can keep/adjust this if you still want a full tech list elsewhere)
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

const Services = ({ onNavigate }) => {
  const [showSidebar, setShowSidebar] = useState(false); // formerly showTechStack
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);

  // Image helper (prefers local image, otherwise uses Unsplash)
  const getImageUrl = (service) => {
    if (
      service.image &&
      typeof service.image === "string" &&
      service.image !== ""
    ) {
      return service.image;
    }
    const keyword = encodeURIComponent(service.imageKeyword || service.title);
    return `https://source.unsplash.com/800x450/?${keyword}`;
  };

  // Continuous auto-scroll (requestAnimationFrame) with mouse-reactive speed
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const baseSpeed = 0.6;
    const maxMultiplier = 3.0;
    const speedRef = { current: baseSpeed };
    let rafId = null;

    const getHalfWidth = () => el.scrollWidth / 2 || 0;

    const loop = () => {
      if (el.scrollWidth > el.clientWidth && !pausedRef.current) {
        el.scrollLeft += speedRef.current;
        const half = getHalfWidth();
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        if (el.scrollLeft <= 0) el.scrollLeft += half;
      }
      rafId = requestAnimationFrame(loop);
    };

    let rect = null;
    const onPointerMove = (e) => {
      rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const normalized = (x / rect.width - 0.5) * 2;
      speedRef.current = baseSpeed * (1 + normalized * maxMultiplier);
    };
    const onPointerLeave = () => (speedRef.current = baseSpeed);
    const onTouchMove = (e) => {
      if (!e.touches || !e.touches[0]) return;
      rect = el.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const normalized = (x / rect.width - 0.5) * 2;
      speedRef.current = baseSpeed * (1 + normalized * maxMultiplier);
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onPointerLeave);

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
      if (e.key === "Escape" && showModal) closeModal();
    };
    pausedRef.current = !!showModal;
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showModal]);

  const openModalFor = (index) => {
    const idx = index % services.length;
    setSelectedService(services[idx]);
    setShowSidebar(true);
    setShowModal(true);
    pausedRef.current = true;
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
    pausedRef.current = false;
  };

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

      {/* Floating Sidebar Button */}
      <button
        onClick={() => setShowSidebar((v) => !v)}
        className="fixed right-4 top-1/2 z-50 bg-blue-300 hover:bg-blue-400 text-black p-3 rounded-full shadow-lg"
        title="View Service Details"
      >
        <Terminal className="w-5 h-5" />
      </button>

      {/* Sidebar Panel (now shows Offerings / Tags / Use Cases / Delivery Model) */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: showSidebar ? 0 : "100%" }}
        transition={{ duration: 0.35 }}
        className="fixed top-0 right-0 h-full w-80 backdrop-blur-sm z-60 p-6 overflow-y-auto bg-gray-900/70 border-l border-gray-800"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-100 text-2xl font-bold text-center">
            Service Details
          </h3>
          <button
            onClick={() => setShowSidebar(false)}
            aria-label="Close details"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {!selectedService && (
          <div className="text-sm text-gray-400 mb-4">
            Open any service card to view its offerings, tags, use cases and
            delivery model.
          </div>
        )}

        {selectedService && (
          <>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-white mt-1">
                {selectedService.title}
              </h4>
              <p className="text-sm text-gray-300 mt-2">
                {selectedService.description}
              </p>
            </div>

            {/* Offerings */}
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-blue-300 mb-2">
                Offerings
              </h5>
              <ul className="list-inside space-y-2 text-sm text-gray-200">
                {selectedService.offerings.length > 0 ? (
                  selectedService.offerings.map((o, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 text-cyan-300">•</span>
                      <span>{o}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No offerings listed.</li>
                )}
              </ul>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-blue-300 mb-2">Tags</h5>
              <div className="flex flex-wrap gap-2">
                {selectedService.tags.length > 0 ? (
                  selectedService.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-gray-800/60 border border-gray-700 text-blue-300"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <div className="text-gray-400">No tags.</div>
                )}
              </div>
            </div>

            {/* Use Cases */}
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-blue-300 mb-2">
                Use Cases
              </h5>
              <ul className="list-inside space-y-2 text-sm text-gray-200">
                {selectedService.useCases.length > 0 ? (
                  selectedService.useCases.map((uc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 text-cyan-300">•</span>
                      <span>{uc}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No use cases specified.</li>
                )}
              </ul>
            </div>

            {/* Delivery Model */}
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-blue-300 mb-2">
                Delivery Model
              </h5>
              <div className="flex flex-col gap-2">
                {selectedService.deliveryModel.length > 0 ? (
                  selectedService.deliveryModel.map((dm, i) => (
                    <span
                      key={i}
                      className="text-sm px-3 py-2 rounded-md bg-gray-800/60 border border-gray-700 text-gray-200"
                    >
                      {dm}
                    </span>
                  ))
                ) : (
                  <div className="text-gray-400">No delivery model listed.</div>
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="relative mt-2 mb-16 h-28 sm:h-32 flex items-center justify-center">
          {/* Background text */}
          <h2
            className="absolute inset-0 flex items-center justify-center text-center text-7xl sm:text-8xl md:text-9xl font-extrabold text-white/10 uppercase tracking-widest
                        pointer-events-none select-none"
          >
            Expertise
          </h2>

          {/* Foreground text */}
          <h3
            className="text-gray-400 relative z-10 text-3xl md:text-4xl tracking-widest backdrop-blur-sm rounded-3xl">
            Our Features Services
          </h3>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-scroll no-scrollbar touch-none select-none"
          aria-label="Services carousel"
        >
          {loopedServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <article
                key={`${service.id}-${i}`}
                onClick={() => {
                  const idx = i % services.length;
                  setSelectedService(services[idx]);
                  setShowSidebar(true);
                  setShowModal(true);
                  pausedRef.current = true;
                }}
                className="cursor-pointer flex-shrink-0 w-[320px] md:w-[360px] bg-gray-900/60 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm shadow-lg"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    const idx = i % services.length;
                    setSelectedService(services[idx]);
                    setShowSidebar(true);
                    setShowModal(true);
                    pausedRef.current = true;
                  }
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
                    <Icon className="w-7 h-7 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                  <p className="text-sm text-blue-300 mt-4 hover:text-blue-300">
                    Learn More{" "}
                    <ArrowRightFromLineIcon className="w-4 h-4 inline ml-1" />
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => {
              closeModal();
              setShowSidebar(false);
            }}
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
                  onClick={() => {
                    closeModal();
                    setShowSidebar(false);
                  }}
                  aria-label="Close modal"
                  className="ml-4"
                >
                  <X className="w-6 h-6 text-gray-300" />
                </button>
              </div>

              {/* keep tech stack in modal as additional info */}
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
                    closeModal();
                    setShowSidebar(false);
                    if (typeof onNavigate === "function")
                      onNavigate("contacts");
                  }}
                  aria-label="Get in touch"
                  className="px-4 py-2 rounded-full bg-blue-300 text-black font-medium"
                >
                  Get in touch
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Services;
