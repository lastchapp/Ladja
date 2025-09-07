import { useState, useEffect, useRef } from "react";
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
  const statsRef = useRef(null);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Update active section based on scroll position
      const sections = ["hero", "about", "divisions", "impact", "partners"];
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

  // Animated counters for stats
  const [jobsCreated, setJobsCreated] = useState(0);
  const [gdpContribution, setGdpContribution] = useState(0);
  const [containersMoved, setContainersMoved] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedStats) {
          setHasAnimatedStats(true);

          // Animate jobs to be created
          const jobsTarget = 100000;
          const jobsIncrement = jobsTarget / 100;
          let jobsCount = 0;
          const jobsTimer = setInterval(() => {
            jobsCount += jobsIncrement;
            if (jobsCount >= jobsTarget) {
              setJobsCreated(jobsTarget);
              clearInterval(jobsTimer);
            } else {
              setJobsCreated(Math.floor(jobsCount));
            }
          }, 20);

          // Animate GDP to be contributed
          const gdpTarget = 50;
          const gdpIncrement = gdpTarget / 100;
          let gdpCount = 0;
          const gdpTimer = setInterval(() => {
            gdpCount += gdpIncrement;
            if (gdpCount >= gdpTarget) {
              setGdpContribution(gdpTarget);
              clearInterval(gdpTimer);
            } else {
              setGdpContribution(Math.round(gdpCount * 10) / 10);
            }
          }, 20);

          // Animate containers to be moved
          const containersTarget = 80000;
          const containersIncrement = containersTarget / 100;
          let containersCount = 0;
          const containersTimer = setInterval(() => {
            containersCount += containersIncrement;
            if (containersCount >= containersTarget) {
              setContainersMoved(containersTarget);
              clearInterval(containersTimer);
            } else {
              setContainersMoved(Math.floor(containersCount));
            }
          }, 15);
        }
      },
      { threshold: 0.5 },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimatedStats]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 transition-all duration-300 ${
          isScrolled
            ? "bg-[#1B1F4B]/95 backdrop-blur-sm shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Remove border frame */}
          <div className="flex items-center">
            <img
              src="https://ucarecdn.com/a353e3ce-c258-4daf-8791-9614e8da35c0/-/format/auto/"
              alt="Ladja Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-cover shadow-lg"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { id: "about", label: "About" },
              { id: "divisions", label: "Divisions" },
              { id: "impact", label: "Impact" },
              { id: "partners", label: "Partners" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-ibm-plex-mono text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  activeSection === item.id
                    ? "text-[#C62828] border-b-2 border-[#C62828] pb-1"
                    : "text-white hover:text-[#C62828]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white hover:text-[#C62828] transition-colors duration-200">
            <ChevronDown size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background with reduced overlay darkness by 30% */}
        <div className="absolute inset-0 bg-[#1B1F4B]">
          <img
            src="https://ucarecdn.com/93fdb395-dbe7-424d-abdd-3f4f080ee55d/"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
            style={{ filter: "blur(3px)" }}
          />
          {/* Reduced blue shade overlay by 30% (70% → 49%) */}
          <div className="absolute inset-0 bg-[#1B1F4B]/50"></div>
          {/* Reduced gradient overlay by 30% (90% → 63%, 50% → 35%) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1F4B]/65 via-transparent to-[#1B1F4B]/35"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
          <h1 className="font-rajdhani font-bold text-[clamp(3rem,8vw,8rem)] leading-[0.9] text-white mb-6 drop-shadow-2xl">
            <span
              style={{
                textShadow:
                  "0 0 30px #C62828, 0 0 60px #C62828, 0 4px 8px rgba(0,0,0,0.3)",
              }}
            >
              Africa Moves with Ladja
            </span>
          </h1>

          <p className="font-ibm-plex-mono text-lg sm:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Rebuilding Africa's Infrastructure. From Rivers to Rails.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <button
              onClick={() => scrollToSection("divisions")}
              className="w-full sm:w-auto px-8 py-4 bg-[#C62828] text-white font-rajdhani font-semibold text-lg hover:bg-[#A91D1D] transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[56px] flex items-center justify-center border-2 border-[#C62828]"
            >
              Explore Our Solutions
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border-2 border-white font-rajdhani font-semibold text-lg hover:bg-white hover:text-[#1B1F4B] transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[56px] flex items-center justify-center backdrop-blur-sm"
            >
              Invest With Us
            </button>
          </div>
        </div>
      </section>

      {/* About & Vision Section */}
      <section
        id="about"
        className="py-20 sm:py-28 bg-gradient-to-br from-[#C0C6D1] to-[#E8EAF0] relative"
      >
        {/* Enhanced geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M50,50 L0,0 L100,0 Z M50,50 L100,0 L100,100 Z M50,50 L100,100 L0,100 Z M50,50 L0,100 L0,0 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div>
              <h2 className="font-rajdhani font-bold text-4xl sm:text-6xl text-[#1B1F4B] mb-8 leading-tight">
                Transforming <span className="text-[#C62828]">Africa's</span>{" "}
                Infrastructure Landscape
              </h2>

              <div className="font-ibm-plex-mono text-base sm:text-lg text-[#1B1F4B] space-y-6 leading-relaxed">
                <p className="text-lg">
                  Ladja stands at the forefront of{" "}
                  <span className="text-[#C62828] font-semibold">
                    Pan-African infrastructure renewal
                  </span>
                  . Our vision extends beyond traditional construction—we're
                  architecting the future of continental connectivity.
                </p>

                <p>
                  Through innovative engineering solutions and sustainable
                  practices, we bridge the gap between Africa's vast potential
                  and its infrastructure needs. From{" "}
                  <span className="text-[#C62828] font-semibold">
                    advanced port systems
                  </span>{" "}
                  to cutting-edge water management, every project strengthens
                  Africa's economic backbone.
                </p>

                <p>
                  Our commitment goes beyond steel and concrete. We're building
                  the{" "}
                  <span className="text-[#C62828] font-semibold">
                    pathways to prosperity
                  </span>
                  for millions across the continent, creating jobs, fostering
                  growth, and establishing lasting partnerships that transcend
                  borders.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#1B1F4B] to-[#2A2F5F] rounded-2xl p-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#C62828] opacity-15 rounded-full -translate-y-20 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#C62828] opacity-10 rounded-full translate-y-16 -translate-x-16"></div>
                <div className="relative z-10">
                  <Building2 size={56} className="text-[#C62828] mb-6" />
                  <h3 className="font-rajdhani font-bold text-2xl text-white mb-4">
                    Building Tomorrow
                  </h3>
                  <p className="font-ibm-plex-mono text-sm text-gray-300 leading-relaxed">
                    Combining traditional engineering excellence with
                    cutting-edge technology to create infrastructure that stands
                    the test of time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divisions Snapshot */}
      <section id="divisions" className="py-20 sm:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <h2 className="font-rajdhani font-bold text-4xl sm:text-6xl text-[#1B1F4B] mb-6">
              Our <span className="text-[#C62828]">Divisions</span>
            </h2>
            <p className="font-ibm-plex-mono text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Four specialized divisions working in harmony to deliver
              comprehensive infrastructure solutions across Africa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: Anchor,
                title: "ZB Series",
                description:
                  "Advanced port and maritime infrastructure solutions for continental trade",
              },
              {
                icon: Truck,
                title: "AJ Series",
                description:
                  "Intelligent logistics and transportation systems for seamless connectivity",
              },
              {
                icon: Droplets,
                title: "Water Systems",
                description:
                  "Sustainable water management and distribution networks for communities",
              },
              {
                icon: Cpu,
                title: "EyenwanOS",
                description:
                  "AI-powered operational systems for smart infrastructure management",
              },
            ].map((division, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-[#1B1F4B] to-[#2A2F5F] w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-8 border-4 border-[#C62828] group-hover:from-[#C62828] group-hover:to-[#A91D1D] group-hover:border-[#1B1F4B] transition-all duration-500 group-hover:scale-110 shadow-xl">
                  <division.icon
                    size={36}
                    className="text-[#C62828] group-hover:text-white transition-colors duration-300"
                  />
                </div>

                <h3 className="font-rajdhani font-bold text-xl text-[#1B1F4B] mb-4">
                  {division.title}
                </h3>

                <p className="font-ibm-plex-mono text-sm text-gray-600 leading-relaxed">
                  {division.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation & Impact Stats */}
      <section
        id="impact"
        ref={statsRef}
        className="py-20 sm:py-28 bg-gradient-to-br from-[#1B1F4B] to-[#0F1229] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h120v120H0V0zm30 30v60h60V30H30zm30 45a15 15 0 1 1 0-30 15 15 0 0 1 0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-rajdhani font-bold text-4xl sm:text-6xl text-white mb-6">
              Projected{" "}
              <span
                className="text-[#C62828]"
                style={{ textShadow: "0 0 30px #C62828, 0 0 60px #C62828" }}
              >
                Impact
              </span>
            </h2>
            <p className="font-ibm-plex-mono text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our ambitious goals for transforming Africa's infrastructure
              landscape and driving continental economic growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="text-center group">
              <div
                className="font-rajdhani font-bold text-5xl sm:text-7xl text-[#C62828] mb-4 group-hover:scale-105 transition-transform duration-300"
                style={{ textShadow: "0 0 40px #C62828, 0 0 80px #C62828" }}
              >
                {jobsCreated.toLocaleString()}+
              </div>
              <div className="font-ibm-plex-mono text-sm text-gray-300 uppercase tracking-wider">
                Jobs to be Created Cross-Continent
              </div>
            </div>

            <div className="text-center group">
              <div
                className="font-rajdhani font-bold text-5xl sm:text-7xl text-[#C62828] mb-4 group-hover:scale-105 transition-transform duration-300"
                style={{ textShadow: "0 0 40px #C62828, 0 0 80px #C62828" }}
              >
                {gdpContribution}B+
              </div>
              <div className="font-ibm-plex-mono text-sm text-gray-300 uppercase tracking-wider">
                GDP to be Contributed (USD)
              </div>
            </div>

            <div className="text-center group">
              <div
                className="font-rajdhani font-bold text-5xl sm:text-7xl text-[#C62828] mb-4 group-hover:scale-105 transition-transform duration-300"
                style={{ textShadow: "0 0 40px #C62828, 0 0 80px #C62828" }}
              >
                {containersMoved.toLocaleString()}+
              </div>
              <div className="font-ibm-plex-mono text-sm text-gray-300 uppercase tracking-wider">
                Containers to be Moved Annually
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="font-rajdhani font-bold text-xl text-white mb-4">
                AI Fleet Innovation
              </h3>
              <p className="font-ibm-plex-mono text-sm text-gray-300 leading-relaxed">
                Revolutionary autonomous systems optimizing port operations and
                reducing environmental impact.
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-rajdhani font-bold text-xl text-white mb-4">
                Modular Crane Systems
              </h3>
              <p className="font-ibm-plex-mono text-sm text-gray-300 leading-relaxed">
                Flexible, scalable infrastructure solutions that adapt to
                evolving continental trade demands.
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-rajdhani font-bold text-xl text-white mb-4">
                Sustainability Focus
              </h3>
              <p className="font-ibm-plex-mono text-sm text-gray-300 leading-relaxed">
                Carbon-neutral operations and renewable energy integration
                across all major projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Call to Action */}
      <section
        id="partners"
        className="py-20 sm:py-28 bg-gradient-to-br from-[#C0C6D1] to-[#E8EAF0]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <h2 className="font-rajdhani font-bold text-4xl sm:text-6xl text-[#1B1F4B] mb-6">
              Trusted <span className="text-[#C62828]">Partners</span>
            </h2>
            <p className="font-ibm-plex-mono text-lg text-gray-700 leading-relaxed">
              Collaborating with industry leaders to deliver world-class
              infrastructure solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((partner) => (
              <div
                key={partner}
                className="bg-gradient-to-br from-[#1B1F4B] to-[#2A2F5F] aspect-square rounded-2xl flex items-center justify-center opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#C62828] to-[#A91D1D] rounded-xl flex items-center justify-center shadow-inner">
                  <div className="text-white font-rajdhani font-bold text-xl">
                    P{partner}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Call to Action Band - Remove rounded corners from button */}
          <div className="bg-gradient-to-r from-[#C62828] to-[#A91D1D] -mx-4 sm:-mx-6 px-4 sm:px-6 py-16 text-center rounded-2xl mx-4 sm:mx-6 shadow-2xl">
            <h3 className="font-rajdhani font-bold text-3xl sm:text-5xl text-white mb-8 leading-tight">
              Join Us in Powering Africa's Infrastructure Future
            </h3>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-10 py-5 bg-white text-[#1B1F4B] font-rajdhani font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-white"
            >
              Contact Us Today
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer
        id="contact"
        className="bg-gradient-to-br from-[#1B1F4B] to-[#0F1229] py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                {/* Remove border frame from footer logo */}
                <img
                  src="https://ucarecdn.com/a353e3ce-c258-4daf-8791-9614e8da35c0/-/format/auto/"
                  alt="Ladja Logo"
                  className="w-10 h-10 object-cover shadow-lg"
                />
                {/* Capitalize "Ladja" */}
                <div className="font-rajdhani font-bold text-2xl text-white">
                  Ladja
                </div>
              </div>
              <p className="font-ibm-plex-mono text-sm text-gray-300 leading-relaxed">
                Transforming Africa's infrastructure landscape through
                innovation and sustainable development.
              </p>
            </div>

            <div>
              <h4 className="font-rajdhani font-bold text-xl text-white mb-6">
                Contact Info
              </h4>
              <div className="font-ibm-plex-mono text-sm text-gray-300 space-y-3">
                <p>Kaduna State, Nigeria and FCT Nigeria</p>
                <p className="text-[#C62828]">info@ladja.africa</p>
                <p>+2348144455025</p>
              </div>
            </div>

            <div>
              <h4 className="font-rajdhani font-bold text-xl text-white mb-6">
                Follow Us
              </h4>
              <div className="flex gap-4">
                {["Twitter", "LinkedIn", "Facebook"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-[#C62828] to-[#A91D1D] rounded-xl flex items-center justify-center text-white hover:from-[#A91D1D] hover:to-[#8B1A1A] transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-8 text-center">
            <p className="font-ibm-plex-mono text-sm text-gray-400">
              © 2025 Ladja Infrastructure Holdings Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Enhanced Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        
        .font-rajdhani {
          font-family: 'Rajdhani', sans-serif;
        }
        
        .font-ibm-plex-mono {
          font-family: 'IBM Plex Mono', monospace;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          overflow-x: hidden;
        }

        @keyframes glow {
          0%, 100% { 
            text-shadow: 0 0 30px #C62828, 0 0 60px #C62828, 0 4px 8px rgba(0,0,0,0.3); 
          }
          50% { 
            text-shadow: 0 0 40px #C62828, 0 0 80px #C62828, 0 4px 8px rgba(0,0,0,0.3); 
          }
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        /* Smooth gradient transitions */
        .bg-gradient-to-br,
        .bg-gradient-to-r,
        .from-\\[\\#C62828\\],
        .to-\\[\\#A91D1D\\] {
          transition: all 0.3s ease;
        }

        /* Enhanced hover effects */
        .hover\\:scale-105:hover,
        .hover\\:scale-110:hover {
          transform: scale(1.05);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .hover\\:scale-105,
          .hover\\:scale-110,
          .group-hover\\:scale-110,
          .group-hover\\:scale-105 {
            transform: none !important;
          }
          
          .animate-glow {
            animation: none !important;
          }
          
          html {
            scroll-behavior: auto;
          }

          * {
            transition-duration: 0.01s !important;
          }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1B1F4B;
        }

        ::-webkit-scrollbar-thumb {
          background: #C62828;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #A91D1D;
        }
      `}</style>
    </div>
  );
}



