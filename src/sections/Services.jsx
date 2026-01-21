// src/sections/Services.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import VantaNetBG from "../backgrounds/VantaNetBg";
import { Code2, Cloud, Brain, Shield, Smartphone, Gauge, Terminal } from "lucide-react";

// Services data
const services = [
  { icon: Code2, title: "Custom Development", description: "Tailored software solutions built with modern frameworks and best practices for scalable, maintainable codebases." },
  { icon: Cloud, title: "Cloud Architecture", description: "Design and deploy robust cloud infrastructure on AWS, GCP, or Azure with optimized performance and cost efficiency." },
  { icon: Brain, title: "AI & Machine Learning", description: "Integrate intelligent automation and predictive analytics to transform your business processes and decision-making." },
  { icon: Shield, title: "Cybersecurity", description: "Comprehensive security audits, penetration testing, and implementation of enterprise-grade protection systems." },
  { icon: Smartphone, title: "Mobile Apps", description: "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices." },
  { icon: Gauge, title: "Performance Optimization", description: "Speed up your applications with advanced caching, CDN integration, and database optimization strategies." },
];

// Tech stack data
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

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <VantaNetBG />
      </div>

      {/* Floating Tech Stack Button */}
      <button
        onClick={() => setShowTechStack((prev) => !prev)}
        className="fixed right-4 top-1/2 z-50 bg-cyan-500 hover:bg-cyan-400 text-black p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        title="View Tech Stack"
      >
        <Terminal className="w-5 h-5" />
      </button>

      {/* Sliding Tech Stack Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: showTechStack ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.5 }}
        className="fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-lg shadow-xl z-40 p-6 overflow-y-auto"
      >
        <h3 className="text-2xl font-bold mb-6 text-center gradient-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Tech Stack
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-lg p-3 text-center cursor-default group"
            >
              <div className="font-mono text-sm font-medium text-cyan-400 mb-1 group-hover:text-white transition-colors">
                {tech.name}
              </div>
              <div className="text-xs text-gray-400">{tech.category}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            End-to-end technology solutions designed to accelerate your digital transformation.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:scale-[1.03] transition-transform duration-300 backdrop-blur-sm shadow-lg"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-colors mb-4">
                <service.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
