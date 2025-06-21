// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CrosswordGrid from "./CrosswordGrid";
import home from "./pages/home";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/contact";
import Project from "./pages/project";
import Experience from "./pages/experience";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CrosswordGrid />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/info" element={<Info />} />
        <Route path="/stuff" element={<Stuff />} />
        <Route path="/page" element={<Page />} />
      </Routes>
    </Router>
  );
}
