// page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { projects } from "./data";
import ProjectCard from "./ProjectCard";

export default function Page() {
  const [activeProject, setActiveProject] = useState<string | null>("treatment-drl");
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);

  useEffect(() => {
    // Standard early exit for server-side rendering
    if (typeof window === "undefined") return;

    // Determine environment and target elements
    const isDesktop = window.innerWidth >= 1024;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    let targetSectionId;
    if (isDesktop) {
      targetSectionId = 'profile-grid-section';
    } else if (isTablet) {
      targetSectionId = 'profile-tablet-section';
    } else {
      targetSectionId = 'profile-mobile-section';
    }
    const profileSection = document.getElementById(targetSectionId) as HTMLElement;

    // Cleanup/Completion Logic
    if (isTransitionComplete || !profileSection) {
      if (!isTransitionComplete) {
        setIsLoading(false);
        profileSection.style.backgroundImage = `url('/ahmed.jpg')`;
        profileSection.style.backgroundSize = 'cover';
        profileSection.style.backgroundPosition = 'center';
        profileSection.style.opacity = '1';
        
        profileSection.style.position = 'unset'; 
        profileSection.style.transform = 'none';
        profileSection.style.width = '';
        profileSection.style.height = '';
        
        setIsTransitionComplete(true);
      }
      return;
    }

    // Animation Constants
    const INITIAL_DELAY = 1000;
    const SCALE_DOWN_DURATION = 300;
    const SCALE_DOWN_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    const MOVE_DURATION = 1500;
    const MOVE_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
    const INITIAL_SIZE = isDesktop ? 240 : isTablet ? 200 : 180;
    const TARGET_SCALE = 0.8;
    
    const sectionStyle = profileSection.style;

    // Set final background immediately
    sectionStyle.backgroundImage = `url('/ahmed.jpg')`;
    sectionStyle.backgroundSize = 'cover';
    sectionStyle.backgroundPosition = 'center';

    // Initialize timers to null for cleanup
    let moveTransitionStart: NodeJS.Timeout | null = null;
    let completeDelay: NodeJS.Timeout | null = null;

    // --- Step 1: Initial Fixed State (Centered & Large) ---
    const rect = profileSection.getBoundingClientRect();
    
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    const targetCenterX = rect.left + rect.width / 2;
    const targetCenterY = rect.top + rect.height / 2;
    
    const moveX = screenCenterX - targetCenterX;
    const moveY = screenCenterY - targetCenterY;
    
    const initialScale = INITIAL_SIZE / rect.width;

    sectionStyle.position = 'fixed'; 
    sectionStyle.top = `${rect.top}px`;
    sectionStyle.left = `${rect.left}px`;
    sectionStyle.width = `${rect.width}px`;
    sectionStyle.height = `${rect.height}px`;
    sectionStyle.zIndex = '100';
    sectionStyle.opacity = '1';
    
    sectionStyle.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(${initialScale})`; 
    sectionStyle.transition = 'none';

    // --- Step 2: Scale Down Animation (Delayed) ---
    const initialDelayTimer = setTimeout(() => {
      
      sectionStyle.transition = `transform ${SCALE_DOWN_DURATION}ms ${SCALE_DOWN_EASING}, border-radius ${SCALE_DOWN_DURATION}ms`;
      
      sectionStyle.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(${initialScale * TARGET_SCALE})`;
      sectionStyle.borderRadius = '14px';

      // --- Step 3: Wait for scale down, then start the main move ---
      moveTransitionStart = setTimeout(() => {
        
        // FIX: Remove opacity transition, keep only transform and border-radius
        sectionStyle.transition = `transform ${MOVE_DURATION}ms ${MOVE_EASING}, border-radius ${MOVE_DURATION}ms ${MOVE_EASING}`;
        sectionStyle.transform = `none`;
        sectionStyle.borderRadius = isDesktop || isTablet ? '16px' : '16px';
        
        // FIX: Keep opacity at 1 (no fade-out)
        sectionStyle.opacity = '1';

        // FIX: Final cleanup after the main transition
        completeDelay = setTimeout(() => {
          sectionStyle.transition = "";
          sectionStyle.position = 'unset';
          sectionStyle.zIndex = 'auto';
          sectionStyle.width = ''; 
          sectionStyle.height = '';
          sectionStyle.opacity = '1';
          
          setIsTransitionComplete(true);
          setIsLoading(false);
        }, MOVE_DURATION + 50);

      }, SCALE_DOWN_DURATION + 50);

    }, INITIAL_DELAY);

    // Cleanup function for React
    return () => {
      clearTimeout(initialDelayTimer);
      if (moveTransitionStart) clearTimeout(moveTransitionStart);
      if (completeDelay) clearTimeout(completeDelay);
    };
  }, [isTransitionComplete]);

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;600;700&family=Inter:wght@300;400;500&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');
        
        * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        
        *::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        
        .font-mono {
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.02em;
        }
        
        .font-serif {
          font-family: 'Crimson Pro', serif;
        }
        
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
        
        .font-accent {
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.05em;
        }

        @keyframes arrow-bounce {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
        }

        @keyframes arrow-float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(3px, -3px) rotate(2deg);
          }
          50% {
            transform: translate(0, -5px) rotate(0deg);
          }
          75% {
            transform: translate(-3px, -3px) rotate(-2deg);
          }
        }

        .arrow-animate:hover svg {
          animation: arrow-bounce 0.6s ease-in-out infinite;
        }

        .arrow-contact-animate {
          animation: arrow-float 3s ease-in-out infinite;
        }

        .invisible-scroll {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
          overflow-y: scroll !important;
        }
        
        .invisible-scroll::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
        }

        .scroll-fade-bottom {
          position: relative;
        }

        .scroll-fade-bottom::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(to bottom, transparent, #0a0a0a 90%);
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      <div
        className={`fixed inset-0 bg-[#0a0a0a] z-[90] pointer-events-none transition-opacity duration-700 ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      />

      <header
        className={`fixed top-0 left-0 right-0 h-14 lg:h-17 bg-[#0a0a0a] border-b border-[#2a2a2a] z-50 flex justify-between items-center px-4 lg:px-10 transition-opacity duration-700 ${
          isLoading ? "opacity-0" : "opacity-100 delay-300"
        } lg:grid lg:grid-cols-3`}
      >
        <div className="lg:col-span-1 lg:hidden font-mono text-sm font-bold tracking-wider">
          AHMED MESSAAD
        </div>
        
        <div className="hidden lg:block lg:col-span-1 lg:col-start-2 text-center font-mono text-xl font-bold tracking-wider">
          AHMED MESSAAD
        </div>
        
        <div className="flex justify-end items-center lg:col-span-1">
        <a  
            href="/ahmed_messaad_cv.pdf"
            download
            className="flex items-center text-white transition-colors duration-200">
            <div className="flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 lg:px-4 py-1.5 lg:py-2 text-[12px] lg:text-[14px] font-mono tracking-wide hover:bg-[#252525] transition">
              <span className="hidden lg:inline">DOWNLOAD CV</span>
              <span className="lg:hidden inline">CV</span>
              <svg
                className="w-3 h-3 lg:w-4 lg:h-4 ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 15L12 3M12 15L8 11M12 15L16 11M20 17H4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
        </div>
      </header>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block lg:h-[calc(100vh-80px)] lg:mt-[80px] p-3">
        <div className="grid grid-cols-[9fr_6fr_10fr] auto-rows-fr gap-3 h-full">
          
          <section
            className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 2xl:p-8 flex flex-col justify-between transition-all duration-1000 overflow-hidden ${
              isLoading
                ? "opacity-0 translate-y-[50px]"
                : "opacity-100 translate-y-0 delay-500"
            }`}>
            <div className="flex items-start justify-end flex-shrink-0">
              <img
                src="/ai.svg"
                alt="AI System Icon"
                className="w-12 h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 filter brightness-0 invert scale-[0.8] text-neutral-700"
              />
            </div>
            
            <div className="flex-shrink-0 mt-auto">
              <h1 className="text-[18px] xl:text-[22px] 2xl:text-[28px] leading-[1.25] mb-3 xl:mb-4 2xl:mb-5">
                <span className="font-mono font-bold">Engineering Explainable AI</span>{" "}
                <span className="italic font-serif font-light text-[22px] xl:text-[28px] 2xl:text-[34px]">Systems</span>{" "}
                <span className="font-mono font-bold">for Clinical Impact</span>
              </h1>
              <div className="text-[9px] xl:text-[10px] 2xl:text-[11px] tracking-wider uppercase text-neutral-400 font-accent">
                Medical AI Research • Transfer Learning • Computer Vision
              </div>
            </div>
          </section>

          <section 
            id="profile-grid-section"
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden relative"
          />

          <aside
            id="projects"
            className={`row-span-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl flex flex-col overflow-hidden transition-all duration-1000 scroll-fade-bottom ${
              isLoading
                ? "opacity-0 translate-y-[50px]"
                : "opacity-100 translate-y-0 delay-900"
            }`}>
            <div className="flex-1 overflow-y-auto invisible-scroll">
              {projects.map((p, idx) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={idx}
                  activeProject={activeProject}
                  onToggle={setActiveProject}
                  isMobile={false}
                />
              ))}
            </div>
          </aside>
          
          <div className="col-span-2 flex gap-3 h-full">
            <section
              id="about"
              className={`flex-1 w-1/2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 2xl:p-8 flex flex-col justify-between transition-all duration-1000 overflow-hidden ${
                isLoading
                  ? "opacity-0 translate-y-[50px]"
                  : "opacity-100 translate-y-0 delay-1100"
              }`}>
              <div className="flex items-start justify-start flex-shrink-0">
                <img
                  src="/noun.svg"
                  alt="Abstract Icon"
                  className="w-8 h-8 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 filter brightness-0 invert text-neutral-700"
                />
              </div>
              
              <div className="flex-shrink-0 mt-auto">
                <h3 className="text-[9px] xl:text-[10px] 2xl:text-[11px] uppercase tracking-wider text-neutral-500 mb-3 xl:mb-4 2xl:mb-5 font-accent">
                  About
                </h3>
                <p className="text-neutral-300 text-[12px] xl:text-[13px] 2xl:text-[15px] leading-relaxed font-sans">
                  Developing clinically-deployable AI systems that bridge academic research and healthcare impact. 
                  My work investigates explainable deep learning architectures, transfer learning optimization, 
                  and diagnostic system design for resource-constrained clinical environments.
                </p>
              </div>
            </section>

            <section
              id="contact-section"
              onClick={() =>
                (window.location.href = "mailto:ahmed.messaad@outlook.com")
              }
              className={`flex-1 w-1/2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 2xl:p-8 flex flex-col cursor-pointer relative hover:bg-[#252525] transition-all duration-1000 overflow-hidden ${
                isLoading
                  ? "opacity-0 translate-y-[50px]"
                  : "opacity-100 translate-y-0 delay-1100"
              }`}>
              <div className="flex justify-between items-start flex-shrink-0">
                <div className="text-[9px] xl:text-[10px] tracking-wider uppercase text-neutral-500 font-accent">
                  Start a Conversation<br />
                </div>
                <svg
                  className="w-6 h-6 xl:w-7 xl:h-7 arrow-contact-animate"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 24L24 8M24 8H8M24 8V24" />
                </svg>
              </div>
              
              <div className="flex-1"></div>
              
              <div className="mt-auto flex-shrink-0"> 
                <h2 className="text-[48px] xl:text-[56px] font-bold leading-none mb-6 xl:mb-8">
                  <span className="font-mono">Contact</span>&thinsp;<span className="italic font-serif font-light">me</span>
                </h2>
                
                <div className="flex justify-between w-full text-[9px] xl:text-[10px] tracking-wider uppercase font-accent mb-2">
                  <a 
                    href="https://linkedin.com/in/ahmedmessaad"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-neutral-500 hover:text-white transition"
                  >
                    LINKEDIN
                  </a>
                  
                  <a 
                    href="https://github.com/RYANX9"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-neutral-500 hover:text-white transition"
                  >
                    GITHUB 
                  </a>
                  
                  <a 
                    href="mailto:ahmed.messaad@outlook.com"
                    onClick={(e) => e.stopPropagation()}
                    className="text-neutral-500 hover:text-white transition"
                  >
                    EMAIL
                  </a>
                </div>
                
                <div className="text-[8px] text-neutral-500 uppercase tracking-widest font-mono">
                  Developed by Ahmed Messaad
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      {/* TABLET LAYOUT */}      
      <div className="hidden md:block lg:hidden mt-[64px] p-3">        
        <div className="flex flex-col gap-3 responsive-flex">          
          <div className="flex flex-row gap-3 responsive-flex">            
            <section              
              className={`flex-[0.6] bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col justify-between transition-all duration-1000 overflow-hidden responsive-section responsive-spacing ${
                isLoading
                  ? "opacity-0 translate-y-[30px]"
                  : "opacity-100 translate-y-0 delay-500"
              }`}>            
              <div className="flex items-start justify-end">                
                <img                  
                  src="/ai.svg"                  
                  alt="AI System Icon"                  
                  className="w-12 h-12 filter brightness-0 invert transition-all duration-300"                
                />              
              </div>              
              <div className="mt-auto">                
                <h1 className="text-[22px] leading-[1.3] mb-3 responsive-text responsive-spacing">                  
                  <span className="font-mono font-bold">Engineering Explainable AI</span>{" "}                  
                  <span className="italic font-serif font-light text-[26px]">Systems</span>{" "}                  
                  <span className="font-mono font-bold">for Clinical Impact</span>                
                </h1>                
                <div className="text-[10px] tracking-wider uppercase text-neutral-400 font-accent responsive-text">                  
                  Medical AI Research • Transfer Learning • Computer Vision                
                </div>              
              </div>            
            </section>            
            <section              
              id="profile-tablet-section"              
              className="flex-[0.4] bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden relative responsive-section"
            />          
          </div>          
          <div className="flex flex-row gap-3 responsive-flex">            
            <section              
              id="about-tablet"              
              className={`flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col justify-between transition-all duration-1000 overflow-hidden responsive-section responsive-spacing ${
                isLoading
                  ? "opacity-0 translate-y-[30px]"
                  : "opacity-100 translate-y-0 delay-900"
              }`}>            
              <div className="flex items-start justify-start">                
                <img                  
                  src="/noun.svg"                  
                  alt="Abstract Icon"                  
                  className="w-8 h-8 filter brightness-0 invert transition-all duration-300"                
                />              
              </div>              
              <div className="mt-auto">                
                <h3 className="text-[9px] uppercase tracking-wider text-neutral-500 mb-3 font-accent responsive-text responsive-spacing">                  
                  About                
                </h3>                
                <p className="text-neutral-300 text-[13px] leading-relaxed font-sans responsive-text">                  
                  Developing clinically-deployable AI systems that bridge academic research and healthcare impact. 
                  My work investigates explainable deep learning architectures, transfer learning optimization, 
                  and diagnostic system design for resource-constrained clinical environments.                
                </p>              
              </div>            
            </section>            
            <section              
              id="contact-tablet"              
              onClick={() =>
                (window.location.href = "mailto:ahmed.messaad@outlook.com")
              }              
              className={`flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col cursor-pointer relative hover:bg-[#252525] transition-all duration-1000 overflow-hidden responsive-section responsive-spacing ${
                isLoading
                  ? "opacity-0 translate-y-[30px]"
                  : "opacity-100 translate-y-0 delay-1100"
              }`}>            
              <div className="flex justify-between items-start">                
                <div className="text-[9px] tracking-wider uppercase text-neutral-500 font-accent responsive-text">                  
                  Start a Conversation<br />                
                </div>                
                <svg                  
                  className="w-6 h-6 arrow-contact-animate transition-all duration-300"                  
                  viewBox="0 0 32 32"                  
                  fill="none"                  
                  stroke="currentColor"                  
                  strokeWidth="2"                
                >                  
                  <path d="M8 24L24 8M24 8H8M24 8V24" />                
                </svg>              
              </div>              
              <div className="flex-1" />              
              <div className="mt-auto">                
                <h2 className="text-[40px] font-bold leading-none mb-4 responsive-text responsive-spacing">                  
                  <span className="font-mono">Contact</span>&thinsp;                  
                  <span className="italic font-serif font-light">me</span>                
                </h2>                
                <div className="flex justify-between text-[9px] tracking-wider uppercase font-accent mb-4 responsive-text responsive-spacing">                  
                  <a                    
                    href="https://linkedin.com/in/ahmedmessaad"                    
                    target="_blank"                    
                    rel="noreferrer"                    
                    onClick={(e) => e.stopPropagation()}                    
                    className="text-neutral-500 hover:text-white transition-colors duration-300"                  
                  >                    
                    LINKEDIN                  
                  </a>                  
                  <a                    
                    href="https://github.com/RYANX9"                    
                    target="_blank"                    
                    rel="noreferrer"                    
                    onClick={(e) => e.stopPropagation()}                    
                    className="text-neutral-500 hover:text-white transition-colors duration-300"                  
                  >                    
                    GITHUB                  
                  </a>                  
                  <a                    
                    href="mailto:ahmed.messaad@outlook.com"                    
                    onClick={(e) => e.stopPropagation()}                    
                    className="text-neutral-500 hover:text-white transition-colors duration-300"                  
                  >                    
                    EMAIL                  
                  </a>                
                </div>                
                <div className="text-[8px] text-neutral-500 uppercase tracking-widest font-mono responsive-text">                  
                  Developed by Ahmed Messaad                
                </div>              
              </div>            
            </section>          
          </div>          
          <aside            
            id="projects-tablet"            
            className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl overflow-hidden transition-all duration-1000 responsive-section ${
              isLoading
                ? "opacity-0 translate-y-[30px]"
                : "opacity-100 translate-y-0 delay-1300"
            }`}>          
            {projects.map((p, idx) => (              
              <ProjectCard                
                key={p.id}                
                project={p}                
                index={idx}                
                activeProject={activeProject}                
                onToggle={setActiveProject} 
                isMobile={true}
              />            
            ))}          
          </aside>        
        </div>      
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden pt-18 p-3">
        <div className="flex flex-col gap-3">
          
          <section
            className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-6 min-h-[30vh] transition-all duration-1000 ${
              isLoading
                ? "opacity-0 translate-y-[30px]"
                : "opacity-100 translate-y-0 delay-500"
            }`}>
            <div className="flex items-start justify-end">
              <img
                src="/ai.svg"
                alt="AI System Icon"
                className="w-14 h-14 filter brightness-0 invert scale-[0.8] text-neutral-700"
              />
            </div>
            
            <div className="mt-auto">
              <h1 className="text-[34px] leading-[1.2] mb-5">
                <span className="font-mono font-bold">Engineering Explainable AI</span>{" "}
                <span className="italic font-serif font-light text-[40px]">Systems</span>{" "}
                <span className="font-mono font-bold">for Clinical Impact</span>
              </h1>
              <div className="text-[11px] tracking-wider uppercase text-neutral-400 font-accent">
                Medical AI Research • Transfer Learning • Computer Vision
              </div>
            </div>
          </section>

          <section
            id="profile-mobile-section"
            className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl flex items-center justify-center overflow-hidden h-[50vh] relative"
          />

          <section
            className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-6 min-h-[200px] transition-all duration-1000 ${
              isLoading
                ? "opacity-0 translate-y-[30px]"
                : "opacity-100 translate-y-0 delay-900"
            }`}>
            <div className="flex items-start justify-start">
              <img
                src="/noun.svg"
                alt="Abstract Icon"
                className="w-10 h-10 filter brightness-0 invert text-neutral-700"
              />
            </div>
            
            <div className="mt-auto">
              <h3 className="text-[9px] uppercase tracking-wider text-neutral-500 mb-3 font-accent">
                About
              </h3>
              <p className="text-neutral-300 text-[14px] leading-relaxed font-sans">
                Developing clinically-deployable AI systems that bridge academic research and healthcare impact. 
                My work investigates explainable deep learning architectures, transfer learning optimization, 
                and diagnostic system design for resource-constrained clinical environments.
              </p>
            </div>
          </section>

          <aside
            id="projects"
            className={`bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl overflow-hidden transition-all duration-1000 ${
              isLoading
                ? "opacity-0 translate-y-[30px]"
                : "opacity-100 translate-y-0 delay-1100"
            }`}>
            {projects.map((p, idx) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={idx}
                activeProject={activeProject}
                onToggle={setActiveProject}
                isMobile={true}
              />
            ))}
          </aside>

          <section
            onClick={() =>
              (window.location.href = "mailto:ahmed.messaad@outlook.com")
            }
            className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col cursor-pointer hover:bg-[#252525] transition-all duration-1000 relative justify-between min-h-[35vh] ${
              isLoading
                ? "opacity-0 translate-y-[30px]"
                : "opacity-100 translate-y-0 delay-1300"
            }`}>
            <div className="flex justify-between items-start">
              <div className="text-[9px] tracking-wider uppercase text-neutral-500 font-accent">
                Start a Conversation<br />
              </div>
              <svg
                className="w-5 h-5 arrow-contact-animate"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 24L24 8M24 8H8M24 8V24" />
              </svg>
            </div>
            
            <div className="flex-1"></div>
            
            <div className="mt-auto flex flex-col items-start">
              <h2 className="text-[48px] font-bold leading-none mb-4">
                <span className="font-mono">Contact</span>&thinsp;<span className="italic font-serif font-light">me</span>
              </h2>
              
              <div className="flex justify-between w-full text-[9px] tracking-wider uppercase font-accent mb-4">
                <a
                  href="https://linkedin.com/in/ahmedmessaad"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-500 hover:text-white transition"
                >
                  LINKEDIN
                </a>
                <a
                  href="https://github.com/RYANX9"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-500 hover:text-white transition"
                >
                  GITHUB
                </a>
                <a
                  href="mailto:ahmed.messaad@outlook.com"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-500 hover:text-white transition"
                >
                  EMAIL
                </a>
              </div>
            </div>
            
            <div className="text-[8px] text-neutral-500 uppercase tracking-widest font-mono mt-auto pt-2">
              Developed by Ahmed Messaad
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
