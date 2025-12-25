import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full">
      <div
        className="
          relative overflow-hidden rounded-xl
          bg-[var(--bg-card)]
          border border-[var(--border-main)]
          transition-all duration-300
          hover:shadow-lg hover:shadow-indigo-500/10
        "
      >
        {/* Soft hover glow (theme-safe) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/8 to-purple-500/8" />
        </div>

        <div className="relative p-5 z-10">
          {/* Project Image */}
          <div className="relative overflow-hidden rounded-lg border border-[var(--border-main)]">
            <img
              src={Img}
              alt={Title}
              className="
                w-full h-48 object-cover
                transition-transform duration-500
                group-hover:scale-105
              "
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="mt-4 space-y-3">
            <h3 className="text-lg font-semibold text-[var(--text-main)]">
              {Title}
            </h3>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
              {Description}
            </p>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="
                    inline-flex items-center gap-2
                    text-indigo-500 hover:text-indigo-600
                    text-sm font-medium transition
                  "
                >
                  Live Demo
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-xs text-[var(--text-muted)]">
                  Demo Not Available
                </span>
              )}

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2 rounded-lg
                    bg-indigo-500/10 text-indigo-600
                    hover:bg-indigo-500/20
                    transition text-sm font-medium
                  "
                >
                  Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-xs text-[var(--text-muted)]">
                  Details Not Available
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
