"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Anchor,
  Truck,
  Droplets,
  Cpu,
  ChevronDown,
  Building2,
} from "lucide-react";

export default function LadjaHomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const statsRef = useRef(null);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);

  // Stats state
  const [stats, setStats] = useState({
    jobsCreated: 0,
    gdpContribution: 0,
    containersMoved: 0,
  });

  // Scroll & active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      const sections = ["hero", "about", "divisions", "impact", "partners", "contact"];
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth counter animation using requestAnimationFrame
  const animateStats = useCallback(() => {
    const targets = {
      jobsCreated: 100000,
      gdpContribution: 50,
      containersMoved: 80000,
    };

    const increments = {
      jobsCreated: targets.jobsCreated / 100,
      gdpContribution: targets.gdpContribution / 100,
      containersMoved: targets.containersMoved / 100,
    };

    const state = { ...stats };

    const step = () => {
      let done = true;

      for (let key of Object.keys(targets)) {
        if (state[key] < targets[key]) {
          state[key] += increments[key];
          if (state[key] > targets[key]) state[key] = targets[key];
          done = false;
        }
      }

      setStats({
        jobsCreated: Math.floor(state.jobsCreated),
        gdpContribution: Math.round(state.gdpContribution * 10) / 10,
        containersMoved: Math.floor(state.containersMoved),
      });

      if (!done) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [stats]);

  // IntersectionObserver for stats animation
  useEffect(() => {
    if (!statsRef.current || hasAnimatedStats) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimatedStats(true);
          animateStats();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasAnimatedStats, animateStats]);

  // Scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // Section components
  const sections = {
    divisions: [
      {
        icon: Anchor,
        title: "ZB Series",
        description: "Advanced port and maritime infrastructure solutions for continental trade",
      },
      {
        icon: Truck,
        title: "AJ Series",
        description: "Intelligent logistics and transportation systems for seamless connectivity",
      },
      {
        icon: Droplets,
        title: "Water Systems",
        description: "Sustainable water management and distribution networks for communities",
      },
      {
        icon: Cpu,
        title: "EyenwanOS",
        description: "AI-powered operational systems for smart infrastructure management",
      },
    ],
    partners: Array.from({ length: 8 }, (_, i) => `P${i + 1}`),
  };

  return (
    <div className="min-h-screen bg-white font-ibm-plex-mono">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 transition-all duration-300 ${
          isScrolled ? "bg-[#1B1F4B]/95 backdrop-blur-sm shadow-xl" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="https://ucarecdn.com/a353e3ce-c258-4daf-8791-9614e8da35c0/-/format/auto/"
              alt="Ladja Logo"
              width={48}
              height={48}
              className="object-cover shadow-lg"
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["about", "divisions", "impact", "partners", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                aria-current={activeSection === id ? "page" : undefined}
                className={`font-medium text-sm transition-all duration-200 hover:scale-105 ${
                  activeSection === id
                    ? "text-[#C62828] border-b-2 border-[#C62828] pb-1"
                    : "text-white hover:text-[#C62828]"
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden text-white hover:text-[#C62828] transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <ChevronDown size={24} className={`${mobileMenuOpen ? "rotate-180" : ""} transition-transform`} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1B1F4B]/95 backdrop-blur-sm mt-2 rounded-xl shadow-lg py-4 flex flex-col gap-4 px-4">
            {["about", "divisions", "impact", "partners", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-white hover:text-[#C62828] font-medium text-lg"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://ucarecdn.com/93fdb395-dbe7-424d-abdd-3f4f080ee55d/"
            alt="Hero Background"
            fill
            className="object-cover opacity-30 blur-sm"
          />
          <div className="absolute inset-0 bg-[#1B1F4B]/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1F4B]/65 via-transparent to-[#1B1F4B]/35"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
          <h1 className="font-rajdhani font-bold text-[clamp(3rem,8vw,8rem)] leading-[0.9] text-white mb-6 drop-shadow-2xl animate-glow">
            Africa Moves with Ladja
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Rebuilding Africa's Infrastructure. From Rivers to Rails.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <button
              onClick={() => scrollToSection("divisions")}
              className="w-full sm:w-auto px-8 py-4 bg-[#C62828] text-white font-rajdhani font-semibold text-lg hover:bg-[#A91D1D] transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[56px]"
            >
              Explore Our Solutions
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border-2 border-white font-rajdhani font-semibold text-lg hover:bg-white hover:text-[#1B1F4B] transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[56px]"
            >
              Invest With Us
            </button>
          </div>
        </div>
      </section>

      {/* Add About, Divisions, Impact, Partners, Footer sections here... */}
      {/* Each section can be split into reusable components if needed */}

      {/* Impact Section Example */}
      <section id="impact" ref={statsRef} className="py-20 sm:py-28 bg-gradient-to-br from-[#1B1F4B] to-[#0F1229] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h2 className="font-rajdhani font-bold text-4xl sm:text-6xl text-white mb-6">
            Projected <span className="text-[#C62828]">Impact</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <StatCard label="Jobs to be Created Cross-Continent" value={stats.jobsCreated} />
            <StatCard label="GDP to be Contributed (USD) B" value={stats.gdpContribution} />
            <StatCard label="Containers to be Moved Annually" value={stats.containersMoved} />
          </div>
        </div>
      </section>
    </div>
  );
}

// Reusable stat card component
const StatCard = ({ label, value }) => (
  <div className="text-center">
    <div className="font-rajdhani font-bold text-5xl sm:text-7xl text-[#C62828] mb-4" style={{ textShadow: "0 0 40px #C62828, 0 0 80px #C62828" }}>
      {value.toLocaleString()}+
    </div>
    <div className="text-sm text-gray-300 uppercase tracking-wider">{label}</div>
  </div>
);
