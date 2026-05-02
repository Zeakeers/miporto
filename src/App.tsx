import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './index.css'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6;
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isThrottled, setIsThrottled] = useState(false);

  // Wheel event for desktop
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isThrottled) return;

      // small threshold to avoid ultra sensitive trackpads
      if (Math.abs(e.deltaY) < 20) return;

      setIsThrottled(true);
      setTimeout(() => setIsThrottled(false), 1200);

      if (e.deltaY > 0) {
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
      } else {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isThrottled]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null || isThrottled) return;
    const touchEnd = e.targetTouches[0].clientY;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      setIsThrottled(true);
      setTimeout(() => setIsThrottled(false), 1000);

      if (diff > 0) {
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
      } else {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
      setTouchStart(null);
    }
  };

  // Slides array
  const slides = [
    // SLIDE 0: HERO
    (
      <div className="w-full flex flex-col justify-center items-center relative px-4">
        <div className="relative inline-block px-8 py-8 md:px-20 md:py-8">
          <div className="absolute inset-x-[10%] inset-y-[30%] bg-black/15 blur-[40px] z-0" />
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-black" />
            <div className="absolute right-0 top-0 bottom-0 w-[6px] bg-black" />
            <div className="absolute top-0 left-0 w-[20%] h-[6px] bg-black" />
            <div className="absolute top-0 right-0 w-[20%] h-[6px] bg-black" />
            <div className="absolute bottom-0 left-0 w-[20%] h-[6px] bg-black" />
            <div className="absolute bottom-0 right-0 w-[20%] h-[6px] bg-black" />
          </div>
          <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 px-4 text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] text-black z-40 whitespace-nowrap uppercase">
            DIMAS ADI PUTRA ARIFIN
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-[0.1em] text-black m-0 relative z-30 drop-shadow-sm text-center">
            PORTFOLIO
          </h1>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 text-sm md:text-xl font-medium tracking-[0.3em] text-gray-700 z-40 whitespace-nowrap uppercase">
            WEB DEVELOPER
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between w-full max-w-[650px] mt-20 text-[10px] md:text-xs font-semibold tracking-[0.15em] text-gray-800 uppercase relative z-50 gap-4 items-center">
          <span className="text-center">PROJECTS / CERTIFICATES / OPEN SOURCE</span>
          <span>2021 - 2026</span>
        </div>
      </div>
    ),

    // SLIDE 1: PROFILE
    (
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <div className="flex flex-col gap-12">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl font-extrabold m-0 border-l-4 border-black pl-2 tracking-[0.05em] uppercase text-black">PROFILE</h2>
            <span className="text-xs text-gray-500 tracking-[0.1em]">ABOUT ME</span>
          </div>
          <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center md:items-start">
            <div className="shrink-0 w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden border border-black/10 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <div className="w-full h-full rounded-full overflow-hidden relative group">
                <img src="/profile.png" alt="Profile" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
            <div className="flex-1 pt-0 md:pt-8 w-full">
              <div className="mb-3 text-base md:text-lg"><strong className="font-bold text-black inline-block min-w-[120px] md:min-w-[150px]">Name :</strong> Dimas Adi Putra Arifin</div>
              <div className="mb-3 text-base md:text-lg"><strong className="font-bold text-black inline-block min-w-[120px] md:min-w-[150px]">Experience :</strong> 3 years of web development</div>
              <div className="mb-3 text-base md:text-lg"><strong className="font-bold text-black inline-block min-w-[120px] md:min-w-[150px]">Tech Stack :</strong> React, Next.js, Node.js, Laravel</div>

              <div className="flex flex-wrap items-center gap-5 mt-6">
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/dimas-adi-putra-arifin-350104271/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0a66c2] transition-colors duration-300">
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                {/* Instagram */}
                <a href="https://instagram.com/dimasadi" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors duration-300">
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                {/* Email */}
                <a href="mailto:dimasadiputraarifin@gmail.com" className="text-gray-400 hover:text-[#EA4335] transition-colors duration-300">
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.259l4.616-3.74v9.348l-4.616-5.608z" /></svg>
                </a>
                {/* Github */}
                <a href="https://github.com/Zeakeers" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors duration-300">
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>

                {/* CV Button */}
                <a href="/cv.pdf" download className="ml-auto px-6 py-2 border-2 border-black text-black text-xs md:text-sm font-extrabold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300">
                  DOWNLOAD CV
                </a>
              </div>
              <div className="mt-8 md:mt-12">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-lg md:text-xl font-bold m-0 border-l-[3px] border-black pl-2 text-black">Introduction</h3>
                </div>
                <p className="text-base md:text-lg leading-[1.8] mb-6 text-gray-700">
                  My work is focused on building high-performance, visually stunning, and user-friendly web applications. I specialize in both frontend and backend development, combining aesthetic design with robust architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // SLIDE 2: PROJECTS TITLE
    (
      <div className="w-full h-full flex flex-col justify-center items-center relative px-4">
        {/* Soft shadow background */}
        <div className="absolute inset-x-[20%] inset-y-[35%] bg-black/15 blur-[50px] z-0" />

        {/* Responsive scaling container */}
        <div className="relative w-[900px] h-[400px] scale-[0.35] sm:scale-[0.5] md:scale-[0.7] lg:scale-100 flex-shrink-0 z-10">

          {/* SVG for Diagonal Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>

            <line x1="70" y1="94" x2="215" y2="152" stroke="black" strokeWidth="1.5" />

            <line x1="80" y1="260" x2="280" y2="240" stroke="black" strokeWidth="1.5" />

            <line x1="830" y1="94" x2="555" y2="152" stroke="black" strokeWidth="1.5" />

            <line x1="840" y1="260" x2="690" y2="240" stroke="black" strokeWidth="1.5" />
          </svg>

          {/* MAIN THICK BOX */}
          <div className="absolute left-[130px] top-[110px] w-[640px] h-[180px] pointer-events-none">

            <div className="absolute top-0 left-0 w-full h-[6px] bg-black" />

            <div className="absolute top-0 left-0 w-[6px] h-[180px] bg-black" />

            <div className="absolute top-0 right-0 w-[6px] h-[180px] bg-black" />

            <div className="absolute bottom-0 left-0 w-[180px] h-[6px] bg-black" />

            <div className="absolute bottom-0 right-0 w-[180px] h-[6px] bg-black" />
          </div>

          {/* MAIN TEXT */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-[85px] font-extrabold tracking-[0.15em] text-black m-0 drop-shadow-sm ml-[15px]">
              PROJECTS
            </h2>
          </div>

          {/* BOTTOM GAP TEXT */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[278px] px-8 text-xl font-medium tracking-[0.3em] text-gray-700 whitespace-nowrap uppercase bg-transparent">
            SELECTED WORKS
          </div>

          {/* CORNER BOXES */}
          <div className="absolute left-[10px] top-[60px] w-[60px] h-[34px] border-[1.5px] border-black flex items-center justify-center bg-transparent z-20">
            <span className="font-extrabold text-lg tracking-[0.1em] text-black">PHP</span>
          </div>
          <div className="absolute left-[10px] top-[260px] w-[70px] h-[34px] border-[1.5px] border-black flex items-center justify-center bg-transparent z-20">
            <span className="font-extrabold text-lg tracking-[0.1em] text-black">RUST</span>
          </div>
          <div className="absolute right-[10px] top-[60px] w-[60px] h-[34px] border-[1.5px] border-black flex items-center justify-center bg-transparent z-20">
            <span className="font-extrabold text-lg tracking-[0.1em] text-black">CSS</span>
          </div>
          <div className="absolute right-[10px] top-[260px] w-[50px] h-[34px] border-[1.5px] border-black flex items-center justify-center bg-transparent z-20">
            <span className="font-extrabold text-lg tracking-[0.1em] text-black">TS</span>
          </div>

          {/* Bottom Texts mimicking reference */}
          <div className="absolute left-[130px] top-[300px] text-[10px] tracking-[0.2em] text-black font-semibold">
            WEB APPLICATIONS / DASHBOARDS / SAAS
          </div>
          <div className="absolute right-[130px] top-[300px] text-[10px] tracking-[0.2em] text-black font-semibold">
            2022.12 - 2024.4
          </div>
        </div>
      </div>
    ),

    // SLIDE 3: PROJECTS GALLERY
    (
      <div className="w-full h-full flex flex-col pt-[100px] md:pt-[120px] pb-12 md:pb-16 px-8 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[3px] h-6 bg-black" />
            <h2 className="text-2xl md:text-3xl font-extrabold m-0 tracking-[0.05em] uppercase text-black">PROJECTS</h2>
          </div>
          <span className="text-[9px] md:text-[10px] text-gray-500 tracking-[0.2em] uppercase mt-1 pl-3 font-semibold">RECENT WORKS</span>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory flex-1 items-center [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

          {/* Card 1 */}
          <div className="shrink-0 w-[240px] md:w-[320px] snap-center flex flex-col gap-2">
            <div className="w-full aspect-[3/4.2] bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative group cursor-pointer border border-black/10">
              <img src="/project1.png" alt="Analytics Dashboard" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 md:p-6">
                <h3 className="text-white font-extrabold text-lg md:text-xl tracking-wider">Analytics Dashboard</h3>
                <span className="text-white/80 text-[10px] md:text-xs tracking-widest mt-2 uppercase">React / D3.js</span>
              </div>
            </div>
            <div className="text-right text-[9px] md:text-[10px] text-gray-400 tracking-widest font-bold pr-1 mt-1">30/06/2023</div>
          </div>

          {/* Card 2 */}
          <div className="shrink-0 w-[240px] md:w-[320px] snap-center flex flex-col gap-2">
            <div className="w-full aspect-[3/4.2] bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative group cursor-pointer border border-black/10">
              <img src="/project2.png" alt="TaskFlow SaaS" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 md:p-6">
                <h3 className="text-white font-extrabold text-lg md:text-xl tracking-wider">TaskFlow SaaS</h3>
                <span className="text-white/80 text-[10px] md:text-xs tracking-widest mt-2 uppercase">Next.js / Framer</span>
              </div>
            </div>
            <div className="text-right text-[9px] md:text-[10px] text-gray-400 tracking-widest font-bold pr-1 mt-1">27/09/2023</div>
          </div>

          {/* Card 3 */}
          <div className="shrink-0 w-[240px] md:w-[320px] snap-center flex flex-col gap-2">
            <div className="w-full aspect-[3/4.2] bg-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative group cursor-pointer border border-black/10 flex items-center justify-center">
              <span className="text-gray-400 font-bold tracking-widest text-sm">PROJECT 3</span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 md:p-6">
                <h3 className="text-white font-extrabold text-lg md:text-xl tracking-wider">E-Commerce App</h3>
                <span className="text-white/80 text-[10px] md:text-xs tracking-widest mt-2 uppercase">Vue / Tailwind</span>
              </div>
            </div>
            <div className="text-right text-[9px] md:text-[10px] text-gray-400 tracking-widest font-bold pr-1 mt-1">15/01/2024</div>
          </div>

          {/* Card 4 */}
          <div className="shrink-0 w-[240px] md:w-[320px] snap-center flex flex-col gap-2">
            <div className="w-full aspect-[3/4.2] bg-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative group cursor-pointer border border-black/10 flex items-center justify-center">
              <span className="text-gray-400 font-bold tracking-widest text-sm">PROJECT 4</span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 md:p-6">
                <h3 className="text-white font-extrabold text-lg md:text-xl tracking-wider">Mobile App UI</h3>
                <span className="text-white/80 text-[10px] md:text-xs tracking-widest mt-2 uppercase">React Native</span>
              </div>
            </div>
            <div className="text-right text-[9px] md:text-[10px] text-gray-400 tracking-widest font-bold pr-1 mt-1">17/03/2024</div>
          </div>

          {/* Spacer for right edge */}
          <div className="shrink-0 w-4 md:w-8" />

        </div>

        {/* Footer Line */}
        <div className="flex items-center gap-4 mt-auto pt-6 w-full">
          <span className="text-[11px] md:text-xs font-bold tracking-[0.05em] text-black whitespace-nowrap">
            [Selected Works] Web Development Portfolio
          </span>
          <div className="flex-1 h-[1px] bg-black/30" />
        </div>

      </div>
    ),

    // SLIDE 4: CERTIFICATES TITLE
    (
      <div className="w-full h-full flex flex-col justify-center items-center relative px-4">
        <div className="absolute inset-x-[20%] inset-y-[35%] bg-black/15 blur-[50px] z-0" />

        <div className="relative w-[900px] h-[400px] scale-[0.35] sm:scale-[0.5] md:scale-[0.7] lg:scale-100 flex-shrink-0 z-10">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {/* CSS -> C */}
            <line x1="70" y1="94" x2="165" y2="155" stroke="black" strokeWidth="1.5" />
            {/* REACT -> R */}
            <line x1="90" y1="260" x2="265" y2="240" stroke="black" strokeWidth="1.5" />
            {/* AWS -> A */}
            <line x1="830" y1="94" x2="565" y2="155" stroke="black" strokeWidth="1.5" />
            {/* SQL -> S */}
            <line x1="830" y1="260" x2="730" y2="240" stroke="black" strokeWidth="1.5" />
          </svg>

          <div className="absolute left-[130px] top-[110px] w-[640px] h-[180px] pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-[6px] bg-black" />
            <div className="absolute top-0 left-0 w-[6px] h-[180px] bg-black" />
            <div className="absolute top-0 right-0 w-[6px] h-[180px] bg-black" />
            <div className="absolute bottom-0 left-0 w-[180px] h-[6px] bg-black" />
            <div className="absolute bottom-0 right-0 w-[180px] h-[6px] bg-black" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-[70px] font-extrabold tracking-[0.15em] text-black m-0 drop-shadow-sm ml-[15px]">
              CERTIFICATES
            </h2>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-[278px] px-8 text-xl font-medium tracking-[0.3em] text-gray-700 whitespace-nowrap uppercase bg-transparent">
            ACHIEVEMENTS
          </div>

          <div className="absolute left-[10px] top-[60px] w-[60px] h-[34px] border-[1.5px] border-black flex items-center justify-center bg-transparent z-20">
            <span className="font-extrabold text-lg tracking-[0.1em] text-black">CSS</span>
          </div>
          <div className="absolute left-[10px] top-[260px] w-[80px] h-[34px] border-[1.5px] border-black flex items-center justify-center bg-transparent z-20">
            <span className="font-extrabold text-lg tracking-[0.1em] text-black">REACT</span>
          </div>
          <div className="absolute right-[10px] top-[60px] w-[60px] h-[34px] border-[1.5px] border-black flex items-center justify-center bg-transparent z-20">
            <span className="font-extrabold text-lg tracking-[0.1em] text-black">AWS</span>
          </div>
          <div className="absolute right-[10px] top-[260px] w-[60px] h-[34px] border-[1.5px] border-black flex items-center justify-center bg-transparent z-20">
            <span className="font-extrabold text-lg tracking-[0.1em] text-black">SQL</span>
          </div>

          <div className="absolute left-[130px] top-[300px] text-[10px] tracking-[0.2em] text-black font-semibold">
            COURSES / BOOTCAMPS / AWARDS
          </div>
          <div className="absolute right-[130px] top-[300px] text-[10px] tracking-[0.2em] text-black font-semibold">
            2021.5 - 2024.1
          </div>
        </div>
      </div>
    ),

    // SLIDE 5: CERTIFICATES GALLERY
    (
      <div className="w-full h-full flex flex-col pt-[100px] md:pt-[120px] pb-12 md:pb-16 px-8 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col mb-8 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-[3px] h-6 bg-black" />
            <h2 className="text-2xl md:text-3xl font-extrabold m-0 tracking-[0.05em] uppercase text-black">AWARDS</h2>
          </div>
          <span className="text-[9px] md:text-[10px] text-gray-500 tracking-[0.2em] uppercase mt-1 pl-3 font-semibold">CERTIFICATIONS & ACHIEVEMENTS</span>
        </div>

        {/* Horizontal Masonry Grid Container */}
        <div className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="grid grid-rows-2 grid-flow-col gap-4 md:gap-6 h-full auto-cols-max">

            {/* Certificate 1 (Portrait - Spans 2 rows) */}
            <div className="row-span-2 h-full aspect-[3/4.2] relative group cursor-pointer border border-black/10 shadow-sm hover:shadow-xl transition-all duration-500 bg-white p-2 flex flex-col">
              <div className="w-full flex-1 relative overflow-hidden bg-gray-100 group-hover:opacity-90 transition-opacity">
                <img src="/cert1.png" alt="Award 1" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="mt-3 px-1 flex justify-between items-center shrink-0">
                <h3 className="font-extrabold text-sm uppercase text-black">Frontend Web Dev</h3>
                <span className="text-[10px] text-gray-500 font-semibold tracking-wider">2023</span>
              </div>
            </div>

            {/* Certificate 2 (Landscape - Spans 1 row) */}
            <div className="row-span-1 h-full aspect-[4/3] relative group cursor-pointer border border-black/10 shadow-sm hover:shadow-xl transition-all duration-500 bg-white p-2 flex flex-col">
              <div className="w-full flex-1 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 font-bold tracking-widest text-xs text-center">LANDSCAPE</span>
              </div>
              <div className="mt-2 px-1 flex justify-between items-center shrink-0">
                <h3 className="font-extrabold text-xs uppercase text-black">AWS Cloud</h3>
                <span className="text-[9px] text-gray-500 font-semibold tracking-wider">2024</span>
              </div>
            </div>

            {/* Certificate 3 (Landscape - Spans 1 row) */}
            <div className="row-span-1 h-full aspect-[4/3] relative group cursor-pointer border border-black/10 shadow-sm hover:shadow-xl transition-all duration-500 bg-white p-2 flex flex-col">
              <div className="w-full flex-1 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 font-bold tracking-widest text-xs text-center">LANDSCAPE</span>
              </div>
              <div className="mt-2 px-1 flex justify-between items-center shrink-0">
                <h3 className="font-extrabold text-xs uppercase text-black">React Native</h3>
                <span className="text-[9px] text-gray-500 font-semibold tracking-wider">2024</span>
              </div>
            </div>

            {/* Certificate 4 (Portrait - Spans 2 rows) */}
            <div className="row-span-2 h-full aspect-[3/4.2] relative group cursor-pointer border border-black/10 shadow-sm hover:shadow-xl transition-all duration-500 bg-white p-2 flex flex-col">
              <div className="w-full flex-1 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 font-bold tracking-widest text-sm text-center">PORTRAIT</span>
              </div>
              <div className="mt-3 px-1 flex justify-between items-center shrink-0">
                <h3 className="font-extrabold text-sm uppercase text-black">UI/UX Design</h3>
                <span className="text-[10px] text-gray-500 font-semibold tracking-wider">2023</span>
              </div>
            </div>

            {/* Certificate 5 (Landscape - Spans 1 row) */}
            <div className="row-span-1 h-full aspect-[4/3] relative group cursor-pointer border border-black/10 shadow-sm hover:shadow-xl transition-all duration-500 bg-white p-2 flex flex-col">
              <div className="w-full flex-1 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 font-bold tracking-widest text-xs text-center">LANDSCAPE</span>
              </div>
              <div className="mt-2 px-1 flex justify-between items-center shrink-0">
                <h3 className="font-extrabold text-xs uppercase text-black">Cybersecurity</h3>
                <span className="text-[9px] text-gray-500 font-semibold tracking-wider">2024</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Line */}
        <div className="flex flex-col mt-4 pt-4 w-full shrink-0 border-t-[2px] border-black gap-2">
          <div className="flex justify-between items-center w-full">
            <span className="text-[11px] md:text-xs font-bold tracking-[0.05em] text-black whitespace-nowrap">
              [Professional Awards] Web Development Certifications
            </span>
            <span className="text-[9px] md:text-[10px] text-gray-400 tracking-widest font-bold">
              2021 - 2024
            </span>
          </div>
        </div>

      </div>
    )
  ];

  return (
    <div
      className="fixed inset-0 overflow-hidden w-full h-screen bg-[#fcfcfc]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Fixed Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-[-20%] left-[-10%] z-0 pointer-events-none w-[140%] h-[140%] bg-[radial-gradient(circle_at_20%_30%,rgba(200,210,255,0.5)_0%,transparent_40%),radial-gradient(circle_at_80%_70%,rgba(230,240,255,0.6)_0%,transparent_40%),radial-gradient(circle_at_50%_50%,rgba(240,240,255,0.4)_0%,transparent_60%)] blur-[80px]" />

      {/* Slide Navigation Dots */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 cursor-pointer border border-black/10 ${currentSlide === idx ? 'bg-black scale-150' : 'bg-black/20 hover:bg-black/50'}`}
          />
        ))}
      </div>

      {/* Presentation Engine */}
      {slides.map((SlideContent, index) => {
        let state = 'hidden';
        if (index === currentSlide) state = 'active';
        else if (index === currentSlide - 1) state = 'prev';

        return (
          <motion.div
            key={index}
            initial={false}
            animate={{
              opacity: state === 'active' ? 1 : state === 'prev' ? 0.2 : 0,
              filter: state === 'active' ? 'blur(0px)' : state === 'prev' ? 'blur(15px)' : 'blur(0px)',
              scale: state === 'active' ? 1 : state === 'prev' ? 0.95 : 1.05,
              zIndex: state === 'active' ? 10 : state === 'prev' ? 5 : 0,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className={`absolute inset-0 w-full h-full flex items-center justify-center ${state === 'active' ? 'pointer-events-auto' : 'pointer-events-none'}`}
          >
            {SlideContent}
          </motion.div>
        );
      })}
    </div>
  )
}

export default App
