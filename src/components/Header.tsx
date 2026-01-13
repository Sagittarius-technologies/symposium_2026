import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const menuRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { href: "#events", label: "Events" },
    { href: "#register", label: "Register" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  // Header shadow on scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!isMenuOpen) return;
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white shadow-md border-gray-200"
          : "bg-white border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">

          {/* Brand */}
          <a
            href="#"
            className="flex items-center gap-3 focus-ring rounded-lg"
            aria-label="Techazura home"
            onClick={() => {
              setActive("");
              setIsMenuOpen(false);
            }}
          >
            <img
              src="/images/logo.png"
              alt="Techazura logo"
              className="w-10 h-10 object-contain rounded-md"
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-sm font-semibold text-black">
                Techazura
              </span>
              <span className="text-xs text-gray-600 -mt-0.5">
                CSE Symposium 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = active === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActive(link.href);
                    setIsMenuOpen(false);
                  }}
                  className={`relative inline-block px-2 py-1 font-medium transition-all duration-200 ${
                    isActive
                      ? "text-black"
                      : "text-gray-700 hover:text-black"
                  } group`}
                >
                  <span className="block transition-transform duration-200 group-hover:-translate-y-0.5">
                    {link.label}
                  </span>

                  {/* Hover underline */}
                  <span
                    className={`absolute left-1/2 bottom-0 h-0.5 rounded bg-teal-600 transition-all duration-300 transform -translate-x-1/2 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href="#events">View Events</a>
            </Button>

            <Button variant="cta" size="sm" asChild>
              <a href="#events">Register Now</a>
            </Button>
          </div>

          {/* Mobile Menu Button (FIXED) */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus-ring"
            onClick={(e) => {
              e.stopPropagation(); // 🔥 FIX
              setIsMenuOpen((s) => !s);
            }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden transform origin-top transition-all duration-300 ${
            isMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          } overflow-hidden`}
        >
          <nav className="py-4 border-t border-gray-200" aria-label="Mobile navigation">
            <div className="flex flex-col gap-2 px-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActive(link.href);
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg text-black hover:bg-gray-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="flex flex-col gap-3 mt-4 px-2">
                <Button variant="outline" asChild>
                  <a href="#events" onClick={() => setIsMenuOpen(false)}>
                    View Events
                  </a>
                </Button>

                <Button variant="cta" asChild>
                  <a href="#register" onClick={() => setIsMenuOpen(false)}>
                    Register Now
                  </a>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <style jsx>{`
        .focus-ring:focus {
          outline: 3px solid rgba(0, 150, 136, 0.2);
          outline-offset: 3px;
        }
      `}</style>
    </header>
  );
};

export default Header;
