// src/sections/Contacts.jsx
import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Clock2Icon } from "lucide-react";
import VantaBirdsBG from "../backgrounds/VantaBirdsBg";
import { FaWhatsapp } from "react-icons/fa";

function Contacts() {
  const [time, setTime] = useState(new Date());
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getRotation = (value, max) => (value / max) * 360;

  const rings = [
    { label: "Year", value: time.getFullYear(), max: 100 },
    { label: "Month", value: time.getMonth() + 1, max: 12 },
    { label: "Day", value: time.getDate(), max: 31 },
    { label: "Hour", value: time.getHours(), max: 24 },
    { label: "Minute", value: time.getMinutes(), max: 60 },
    { label: "Second", value: time.getSeconds(), max: 60 },
  ];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <VantaBirdsBG />
      </div>

      {/* Floating Social Icons */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {[Github, Linkedin, Twitter].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="w-11 h-11 flex items-center justify-center rounded-full
                       bg-gray-900/70 border border-cyan-400/30
                       hover:bg-cyan-400 hover:text-black
                       transition-all duration-300"
            aria-label={`social-${i}`}
          >
            <Icon size={20} />
          </a>
        ))}
      </div>

      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {[Phone, Mail, FaWhatsapp].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="w-11 h-11 flex items-center justify-center rounded-full
                       bg-gray-900/70 border border-cyan-400/30
                       hover:bg-cyan-400 hover:text-black
                       transition-all duration-300"
            aria-label={`social-left-${i}`}
          >
            <Icon size={20} />
          </a>
        ))}
      </div>

      {/* Page content container — header + main area that fills viewport */}
      <div className="container mx-auto px-6 relative z-10 max-h-[calc(90vh-4rem)] flex flex-col">
        {/* Header (fixed-ish height) */}
        <div className="relative text-center mt-30 mb-20 h-28 flex-shrink-0">
          <h2
            className="absolute inset-0 flex items-center justify-center text-6xl md:text-7xl lg:text-8xl
            font-extrabold text-white/8 uppercase tracking-widest pointer-events-none select-none"
          >
            Our Contact
          </h2>
          <div className="relative z-10">
            <h3 className="text-gray-400 text-2xl md:text-3xl tracking-widest backdrop-blur-sm inline-block px-3 py-1 rounded-3xl">
              Get in Touch
            </h3>
          </div>
        </div>

        {/* Main area — fills remaining height */}
        <div className="flex-1 w-full flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left column: compact rings + contact info (1/3 width on lg) */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            {/* Compact time rings row (wrap if needed) */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {rings.map((ring, i) => {
                const rotation = getRotation(ring.value % ring.max, ring.max);
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="relative w-16 h-16 rounded-full p-1 border border-gray-700 bg-gray-900/40 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="48" stroke="#111827" strokeWidth="3" fill="none" />
                        <g
                          style={{
                            transform: `rotate(${rotation}deg)`,
                            transformOrigin: "50% 50%",
                            transition: "transform 0.6s linear",
                          }}
                        >
                          {[...Array(Math.min(ring.max, 8))].map((_, n) => (
                            // only render a few marks to keep it compact
                            <rect key={n} x="48" y="6" width="4" height="6" fill="#60a5fa" transform={`rotate(${(360 / Math.min(ring.max, 8)) * n} 50 50)`} />
                          ))}
                        </g>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-blue-300 font-semibold text-sm">
                        {String(ring.value).slice(-2)}
                      </div>
                    </div>
                    <span className="mt-1 text-[10px] text-gray-400">{ring.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Contact Info box (sticky-ish visual but not overflow-causing) */}
            <div className="bg-gray-900/70 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-gray-700 flex-1">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">Contact Information</h3>

              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Mail className="text-blue-300" />
                  <span>hello@nyota.tech</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-blue-300" />
                  <span>+254 700 123 456</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-blue-300" />
                  <span>Nairobi, Kenya</span>
                </div>

                <div className="pt-4 border-t border-gray-800 mt-4 text-xs text-gray-400">
                  <p className="mb-2 flex items-center gap-2"><Clock2Icon className="text-blue-300" /> <span>Office Hours: Mon–Fri, 9:00–17:00 (EAT)</span></p>
                  <p className="mt-6">We typically reply within 1–2 business days. For urgent matters use the phone/WhatsApp number above.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: form — takes remaining width and limited height but no scrolling */}
          <div className="lg:col-span-2 lg:w-2/3">
            <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-4 md:p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-blue-300 mb-4">Send a Message</h3>

                {/* Inputs arranged horizontally on md+ to save vertical space */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="md:col-span-1">
                    <label className="text-sm font-medium text-gray-300 mb-1 block">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:border-blue-300 outline-none text-sm"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-sm font-medium text-gray-300 mb-1 block">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:border-blue-300 outline-none text-sm"
                    />
                  </div>

                  {/* Message spans full width but is shorter */}
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-300 mb-1 block">Your Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Your Message"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:border-blue-300 outline-none text-sm resize-none"
                    />
                  </div>

                  {/* Buttons area — aligned to the right on larger screens */}
                  <div className="md:col-span-2 flex items-center justify-between gap-3 mt-1">
                    <div className="text-sm text-gray-400 hidden md:block">
                      Prefer email? <a href="mailto:hello@nyota.tech" className="text-blue-300 underline">hello@nyota.tech</a>
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                      <button
                        type="submit"
                        className="bg-blue-300 text-black font-semibold px-4 md:px-6 py-2 rounded-lg hover:bg-blue-200 transition text-sm"
                      >
                        Send Message
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          // quick reset
                          setForm({ name: "", email: "", message: "" });
                        }}
                        className="px-3 py-2 rounded-md border border-gray-700 text-gray-200 text-sm"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Small footer row (visible on small screens) */}
              <div className="mt-4 text-xs text-gray-400 md:hidden">
                Prefer email? <a href="mailto:hello@nyota.tech" className="text-blue-300 underline">hello@nyota.tech</a>
              </div>
            </div>
          </div>
        </div>

        {/* Small bottom spacing so footer isn't flush with viewport bottom */}
        <div className="h-8" />
      </div>
    </section>
  );
}

export default Contacts;
