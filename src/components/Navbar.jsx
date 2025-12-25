import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const navItems = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Portofolio", label: "Portfolio" },
    { href: "#Contact", label: "Contact" },
  ];

  /* ================= SCROLL HANDLER ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const currentPosition = window.scrollY + 120;

      for (const item of navItems) {
        const section = document.querySelector(item.href);
        if (!section) continue;

        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (currentPosition >= top && currentPosition < top + height) {
          setActiveSection(item.href.replace("#", ""));
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= BODY SCROLL LOCK ================= */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  /* ================= SMOOTH SCROLL ================= */
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (!section) return;

    const headerHeight =
      document.querySelector("nav")?.offsetHeight || 80;

    window.scrollTo({
      top: section.offsetTop - headerHeight - 10,
      behavior: "smooth",
    });

    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isOpen
          ? "bg-[var(--bg-main)]"
          : scrolled
          ? "bg-[var(--bg-main)]/80 backdrop-blur-xl border-b border-[var(--border-main)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
        <div className="flex items-center justify-between h-16">

          {/* ✅ UPDATED LOGO */}
          <a
            href="#Home"
            onClick={(e) => scrollToSection(e, "#Home")}
            className="text-xl font-bold tracking-wide
                       bg-gradient-to-r from-indigo-500 to-purple-500
                       bg-clip-text text-transparent"
          >
            Paras Sapariya
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive =
                activeSection === item.href.replace("#", "");

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="relative text-sm font-medium"
                >
                  <span
                    className={`transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-semibold"
                        : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    {item.label}
                  </span>

                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] w-full
                      bg-gradient-to-r from-indigo-500 to-purple-500
                      transform transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                  />
                </a>
              );
            })}

            <ThemeToggle />
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[var(--text-main)] transition-transform"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bg-[var(--bg-main)]
        transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-6 py-6 space-y-4">
          {navItems.map((item) => {
            const isActive =
              activeSection === item.href.replace("#", "");

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`text-lg ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <div className="pt-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
