import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./index.css";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import WelcomeScreen from "./Pages/WelcomeScreen";

import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import ProjectDetails from "./components/ProjectDetail";

import { AnimatePresence } from "framer-motion";

// ✅ SEO
import { Helmet, HelmetProvider } from "react-helmet-async";

// ✅ Theme
import { ThemeProvider } from "./context/ThemeContext";

/* ================= LANDING PAGE ================= */

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />

          <Home />
          <About />
          <Portofolio />
          <ContactPage />

          <footer>
            <center>
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6" />
              <span className="block text-sm pb-4 text-gray-500 dark:text-gray-400">
                © 2025{" "}
                <a href="#" className="hover:underline">
                  Paras Sapariya
                </a>
                . All Rights Reserved.
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
};

/* ================= PROJECT DETAIL PAGE ================= */

const ProjectPageLayout = () => (
  <>
    <Navbar />
    <ProjectDetails />

    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6" />
        <span className="block text-sm pb-4 text-gray-500 dark:text-gray-400">
          © 2025{" "}
          <a href="#" className="hover:underline">
            Paras Sapariya
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

/* ================= APP ================= */

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <HelmetProvider>
      <ThemeProvider>
        {/* ✅ GLOBAL SEO */}
        <Helmet>
          <title>Paras Sapariya | Full Stack Developer</title>
          <meta
            name="description"
            content="Paras Sapariya – MCA student & Full Stack Developer. Explore projects, skills, and education."
          />
          <meta
            name="keywords"
            content="Paras Sapariya, Full Stack Developer, React, Node.js, Portfolio"
          />
          <meta name="author" content="Paras Sapariya" />
        </Helmet>

        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  showWelcome={showWelcome}
                  setShowWelcome={setShowWelcome}
                />
              }
            />
            <Route path="/project/:id" element={<ProjectPageLayout />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
