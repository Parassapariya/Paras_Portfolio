import React, { useEffect, memo, useMemo } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* ================= HEADER ================= */

const Header = memo(() => (
  <div className="text-center mb-10 px-[5%]">
    <h2
      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
      data-aos="zoom-in"
    >
      About Me
    </h2>

    <p
      className="mt-4 text-muted max-w-2xl mx-auto flex items-center justify-center gap-2"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
      Transforming ideas into scalable digital solutions
      <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
    </p>
  </div>
));

/* ================= PROFILE IMAGE ================= */

const ProfileImage = memo(() => (
  <div className="flex justify-center lg:justify-end" data-aos="fade-left">
    <div className="relative group">
      <div className="absolute -inset-6 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition" />

      <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border border-theme shadow-xl relative">
        <img
          src="/Photo.png"
          alt="Paras Sapariya"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
    </div>
  </div>
));

/* ================= STAT CARD ================= */

const StatCard = memo(({ icon: Icon, value, label, description }) => (
  <div
    className="theme-card rounded-2xl p-6 hover:border-indigo-400/40 transition"
    data-aos="fade-up"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-indigo-500/20 rounded-full">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <span className="text-3xl font-bold text-theme">
        {value}
      </span>
    </div>

    <p className="uppercase text-xs tracking-wide text-muted">
      {label}
    </p>
    <p className="text-sm text-muted mt-1 flex items-center justify-between">
      {description}
      <ArrowUpRight className="w-4 h-4 text-indigo-400" />
    </p>
  </div>
));

/* ================= MAIN ================= */

const AboutPage = () => {
  const { totalProjects, totalCertificates, yearsExperience } =
    useMemo(() => {
      const projects =
        JSON.parse(localStorage.getItem("projects")) || [];
      const certificates =
        JSON.parse(localStorage.getItem("certificates")) || [];

      const startYear = 2021;
      const currentYear = new Date().getFullYear();

      return {
        totalProjects: projects.length,
        totalCertificates: certificates.length,
        yearsExperience: currentYear - startYear,
      };
    }, []);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 900,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section
      id="About"
      className="relative bg-[var(--bg-main)] text-[var(--text-main)] py-20 px-[5%] lg:px-[10%] transition-colors duration-300"
    >
      <Header />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="space-y-6" data-aos="fade-right">
          <h3 className="text-3xl sm:text-4xl font-bold">
            Hello, I’m{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Paras Sapariya
            </span>
          </h3>

          <p className="text-muted leading-relaxed text-justify">
            I am an MCA student at Marwadi University with strong
            fundamentals in Data Structures, DBMS, Operating Systems,
            and Computer Networks. I specialize in backend development
            and full-stack web applications, focusing on scalable APIs,
            clean architecture, and efficient database design.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/resume/Paras_Sapariya_Resume.pdf"
              download
              className="btn-primary flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Download Resume
            </a>

            <a
              href="#Portofolio"
              className="btn-secondary flex items-center gap-2"
            >
              <Code className="w-4 h-4" />
              View Projects
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <ProfileImage />
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-20">
        <StatCard
          icon={Code}
          value={totalProjects}
          label="Projects"
          description="Completed & in progress"
        />
        <StatCard
          icon={Award}
          value={totalCertificates}
          label="Certificates"
          description="Skill validations"
        />
        <StatCard
          icon={Globe}
          value={yearsExperience}
          label="Years Experience"
          description="Learning & building"
        />
      </div>
    </section>
  );
};

export default memo(AboutPage);
