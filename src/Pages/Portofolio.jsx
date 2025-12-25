import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import Certificate from "../components/Certificate";

import AOS from "aos";
import "aos/dist/aos.css";

import { Code, Award, Boxes } from "lucide-react";

/* ================= TOGGLE BUTTON ================= */

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 text-sm text-[var(--text-main)]
               bg-[var(--bg-card)]
               rounded-md border border-[var(--border-main)]
               hover:border-indigo-400 transition"
  >
    {isShowingMore ? "See Less" : "See More"}
  </button>
);

ToggleButton.propTypes = {
  onClick: PropTypes.func,
  isShowingMore: PropTypes.bool,
};

/* ================= TAB PANEL ================= */

const TabPanel = ({ children, value, index }) => {
  if (value !== index) return null;
  return (
    <Box sx={{ p: { xs: 1, sm: 3 } }}>
      <Typography component="div">{children}</Typography>
    </Box>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number,
};

/* ================= TECH STACK ================= */

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node.js" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
];

/* ================= MAIN ================= */

export default function Portofolio() {
  const [tab, setTab] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  /* ================= AOS ================= */

  useEffect(() => {
    AOS.init({ once: true, duration: 900 });
  }, []);

  /* ================= FETCH FIREBASE ================= */

  const fetchData = useCallback(async () => {
    const projectSnap = await getDocs(collection(db, "projects"));
    const certSnap = await getDocs(collection(db, "certificates"));

    const projectData = projectSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const certData = certSnap.docs.map((doc) => doc.data());

    setProjects(projectData);
    setCertificates(certData);

    localStorage.setItem("projects", JSON.stringify(projectData));
    localStorage.setItem("certificates", JSON.stringify(certData));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const visibleProjects = showAllProjects
    ? projects
    : projects.slice(0, initialItems);

  const visibleCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, initialItems);

  return (
    <section
      id="Portofolio"
      className="bg-[var(--bg-main)] text-[var(--text-main)]
                 px-[5%] md:px-[10%] py-20"
    >
      {/* HEADER */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-bold
                       bg-gradient-to-r from-indigo-500 to-purple-500
                       bg-clip-text text-transparent">
          Portfolio Showcase
        </h2>
        <p className="text-muted max-w-2xl mx-auto mt-2">
          Projects, certifications and technical skills from my journey.
        </p>
      </div>

      {/* TABS */}
      <div className="theme-card rounded-2xl mb-8">
        <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent" }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                color: "var(--text-muted)",
                fontWeight: 600,
              },
              "& .MuiTab-root.Mui-selected": {
                color: "var(--text-main)",
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))",
              },
              "& .MuiTabs-indicator": { display: "none" },
            }}
          >
            <Tab icon={<Code />} label="Projects" />
            <Tab icon={<Award />} label="Certificates" />
            <Tab icon={<Boxes />} label="Tech Stack" />
          </Tabs>
        </AppBar>
      </div>

      {/* PANELS */}
      <TabPanel value={tab} index={0}>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleProjects.map((p) => (
            <CardProject key={p.id} {...p} />
          ))}
        </div>

        {projects.length > initialItems && (
          <div className="mt-6">
            <ToggleButton
              onClick={() => setShowAllProjects((p) => !p)}
              isShowingMore={showAllProjects}
            />
          </div>
        )}
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <div className="grid md:grid-cols-3 gap-6">
          {visibleCertificates.map((c, i) => (
            <Certificate key={i} ImgSertif={c.Img} />
          ))}
        </div>

        {certificates.length > initialItems && (
          <div className="mt-6">
            <ToggleButton
              onClick={() => setShowAllCertificates((p) => !p)}
              isShowingMore={showAllCertificates}
            />
          </div>
        )}
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {techStacks.map((t, i) => (
            <TechStackIcon key={i} {...t} />
          ))}
        </div>
      </TabPanel>
    </section>
  );
}
