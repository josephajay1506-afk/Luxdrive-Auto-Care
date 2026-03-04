import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      {/* Header */}
      <div className="text-center mb-14 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🌟 About Us 👑
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Where luxury meets precision and care becomes an experience.
        </p>
      </div>

      {/* Intro */}
      <div className="about-card max-w-5xl mx-auto mb-16 border border-white/10 hover:border-white">
        <p className="text-gray-300 leading-relaxed text-lg">
          Welcome to <span className="text-blue-400 font-semibold">LuxDrive Auto Care</span>, 
          a premium digital platform and service ecosystem designed exclusively for elite automobiles.
          We specialize in delivering world-class automotive care through advanced technology,
          expert craftsmanship, and a customer-first philosophy.
        </p>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* Who We Are */}
        <div className="about-card border border-white/10 hover:border-white">
          <h2>🌟 Who We Are</h2>
          <p>
           A team of passionate automotive professionals and technology innovators committed 
           to providing exceptional service for luxury and performance vehicles. 
           We blend engineering expertise with digital innovation to create a seamless and refined
           service journey for every customer. Our culture is built on precision, responsibility, 
           and an unwavering dedication to quality in everything we do.
           we treat every vehicle as a masterpiece and every customer as a valued partner.
          </p>
        </div>

        {/* What We Do */}
        <div className="about-card border border-white/10 hover:border-white">
          <h2>🚗 What We Do</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>Vehicle service booking & management</li>
            <li>Luxury service packages</li>
            <li>Exclusive membership programs</li>
            <li>Digital invoices & reports</li>
            <li>Special offers & privileges</li>
            <li>Customer profiles & service history</li>
            <li>Professional workshop management</li>
          </ul>
        </div>

        {/* Vision */}
        <div className="about-card border border-white/10 hover:border-white">
          <h2>💎 Our Vision</h2>
          <p>
            To become a trusted leader in luxury automobile service by delivering excellence,
            innovation, and timeless quality.
            We envision a future where every luxury car owner experiences effortless service 
            powered by intelligent technology and skilled craftsmanship.
            Our goal is to set new standards in premium automotive care through continuous 
            improvement and customer-focused innovation.
          </p>
        </div>

        {/* Mission */}
        <div className="about-card border border-white/10 hover:border-white">
          <h2>🎯 Our Mission</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>Provide world-class service standards</li>
            <li>Ensure customer satisfaction through trust</li>
            <li>Integrate technology with craftsmanship</li>
            <li>Offer transparent pricing</li>
            <li>Create lasting relationships</li>
          </ul>
        </div>

        {/* Values */}
        <div className="about-card border border-white/10 hover:border-white">
          <h2>🏆 Our Values</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>Excellence</li>
            <li>Trust</li>
            <li>Innovation</li>
            <li>Luxury Experience</li>
            <li>Customer First</li>
          </ul>
        </div>

        {/* Why Choose Us */}
        <div className="about-card border border-white/10 hover:border-white">
          <h2>👨‍🔧 Why Choose Us</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>Certified technicians</li>
            <li>Advanced diagnostics</li>
            <li>Premium service packages</li>
            <li>Exclusive memberships</li>
            <li>Digital service tracking</li>
            <li>Dedicated support</li>
          </ul>
        </div>

      </div>

      {/* Commitment */}
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg mt-12 border border-white/10 hover:border-white">
        <h2 className="text-2xl font-bold mb-4">🌍 Our Commitment</h2>
        <p className="text-gray-300 leading-relaxed">
          Each vehicle is treated with respect, precision, and responsibility — 
          because luxury deserves nothing less than excellence.
        </p>
      </div>

      {/* Partners */}
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg mt-12 border border-white/10 hover:border-white">
        <h2 className="text-2xl font-bold mb-4">🤝 Our Trusted Partners</h2>
        <p className="text-gray-300">
          We proudly collaborate with leading luxury automobile brands and professional service providers.
        </p>
        <p className="mt-3 text-blue-400 font-semibold">
          Our Signature Partnerships – an exclusive alliance with world-class brands.
        </p>
      </div>

      {/* Promise */}
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg mt-12 border border-white/10 hover:border-white">
        <h2 className="text-2xl font-bold mb-4">💬 Customer Promise</h2>
        <p className="text-gray-300">
          We promise unmatched service quality, transparent processes, and a refined experience
          for every luxury automobile owner.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-4">Join With Our Journey 🌟</h2>
        <p className="text-gray-400 mb-6">
          Discover a platform where technology meets craftsmanship and service becomes an experience.
        </p>

        <button
          onClick={() => navigate("/service-catalog")}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition"
        >
          Explore Our Services
        </button>
      </div>

      {/* Footer Line */}
      <p className="text-center text-gray-500 mt-12 italic">
        LuxDrive Auto Care – Crafted for performance. Designed for comfort. Trusted for excellence.
      </p>

    </div>
  );
};

export default AboutUs;
