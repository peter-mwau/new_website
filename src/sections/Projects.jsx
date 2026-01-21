// src/sections/Projects.jsx
import React, { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Calendar,
  Code,
  Users,
} from "lucide-react";
import { useInView } from "../hooks/useInView";
import VantaGlobeBG from "../backgrounds/VantaGlobeBG";

const sampleProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    category: "Web Development",
    short:
      "A responsive portfolio site with smooth animations and modern design.",
    description:
      "A fully responsive portfolio website built with modern web technologies, featuring smooth animations, dark/light mode, and optimized performance for all devices.",
    longDescription:
      "This portfolio website showcases my work with a focus on user experience and performance. It includes a custom animation system, accessibility features, and is fully responsive across all devices. The project emphasizes clean code and modern web practices.",
    screenshots: [
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80&auto=format&fit=crop",
    ],
    details: [
      "Built with React 18 + Vite for optimal performance",
      "Mobile-first responsive layout with CSS Grid & Flexbox",
      "Accessibility compliant (WCAG 2.1 AA)",
      "Smooth page transitions with Framer Motion",
      "SEO optimized with React Helmet",
      "Dark/Light mode toggle with system preference detection",
      "Performance optimization (Lighthouse score 98+)",
      "Cross-browser compatibility testing",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Router"],
    timeline: "3 months",
    team: "Solo Project",
    status: "Live",
    link: "https://example.com",
    github: "https://github.com/example",
    challenges: [
      "Implementing smooth scroll animations without performance issues",
      "Creating reusable animation components",
      "Optimizing bundle size for fast loading",
    ],
    solutions: [
      "Used Intersection Observer API for scroll animations",
      "Created custom hooks for reusable animation logic",
      "Implemented code splitting and lazy loading",
    ],
  },
  {
    id: 2,
    title: "E‑Commerce Demo",
    category: "Full Stack",
    short: "Complete e-commerce solution with cart, checkout, and admin panel.",
    description:
      "A full-featured e-commerce platform demo with product management, shopping cart, checkout flow, and admin dashboard.",
    longDescription:
      "This e-commerce demo application includes all essential features of a modern online store. It has a comprehensive product catalog with filtering and search, user authentication, shopping cart with persistent storage, secure checkout simulation, and an admin dashboard for product management.",
    screenshots: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&auto=format&fit=crop",
    ],
    details: [
      "Full-featured product catalog with search and filters",
      "Shopping cart with persistent localStorage",
      "User authentication with JWT tokens",
      "Secure checkout flow with Stripe integration",
      "Admin dashboard for product management",
      "Order tracking and history",
      "Responsive design for all devices",
      "Performance monitoring and analytics",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Redux"],
    timeline: "5 months",
    team: "3 Developers",
    status: "Completed",
    link: "https://shop-demo.example.com",
    github: "https://github.com/example/ecommerce",
    challenges: [
      "Managing complex state across multiple components",
      "Implementing secure payment processing",
      "Handling large product catalogs efficiently",
    ],
    solutions: [
      "Used Redux for centralized state management",
      "Integrated Stripe with webhook verification",
      "Implemented pagination and caching strategies",
    ],
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    category: "Data Visualization",
    short: "Real-time data visualization dashboard with interactive charts.",
    description:
      "An advanced analytics dashboard that visualizes complex data sets with interactive charts, real-time updates, and custom reporting.",
    longDescription:
      "This analytics dashboard provides businesses with insights through interactive data visualizations. It features real-time data streaming, multiple chart types, customizable dashboards, and export functionality. The dashboard helps users make data-driven decisions with clear visual representations of complex metrics.",
    screenshots: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format",
    ],
    details: [
      "Interactive charts with D3.js and Recharts",
      "Real-time data updates via WebSocket",
      "Customizable widget layout with drag & drop",
      "Export functionality (PDF, CSV, PNG)",
      "User role-based access control",
      "Mobile-responsive design",
      "Theme customization options",
      "Data filtering and segmentation",
    ],
    tech: ["React", "D3.js", "WebSocket", "Node.js", "PostgreSQL", "Chart.js"],
    timeline: "4 months",
    team: "2 Developers + 1 Designer",
    status: "In Development",
    link: "https://analytics-demo.example.com",
    github: "https://github.com/example/dashboard",
    challenges: [
      "Handling real-time data synchronization",
      "Creating responsive, interactive visualizations",
      "Managing large data sets efficiently",
    ],
    solutions: [
      "Implemented WebSocket for real-time updates",
      "Used D3.js for custom chart interactions",
      "Applied virtualization for large data rendering",
    ],
  },
];

