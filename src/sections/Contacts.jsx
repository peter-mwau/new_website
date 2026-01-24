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
    <section className="relative min-h-screen bg-black text-white py-20 overflow-hidden">
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

      {/* Floating Social Icons */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {[Phone, Mail, FaWhatsapp].map((Icon, i) => (
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

      {/* Content - constrain to viewport and allow internal scrolling */}
      <div className="container mx-auto px-6 relative z-10 max-h-[calc(100vh-6rem)]">
        {/* Title */}
        <div className="relative text-center mt-4 mb-8">
          <h2
            className="absolute inset-0 flex items-center justify-center text-7xl md:text-8xl lg:text-9xl
            font-extrabold text-white/10 uppercase tracking-widest pointer-events-none select-none"
          >
            Our Contact
          </h2>
          <div className="relative z-10">
            <h3 className="text-gray-400 text-3xl md:text-4xl mb-4 tracking-widest backdrop-blur-sm inline-block px-3 py-1 rounded-3xl">
              Get in Touch
            </h3>
          </div>
        </div>

        {/* Make a scroll wrapper so the entire main area can scroll without exceeding the viewport */}
        <div className="max-h-[calc(80vh-10rem)] overflow-auto pb-8">
          {/* Time Rings */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 mb-22">
            {rings.map((ring, i) => {
              const rotation = getRotation(ring.value % ring.max, ring.max);
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="relative w-35 h-35 backdrop-blur-xl rounded-full p-3 border border-gray-700">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="#1f2937"
                        strokeWidth="4"
                        fill="none"
                      />
                      <g
                        style={{
                          transform: `rotate(${rotation}deg)`,
                          transformOrigin: "50% 50%",
                          transition: "transform 0.6s linear",
                        }}
                      >
                        {[...Array(ring.max)].map((_, n) => (
                          <text
                            key={n}
                            x="50"
                            y="10"
                            fontSize="5"
                            fill="#64b9ff"
                            textAnchor="middle"
                            transform={`rotate(${(360 / ring.max) * n} 50 50)`}
                          >
                            {n + 1}
                          </text>
                        ))}
                      </g>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-blue-300 font-bold">
                      {ring.value}
                    </div>
                  </div>
                  <span className="mt-2 text-xs font-medium text-gray-400">{ring.label}</span>
                </div>
              );
            })}
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left: Contact Info (sticky on large screens) */}
            <div className="space-y-6 backdrop-blur-xl rounded-2xl p-6 md:p-8">
              <div className="sticky top-24 space-y-6">
                <h3 className="text-2xl font-semibold text-blue-300">
                  Contact Information
                </h3>
                <div className="flex items-center gap-4 text-gray-300">
                  <Mail className="text-blue-300" />
                  <span>hello@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <Phone className="text-blue-300" />
                  <span>+254 700 123 456</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <MapPin className="text-blue-300" />
                  <span>Nairobi, Kenya</span>
                </div>
                <div className="pt-4 border-t border-gray-800 mt-4 text-sm text-gray-400">
                  <p className="mb-2"><Clock2Icon className="inline mr-2 text-blue-300" />Office Hours: Mon - Fri, 9:00 AM - 5:00 PM (EAT)</p>
                  <p className="mt-6">
                    We try to reply within 1–2 business days. If your message is urgent, please use the phone number above.
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Right: Contact Form (scrollable if content grows) */}
            <div
              className="lg:col-span-2 bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 md:p-8
                         max-h-[60vh]"
              aria-labelledby="contact-form-title"
            >
              <h3 id="contact-form-title" className="text-2xl font-semibold text-blue-300 mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-300 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-300 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Your Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-300 outline-none resize-none"
                  />
                </div>

                <div className="flex gap-3 items-center">
                  <button
                    type="submit"
                    className="bg-blue-300 text-black font-semibold px-6 py-3 rounded-lg hover:bg-blue-200 transition"
                  >
                    Send Message
                  </button>

                  <div className="text-sm text-gray-400">
                    Prefer email? <a href="mailto:hello@nyota.tech" className="text-blue-300 underline">hello@gmail.com</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacts;
