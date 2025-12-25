import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Layers,
  Star,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

/* ======================================================
   RESUME-BASED PROJECT DATA (NO FAKE CONTENT)
====================================================== */

const RESUME_PROJECTS = [
  {
    id: "car-rental",
    Title: "Car Rental Management System",
    Description:
      "A full-stack academic project designed to manage vehicle rentals efficiently. The system handles booking workflows, route logic, and car availability using a PHP-based backend with MySQL database integration.",
    Img: "/projects/car-rental.png",
    Link: "",
    Github: "Private",
    TechStack: ["PHP", "MySQL", "HTML", "CSS", "Bootstrap"],
    Features: [
      "Vehicle booking and availability management",
      "Route and pricing logic handling",
      "Admin-side car data management",
      "Responsive UI built using Bootstrap",
      "Secure backend data handling with MySQL",
    ],
  },
  {
    id: "ayurvedic-store",
    Title: "Ayurvedic Store Management System",
    Description:
      "A backend-focused academic project developed using ASP.NET for managing an Ayurvedic product store. The system includes secure authentication, category management, and inventory handling.",
    Img: "/projects/ayurvedic-store.png",
    Link: "",
    Github: "Private",
    TechStack: ["ASP.NET", "SQL Server"],
    Features: [
      "Secure user authentication system",
      "Product and category management",
      "Inventory tracking and updates",
      "Backend APIs using ASP.NET",
      "Optimized SQL Server database queries",
    ],
  },
  {
    id: "youtube-search",
    Title: "YouTube Video Search App",
    Description:
      "A personal backend project that integrates the YouTube Data API to provide keyword-based video search functionality. The backend serves embedded video previews dynamically.",
    Img: "/projects/youtube-search.png",
    Link: "",
    Github: "Private",
    TechStack: ["Node.js", "JavaScript", "YouTube Data API"],
    Features: [
      "Keyword-based video search",
      "YouTube Data API integration",
      "Embedded video preview generation",
      "Backend service built using Node.js",
      "API response handling and optimization",
    ],
  },
];

/* ======================================================
   MAIN COMPONENT
====================================================== */

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Try Firebase/localStorage first
    const storedProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    const firebaseProject = storedProjects.find(
      (p) => String(p.id) === id
    );

    if (firebaseProject) {
      setProject(firebaseProject);
    } else {
      // Fallback to resume-based project
      const resumeProject = RESUME_PROJECTS.find(
        (p) => p.id === id
      );
      setProject(resumeProject);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  const handleGithubClick = () => {
    if (project.Github === "Private") {
      Swal.fire({
        icon: "info",
        title: "Private Repository",
        text: "Source code is private as this is an academic/personal project.",
        confirmButtonColor: "#6366f1",
      });
      return false;
    }
    return true;
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{project.Title} | Paras Sapariya</title>
        <meta name="description" content={project.Description} />
      </Helmet>

      <section className="min-h-screen bg-[var(--bg-main)] px-5 md:px-10 py-16">
        <div className="max-w-7xl mx-auto">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-indigo-400 transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="grid lg:grid-cols-2 gap-14">

            {/* LEFT */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                {project.Title}
              </h1>

              <p className="text-[var(--text-muted)] leading-relaxed">
                {project.Description}
              </p>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-4">
                <div className="theme-card rounded-xl p-4">
                  <Code2 className="text-indigo-500 mb-1" />
                  <p className="text-xl font-semibold">
                    {project.TechStack.length}
                  </p>
                  <p className="text-sm text-muted">Technologies</p>
                </div>
                <div className="theme-card rounded-xl p-4">
                  <Layers className="text-purple-500 mb-1" />
                  <p className="text-xl font-semibold">
                    {project.Features.length}
                  </p>
                  <p className="text-sm text-muted">Key Features</p>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4">
                {project.Link && (
                  <a
                    href={project.Link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 transition flex items-center gap-2"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                )}

                <a
                  href={project.Github}
                  onClick={(e) =>
                    !handleGithubClick() && e.preventDefault()
                  }
                  className="px-6 py-3 rounded-xl bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 transition flex items-center gap-2"
                >
                  <Github size={18} />
                  GitHub
                </a>
              </div>

              {/* TECH STACK */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Star className="text-yellow-400" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.TechStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-600 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden border border-[var(--border-main)]">
                <img
                  src={project.Img}
                  alt={project.Title}
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* FEATURES */}
              <div className="theme-card rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {project.Features.map((f, i) => (
                    <li key={i} className="flex gap-2 text-[var(--text-muted)]">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetails;
