"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  personalInfo,
  stats,
  aboutContent,
  skills,
  projects,
  socialLinks,
  marqueeText,
} from "./data";

export default function HomePage() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [bandVisible, setBandVisible] = useState(false);

  const bandRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Custom cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Nav scroll
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observers
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-fade");
            if (id) {
              setVisibleSections((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.12 }
    );

    sectionRefs.current.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  // Band observer
  useEffect(() => {
    if (!bandRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setBandVisible(true);
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(bandRef.current);
    return () => obs.disconnect();
  }, []);

  // Skills observer
  useEffect(() => {
    if (!skillsRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setSkillsVisible(true);
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <main className="bg-black text-white min-h-screen relative">
      {/* Custom Cursor */}
      <div
        id="cursor"
        className="fixed pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: "translate(-50%, -50%)",
          width: cursorHover ? "52px" : "5px",
          height: cursorHover ? "52px" : "5px",
          background: "white",
          borderRadius: "50%",
          transition: "width 0.2s cubic-bezier(0.22,1,0.36,1), height 0.2s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-7 md:px-[52px] transition-all duration-300 ${
          navScrolled
            ? "bg-black py-4 border-b border-white/[0.06]"
            : "py-7"
        }`}
      >
        <span
          className="font-[family-name:var(--font-space-mono)] text-[11px] tracking-[0.2em] uppercase text-white"
        >
          Z.S — Portfolio
        </span>
        <ul className="hidden md:flex gap-10 list-none absolute left-1/2 -translate-x-1/2">
          {["About", "Work", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.18em] uppercase text-[#999] hover:text-white transition-colors duration-200"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <Link
          href="/admin"
          className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.18em] uppercase text-[#999] hover:text-white transition-colors duration-200"
          onMouseEnter={() => setCursorHover(true)}
          onMouseLeave={() => setCursorHover(false)}
        >
          Admin
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-end px-7 md:px-[52px] pb-[72px] overflow-hidden">
        {/* Atmospheric layer */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute -top-[10%] -right-[5%] w-[80%] h-[110%] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 60% 40%, rgba(255,255,255,.045) 0%, rgba(255,255,255,.012) 30%, transparent 65%)",
            }}
          />
          <div
            className="absolute top-[55%] left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,.1) 30%, rgba(255,255,255,.1) 70%, transparent)",
            }}
          />
        </div>

        {/* Photo */}
        <div className="absolute top-0 right-0 w-full md:w-[52%] h-full z-[1] overflow-hidden">
          <div
            className="absolute inset-0 z-[2]"
            style={{
              background:
                "linear-gradient(95deg, #000 0%, transparent 30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[45%] z-[2]"
            style={{
              background: "linear-gradient(transparent, #000)",
            }}
          />
          <Image
            src={personalInfo.photo}
            alt={personalInfo.name}
            fill
            className="object-cover object-top grayscale contrast-105 brightness-90 opacity-30 md:opacity-100"
            priority
          />
        </div>

        {/* Content */}
        <div
          ref={registerRef("hero")}
          data-fade="hero"
          className={`relative z-[3] transition-all duration-[800ms] ${
            isVisible("hero")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.22em] uppercase text-[#999] mb-7 flex items-center gap-[18px]">
            <span className="block w-9 h-px bg-[#999]" />
            {personalInfo.tagline}
          </div>
          <h1
            className="font-[family-name:var(--font-unbounded)] font-light leading-[0.92] tracking-[-0.03em] uppercase text-white mb-[52px]"
            style={{ fontSize: "clamp(80px, 14.5vw, 210px)" }}
          >
            Zaid
            <br />
            Saad
          </h1>
          <div className="flex items-end justify-between gap-12 flex-wrap">
            <p className="text-[14px] font-light leading-[1.8] text-[#999] max-w-[340px]">
              {personalInfo.heroDesc}
            </p>
            <div className="flex gap-3.5">
              <a
                href="#work"
                className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.16em] uppercase px-7 py-3.5 rounded-full border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-250"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                View Work
              </a>
              <a
                href="#contact"
                className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.16em] uppercase px-7 py-3.5 rounded-full border border-[#333] text-[#999] bg-transparent hover:border-white hover:text-white transition-all duration-250"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2">
          <div className="w-px h-[52px] bg-white/15 relative overflow-hidden">
            <div
              className="absolute top-[-100%] w-full h-full bg-white animate-[drip_2s_cubic-bezier(0.22,1,0.36,1)_infinite]"
            />
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <div ref={bandRef} className="grid grid-cols-1 md:grid-cols-3 border-b border-white/[0.06]">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-7 md:px-[52px] py-14 border-r border-white/[0.06] last:border-r-0 transition-all duration-700 ${
              bandVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span
              className="font-[family-name:var(--font-unbounded)] font-light leading-none tracking-[-0.03em] text-white block mb-2.5"
              style={{ fontSize: "68px" }}
            >
              {s.num}
            </span>
            <span className="font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.18em] uppercase text-[#999]">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="py-[120px] px-7 md:px-[52px] max-w-[1400px] mx-auto">
        <div
          ref={registerRef("about-tag")}
          data-fade="about-tag"
          className={`font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.22em] uppercase text-[#999] mb-16 flex items-center gap-[18px] transition-all duration-[800ms] ${
            isVisible("about-tag")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <span className="block w-7 h-px bg-[#999]" />
          01 — About
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-[100px] items-start">
          <div
            ref={registerRef("about-left")}
            data-fade="about-left"
            className={`transition-all duration-[800ms] ${
              isVisible("about-left")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <h2
              className="font-[family-name:var(--font-unbounded)] font-light leading-[1.0] tracking-[-0.025em] uppercase text-white mb-10"
              style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
            >
              Built to
              <br />
              Last.
            </h2>
            {aboutContent.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[15px] font-light leading-[1.85] text-[#999] mb-[18px]"
                dangerouslySetInnerHTML={{ __html: p }}
              />
            ))}
          </div>

          <div
            ref={registerRef("about-right")}
            data-fade="about-right"
            className={`transition-all duration-[800ms] delay-200 ${
              isVisible("about-right")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div ref={skillsRef} className="border-t border-white/[0.06] mt-2">
              {skills.map((sk) => (
                <div
                  key={sk.name}
                  className="grid grid-cols-[1fr_1fr_auto] gap-5 items-center py-[18px] border-b border-white/[0.06]"
                >
                  <span className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.1em] uppercase text-white">
                    {sk.name}
                  </span>
                  <div className="h-px bg-white/10 relative overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-white origin-left transition-transform duration-[1400ms]"
                      style={{
                        transform: `scaleX(${skillsVisible ? sk.width : 0})`,
                        transitionTimingFunction:
                          "cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    />
                  </div>
                  <span className="font-[family-name:var(--font-space-mono)] text-[8px] tracking-[0.14em] uppercase text-[#999] whitespace-nowrap">
                    {sk.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-t border-b border-white/[0.06] py-8 overflow-hidden relative">
        <div className="flex gap-0 whitespace-nowrap animate-[march_22s_linear_infinite]">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-[family-name:var(--font-unbounded)] font-light tracking-[-0.02em] uppercase text-white/[0.04] pr-20 leading-none"
              style={{ fontSize: "11vw" }}
            >
              {marqueeText}
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* ── WORK ── */}
      <section id="work">
        <div className="py-[120px] px-7 md:px-[52px] max-w-[1400px] mx-auto">
          <div
            ref={registerRef("work-tag")}
            data-fade="work-tag"
            className={`font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.22em] uppercase text-[#999] mb-16 flex items-center gap-[18px] transition-all duration-[800ms] ${
              isVisible("work-tag")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <span className="block w-7 h-px bg-[#999]" />
            02 — Selected Work
          </div>

          <div className="border-t border-white/[0.06]">
            {projects.map((p, i) => {
              const Wrapper = p.link ? "a" : "div";
              const wrapperProps = p.link
                ? {
                    href: p.link,
                    target: "_blank",
                    rel: "noreferrer",
                  }
                : {};

              return (
                <Wrapper
                  key={p.id}
                  {...wrapperProps}
                  className={`grid grid-cols-1 md:grid-cols-[64px_1fr_280px_120px] gap-10 items-start py-11 border-b border-white/[0.06] relative group cursor-none transition-all duration-[800ms] ${
                    isVisible(`work-${i}`)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  ref={registerRef(`work-${i}`)}
                  data-fade={`work-${i}`}
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <div className="absolute inset-0 -mx-7 md:-mx-[52px] bg-white/[0.025] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                  <span className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.1em] text-[#999] pt-1 relative z-10 group-hover:text-white transition-colors">
                    {p.idx}
                  </span>
                  <div className="relative z-10">
                    <div
                      className="font-[family-name:var(--font-unbounded)] font-light leading-[1.0] tracking-[-0.02em] uppercase text-white mb-3.5 transition-all duration-300 group-hover:tracking-[-0.01em]"
                      style={{ fontSize: "clamp(20px, 2.6vw, 38px)" }}
                    >
                      {p.title}
                    </div>
                    <p className="text-[13px] font-light leading-[1.75] text-[#999] max-w-[420px]">
                      {p.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-[7px] pt-1 relative z-10">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-[family-name:var(--font-space-mono)] text-[8px] tracking-[0.14em] uppercase text-[#999] border border-white/[0.14] rounded-full px-3 py-[5px] w-fit transition-all duration-200 group-hover:border-white/[0.35] group-hover:text-white"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div
                    className={`font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.16em] uppercase pt-1 flex items-center gap-2 relative z-10 transition-all duration-200 ${
                      p.link
                        ? "text-[#999] group-hover:text-white"
                        : "text-[#999]/30"
                    }`}
                  >
                    {p.linkLabel}
                    {p.link && (
                      <span className="inline-block transition-transform duration-250 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                        ↗
                      </span>
                    )}
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="py-[140px] px-7 md:px-[52px] max-w-[1400px] mx-auto">
          <h2
            ref={registerRef("contact-head")}
            data-fade="contact-head"
            className={`font-[family-name:var(--font-unbounded)] font-light leading-[0.92] tracking-[-0.03em] uppercase text-white mb-[100px] transition-all duration-[800ms] ${
              isVisible("contact-head")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ fontSize: "clamp(64px, 11vw, 170px)" }}
          >
            Let&apos;s
            <br />
            Build.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-20 border-t border-white/[0.06] pt-[60px]">
            <div
              ref={registerRef("contact-left")}
              data-fade="contact-left"
              className={`transition-all duration-[800ms] ${
                isVisible("contact-left")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.2em] uppercase text-[#999] mb-5">
                Direct Contact
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="font-[family-name:var(--font-unbounded)] font-light tracking-[-0.01em] text-white border-b border-white/20 pb-1 inline-block hover:border-white transition-colors duration-200"
                style={{ fontSize: "clamp(14px, 1.8vw, 22px)" }}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                {personalInfo.email}
              </a>
              <p className="mt-7 text-[13px] font-light text-[#999] leading-[1.85] max-w-[300px]">
                Open to freelance projects, remote roles, and full-time
                positions. Fast response. Direct communication. Available now.
              </p>
            </div>

            <div
              ref={registerRef("contact-right")}
              data-fade="contact-right"
              className={`transition-all duration-[800ms] delay-200 ${
                isVisible("contact-right")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.2em] uppercase text-[#999] mb-5">
                Channels
              </p>
              <div className="flex flex-col">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-between items-center py-[18px] border-b border-white/[0.06] group hover:pl-2.5 transition-all duration-200"
                    onMouseEnter={() => setCursorHover(true)}
                    onMouseLeave={() => setCursorHover(false)}
                  >
                    <span className="font-[family-name:var(--font-space-mono)] text-[10px] tracking-[0.14em] uppercase text-white">
                      {link.name}
                    </span>
                    <span className="text-[14px] text-[#999] transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-7 md:px-[52px] py-7 border-t border-white/[0.06] flex justify-between items-center flex-wrap gap-3">
        <span className="font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.14em] uppercase text-[#999]">
          © {personalInfo.year} {personalInfo.name} — Full Stack Developer ·
          Algeria
        </span>
        <div className="flex items-center gap-2">
          <div className="w-[5px] h-[5px] rounded-full bg-[#22c55e] animate-[blink_2s_ease-in-out_infinite]" />
          <span className="font-[family-name:var(--font-space-mono)] text-[9px] tracking-[0.14em] uppercase text-[#999]">
            Available for Work
          </span>
        </div>
      </footer>

      {/* Keyframe animations */}
      <style jsx global>{`
        @keyframes drip {
          0% {
            top: -100%;
          }
          100% {
            top: 100%;
          }
        }
        @keyframes march {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </main>
  );
}
