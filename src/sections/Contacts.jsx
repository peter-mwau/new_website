// src/sections/Contacts.jsx
import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import VantaBirdsBG from "../backgrounds/VantaBirdsBg";

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
          >
            <Icon size={20} />
          </a>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-400 mt-4">
            Let’s build something futuristic together.
          </p>
        </div>

        {/* Time Rings */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {rings.map((ring, i) => {
            const rotation = getRotation(ring.value % ring.max, ring.max);
            return (
              <div key={i} className="flex flex-col items-center">
                <div className="relative w-24 h-24">
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
                          fill="#22d3ee"
                          textAnchor="middle"
                          transform={`rotate(${(360 / ring.max) * n} 50 50)`}
                        >
                          {n + 1}
                        </text>
                      ))}
                    </g>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-cyan-400 font-bold">
                    {ring.value}
                  </div>
                </div>
                <span className="mt-2 text-xs text-gray-400">{ring.label}</span>
              </div>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left: Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-cyan-400">
              Contact Information
            </h3>
            <div className="flex items-center gap-4 text-gray-300">
              <Mail className="text-cyan-400" />
              hello@nyota.tech
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <Phone className="text-cyan-400" />
              +254 700 123 456
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <MapPin className="text-cyan-400" />
              Nairobi, Kenya
            </div>
          </div>

          {/* Middle Right: Contact Form */}
          <div className="lg:col-span-2 bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-400 outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-400 outline-none"
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-400 outline-none"
              />
              <button
                type="submit"
                className="bg-cyan-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-cyan-300 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacts;
