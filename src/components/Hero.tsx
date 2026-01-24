import React, { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, Users, Cpu, Monitor, Laptop, Cloud, Code, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import SocialLinks from "@/components/SocialLinks";
import TextPressure from "@/components/ui/TextPressure";

const Hero: React.FC = () => {
  const eventDate = new Date("2026-02-27T09:00:00");

  const collegeLogoSrc = "/images/hicet.png";
  const collegeName = "Hindusthan College of Engineering and Technology";

  const sliderGifs = [
    "/images/cse.png",
    "/images/cse3.png",
    "/images/cse4.png",
  ];

  const [index, setIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);

  useEffect(() => {
    autoplayRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % sliderGifs.length);
    }, 4000);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, []);

  const prev = () =>
    setIndex((i) => (i - 1 + sliderGifs.length) % sliderGifs.length);

  const next = () =>
    setIndex((i) => (i + 1) % sliderGifs.length);

  const mediaRef = useRef<HTMLDivElement | null>(null);

  return (
    // Reduced top padding so hero is closer to header
    <section className="relative min-h-screen flex items-center overflow-hidden pt-8 md:pt-12 bg-gradient-to-b from-[#071133] via-[#071a45] to-[#06112b] text-white mb-2.5">
      {/* Reduced container vertical padding */}
      <div className="container mx-auto px-6 py-8 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 text-left">

            {/* REGISTRATION PILL */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/6 border border-white/10 mb-5 backdrop-blur-sm w-fit">
              <span
                className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse pulse-dot"
                aria-hidden
              />
              <span className="text-sm font-medium">
                Registration Open
              </span>
            </div>

            {/* COLLEGE NAME AND LOGO ABOVE TECHAZURA */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={collegeLogoSrc}
                alt={`${collegeName} logo`}
                className="w-16 h-16 object-contain bg-white/5 p-2 rounded-md"
              />
              <div>
                <div className="text-lg font-semibold">
                  {collegeName}
                </div>
                <div className="text-xs text-white/60">
                  Proud Host
                </div>
              </div>
            </div>

           {/* EVENT NAME VERY LARGE (TECHAZURA FONT STYLE UNCHANGED) */}
<div className="mb-3">
  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
    
    {/* Techazura */}
    <div className="relative w-full sm:w-auto flex justify-center sm:justify-start">
      <div className="relative h-[60px] sm:h-[80px]">
        <TextPressure
          text="Techazura"
          flex
          alpha={false}
          stroke={false}
          width
          weight
          italic
          textColor="#ffffff"
          strokeColor="#0EA5A4"
          minFontSize={34}   // reduced for mobile
          className="
            text-[28px] sm:text-4xl md:text-6xl
            tracking-wider sm:tracking-widest
            font-bangers
            drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)]
            text-center sm:text-left
            leading-none
            whitespace-nowrap
          "
        />
      </div>
    </div>

    {/* 2026 */}
    <div className="flex justify-center sm:justify-start">
      <span
        className="
          text-[35px] sm:text-5xl md:text-6xl
          tracking-wider sm:tracking-widest
          font-bangers
          drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)]
          text-[#0EA5A4]
          leading-none
        "
      >
        2026
      </span>
    </div>

  </div>
</div>



            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 max-w-xl">
              A flagship CSE symposium — workshops, competitions, talks and community. Register online to secure your seat.
            </p>

            {/* STATIC CSE THEMED ICONS */}
            <div className="flex items-center gap-4 mb-6 " aria-hidden>
              <div className="single-icon-wrap">
                <Cpu className="single-lucide-icon" />
              </div>
              <div className="single-icon-wrap">
                <Monitor className="single-lucide-icon" />
              </div>
              <div className="single-icon-wrap">
                <Laptop className="single-lucide-icon" />
              </div>
              <div className="single-icon-wrap">
                <Cloud className="single-lucide-icon" />
              </div>
              <div className="single-icon-wrap">
                <Code className="single-lucide-icon" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>February 27, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Kalam Auditorium</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>500+ Participants</span>
              </div>
            </div>


            <div className="mt-4">
              <CountdownTimer targetDate={eventDate} />
            </div>
          </div>

          {/* RIGHT SIDE: FLIPKART STYLE GIF SLIDER (NO ANIMATION) */}
          <div className="md:col-span-5">
            <div
              ref={mediaRef}
              className="relative rounded-2xl overflow-hidden border border-white/8 shadow-2xl bg-black/40"
            >
              <div className="relative w-full h-72 md:h-96">

                <button
                  aria-label="Previous Slide"
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 p-2 rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  aria-label="Next Slide"
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 p-2 rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {sliderGifs.map((gif, i) => (
                  <img
                    key={i}
                    src={gif}
                    alt={`Preview ${i + 1}`}
                    style={{
                      display: i === index ? "block" : "none",
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ))}

                <div className="absolute bottom-3 left-3 bg-black/40 px-3 py-1 rounded text-xs">
                  CSE Tracks: AI · Cloud · Dev · Security
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* fallback pulse animation in case Tailwind's animate-pulse is not available */
        @keyframes pulseFallback {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
        .pulse-dot {
          animation: pulseFallback 1.2s ease-in-out infinite;
        }

        .single-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
          padding: 10px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .single-lucide-icon {
          width: 22px;
          height: 22px;
          opacity: 0.95;
          stroke-width: 1.2;
        }
      `}</style>
    </section>
  );
};

export default Hero;
