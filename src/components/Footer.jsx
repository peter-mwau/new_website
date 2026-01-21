import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Blog', href: '#blog' },
    { name: 'Careers', href: '#careers' }
  ];

  const services = [
    { name: 'Web Development', href: '#web' },
    { name: 'Mobile Apps', href: '#mobile' },
    { name: 'Cloud Solutions', href: '#cloud' },
    { name: 'UI/UX Design', href: '#design' },
    { name: 'Consulting', href: '#consulting' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: '#' },
    { name: 'GitHub', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'Instagram', href: '#' }
  ];

  return (
    <div className="bg-white">
      {/* Contact CTA Section with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 py-20 px-6">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-xl text-cyan-100 mb-10 max-w-2xl mx-auto">
            Let's collaborate and bring your ideas to life with cutting-edge technology solutions.
          </p>
          
          <button className="group relative inline-flex items-center gap-3 bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            <Mail className="w-5 h-5" />
            <span>Get In Touch With Us</span>
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300 h-[60vh]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-4">
                Nyota Digital Labs
              </h3>
              <p className="text-gray-400 mb-6">
                Building innovative software solutions that transform businesses and drive digital success.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-cyan-600" />
                  <a href="mailto:info@nyotadigitallabs.com" className="hover:text-cyan-600 transition-colors">
                    info@nyotadigitallabs.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-cyan-600" />
                  <a href="tel:+1234567890" className="hover:text-cyan-600 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-cyan-600 mt-1" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-600 transition-colors duration-200 inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-cyan-600 group-hover:w-4 transition-all duration-200"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Services</h4>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.name}>
                    <a 
                      href={service.href}
                      className="text-gray-400 hover:text-cyan-600 transition-colors duration-200 inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-cyan-600 group-hover:w-4 transition-all duration-200"></span>
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Social Media Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-cyan-600 transition-colors duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <div className="text-center md:text-right">
                <p className="text-gray-500 text-sm">
                  © {currentYear} Nyota Digital Labs. All rights reserved.
                </p>
                <div className="flex gap-6 mt-2 justify-center md:justify-end">
                  <a href="#privacy" className="text-gray-500 hover:text-cyan-600 text-sm transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#terms" className="text-gray-500 hover:text-cyan-600 text-sm transition-colors">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}