function Projects() {
  const [activeId, setActiveId] = useState(null);
  const [shotIdx, setShotIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const openProject = (id) => {
    setIsAnimating(true);
    setActiveId(id);
    setShotIdx(0);
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closeProject = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveId(null);
      document.body.style.overflow = "unset";
      setIsAnimating(false);
    }, 200);
  };

  const active = sampleProjects.find((p) => p.id === activeId);

  const nextShot = () => {
    if (!active) return;
    setShotIdx((s) => (s + 1) % active.screenshots.length);
  };

  const prevShot = () => {
    if (!active) return;
    setShotIdx(
      (s) => (s - 1 + active.screenshots.length) % active.screenshots.length,
    );
  };

  const nextProject = () => {
    if (!active) return;
    const i = sampleProjects.findIndex((p) => p.id === active.id);
    const next = sampleProjects[(i + 1) % sampleProjects.length];
    openProject(next.id);
  };

  const prevProject = () => {
    if (!active) return;
    const i = sampleProjects.findIndex((p) => p.id === active.id);
    const prev =
      sampleProjects[(i - 1 + sampleProjects.length) % sampleProjects.length];
    openProject(prev.id);
  };

  const handleKeyDown = (e) => {
    if (!active) return;
    switch (e.key) {
      case "Escape":
        closeProject();
        break;
      case "ArrowLeft":
        prevShot();
        break;
      case "ArrowRight":
        nextShot();
        break;
      case "ArrowUp":
        prevProject();
        break;
      case "ArrowDown":
        nextProject();
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  const [sectionRef, isInView, blur] = useInView();

  return (
    <div
      ref={sectionRef}
      className={`w-full min-h-screen flex flex-col items-center justify-start py-20 relative overflow-hidden transition-opacity duration-1000 ${
        isInView ? "opacity-100" : "opacity-0"
      }`}
    >
      <VantaGlobeBG />
      {/* Enhanced Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-bl from-black/70 via-purple-900/30 to-black/70"></div>

      {/* Bottom Gradient Blur Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-black/30 to-black/80 pointer-events-none blur-xl"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-l from-pink-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl w-full px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-5 py-2 rounded-full backdrop-blur-xl bg-white/10 border border-white/20">
            <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text">
              ✨ Featured Work
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-white">Our </span>
            <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">
              Projects
            </span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Explore our portfolio of innovative solutions across various
            technologies and industries
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sampleProjects.map((p, idx) => (
            <div
              key={p.id}
              onClick={() => openProject(p.id)}
              className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-white/40 animate-fadeIn"
              style={{
                animationDelay: `${idx * 150}ms`,
                animationDuration: "0.6s",
              }}
            >
              {/* Animated Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.screenshots[0]}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
                  <span className="text-xs font-medium text-white">
                    {p.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {p.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${p.status === "Live" ? "bg-green-500/20 text-green-300" : p.status === "Completed" ? "bg-blue-500/20 text-blue-300" : "bg-yellow-500/20 text-yellow-300"}`}
                  >
                    {p.status}
                  </span>
                </div>

                <p className="text-sm text-white/70 mb-4">{p.short}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white/60">
                      +{p.tech.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{p.timeline}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{p.team}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {active && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isAnimating ? "animate-fadeIn" : ""}`}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
              onClick={closeProject}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden  shadow-2xl transform transition-all duration-300">
              {/* Close Button */}
              <button
                onClick={closeProject}
                className="absolute top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
                {/* Left Column - Images */}
                <div className="space-y-6">
                  {/* Main Image */}
                  <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                    <img
                      src={active.screenshots[shotIdx]}
                      alt={`${active.title} screenshot ${shotIdx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={prevShot}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextShot}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full backdrop-blur-md bg-black/50 border border-white/20">
                      <span className="text-white text-sm">
                        {shotIdx + 1} / {active.screenshots.length}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-4 gap-3">
                    {active.screenshots.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setShotIdx(index)}
                        className={`relative h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                          shotIdx === index
                            ? "ring-2 ring-cyan-400 scale-105"
                            : "opacity-70 hover:opacity-100 hover:scale-105"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
                      <Calendar className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                      <p className="text-xs text-white/60">Timeline</p>
                      <p className="text-sm font-semibold text-white">
                        {active.timeline}
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
                      <Users className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                      <p className="text-xs text-white/60">Team</p>
                      <p className="text-sm font-semibold text-white">
                        {active.team}
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
                      <Code className="w-5 h-5 text-pink-400 mx-auto mb-2" />
                      <p className="text-xs text-white/60">Status</p>
                      <p className="text-sm font-semibold text-white">
                        {active.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Details */}
                <div className="overflow-y-auto max-h-[calc(90vh-4rem)] pr-2">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white/80 text-sm">
                        {active.category}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          active.status === "Live"
                            ? "bg-green-500/20 text-green-300"
                            : active.status === "Completed"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {active.status}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {active.title}
                    </h3>
                    <p className="text-white/80 text-lg mb-4">
                      {active.description}
                    </p>
                  </div>

                  {/* Detailed Description */}
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                      Project Overview
                    </h4>
                    <p className="text-white/70">{active.longDescription}</p>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {active.details.map((detail, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-white/80"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 mt-2"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500"></div>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {active.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white/80 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenges & Solutions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl backdrop-blur-md bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/20">
                      <h5 className="font-semibold text-white mb-2">
                        Challenges
                      </h5>
                      <ul className="space-y-1">
                        {active.challenges.map((challenge, index) => (
                          <li key={index} className="text-sm text-white/70">
                            • {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl backdrop-blur-md bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/20">
                      <h5 className="font-semibold text-white mb-2">
                        Solutions
                      </h5>
                      <ul className="space-y-1">
                        {active.solutions.map((solution, index) => (
                          <li key={index} className="text-sm text-white/70">
                            • {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-8">
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl backdrop-blur-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 transition-all duration-300 flex-1"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 flex-1"
                    >
                      <Github className="w-5 h-5" />
                      <span>View Code</span>
                    </a>
                  </div>

                  {/* Project Navigation */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                    <button
                      onClick={prevProject}
                      className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="text-sm">Previous Project</span>
                    </button>
                    <button
                      onClick={nextProject}
                      className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      <span className="text-sm">Next Project</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Projects;
