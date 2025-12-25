import React, {
  useState,
  useEffect,
  useCallback,
  memo,
} from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Sparkles,
  Download,
  ChevronDown,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* ✅ HERO GIF */
import heroGif from "../assets/dev-animation.gif";

/* ================= HEADER OFFSET ================= */

const useHeaderOffset = () => {
  const [offset, setOffset] = useState(120);

  useEffect(() => {
    const header = document.querySelector("nav");
    if (!header) return;

    const updateOffset = () =>
      setOffset(header.offsetHeight + 20);

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () =>
      window.removeEventListener("resize", updateOffset);
  }, []);

  return offset;
};

/* ================= UI COMPONENTS ================= */

const StatusBadge = memo(() => (
  <div data-aos="zoom-in">
    <div className="relative inline-flex">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 blur opacity-30 rounded-full" />
      <div className="relative px-4 py-2 rounded-full bg-black/40 backdrop-blur border border-white/10">
        <span className="text-xs sm:text-sm flex items-center gap-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          <Sparkles className="w-4 h-4 animate-pulse" />
          MCA Student • Open to Opportunities
        </span>
      </div>
    </div>
  </div>
));

const TechBadge = memo(({ tech }) => (
  <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm
                   bg-white/5 border border-white/10 text-gray-300">
    {tech}
  </span>
));

/* ================= DATA ================= */

const WORDS = [
  "MCA Student at Marwadi University",
  "Full Stack Web Developer",
  "Backend & API Developer",
];

const TECH_STACK = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Express.js",
  "PHP",
  "ASP.NET",
  "MySQL",
  "MongoDB",
];

const SOCIALS = [
  { icon: Github, link: "https://github.com/EkiZR" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/ekizr/" },
  { icon: Instagram, link: "https://www.instagram.com/ekizr_/?hl=id" },
];

/* ================= MAIN ================= */

const Home = () => {
  const topOffset = useHeaderOffset();

  const [text, setText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  /* AOS */
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 900,
      easing: "ease-out-cubic",
    });
  }, []);

  /* Typing Effect */
  const typeEffect = useCallback(() => {
    const word = WORDS[wordIndex];

    if (typing) {
      if (charIndex < word.length) {
        setText((prev) => prev + word[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setTyping(false), 1400);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setTyping(true);
        setWordIndex((prev) => (prev + 1) % WORDS.length);
      }
    }
  }, [charIndex, typing, wordIndex]);

  useEffect(() => {
    const timer = setTimeout(typeEffect, typing ? 90 : 40);
    return () => clearTimeout(timer);
  }, [typeEffect, typing]);

  return (
    <section
      id="Home"
      className="min-h-screen bg-[#030014] relative overflow-hidden"
      style={{ paddingTop: topOffset }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 min-h-[calc(100vh-120px)]">

          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 space-y-6" data-aos="fade-right">
            <StatusBadge />

            <h1 className="text-4xl sm:text-5xl xl:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                Full Stack
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Developer
              </span>
            </h1>

            <div className="flex items-center text-lg sm:text-xl md:text-2xl">
              <span className="text-gray-300">{text}</span>
              <span className="ml-1 w-[3px] h-6 bg-indigo-400 animate-blink" />
            </div>

            <p className="text-gray-400 max-w-xl leading-relaxed">
              MCA student with strong foundation in Data Structures,
              DBMS, Computer Networks and Web Development.
              Experienced in building full-stack applications
              and REST APIs.
            </p>

            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#Portofolio" className="btn-primary">
                Projects
              </a>
              <a href="#Contact" className="btn-secondary">
                Contact
              </a>
              <a
                href="/resume/Paras_Sapariya_Resume.pdf"
                download
                className="btn-secondary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>

            <div className="hidden sm:flex gap-4 pt-4">
              {SOCIALS.map(({ icon: Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT – GIF */}
          <div
            className="lg:w-1/2 flex justify-center relative"
            data-aos="fade-left"
          >
            <div className="absolute w-[420px] h-[420px]
                            bg-gradient-to-r from-indigo-500/20
                            to-purple-500/20 blur-3xl rounded-full" />

            <img
              src={heroGif}
              alt="Developer illustration"
              className="relative z-10 w-[360px] md:w-[420px]
                         animate-float
                         drop-shadow-[0_0_40px_rgba(99,102,241,0.35)]"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2
                      hidden sm:flex flex-col items-center animate-bounce">
        <ChevronDown className="w-6 h-6 text-indigo-400" />
        <span className="text-xs text-gray-400">Scroll</span>
      </div>
    </section>
  );
};

export default memo(Home);
