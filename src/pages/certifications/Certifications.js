import React, { useRef, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Certifications.css";

const slider1 = [
  { color: "#e3e5e7", src: "/images/smart.png" },
  { color: "#d6d7dc", src: "/images/python.png" },
  { color: "#e3e3e3", src: "/images/java.png" },
  { color: "#21242b", src: "/images/vault.png" },
];

const slider2 = [
  { color: "#d4e3ec", src: "/images/py.png" },
  { color: "#e5e0e1", src: "/images/prog.png" },
  { color: "#d7d4cf", src: "/images/rbi.png" },
  { color: "#e1dad6", src: "/images/andra.png" },
];
const slider3 = [
  { color: "#e3e5e7", src: "/images/iit.png" },
  { color: "#d6d7dc", src: "/images/DS1.png" },
  { color: "#e3e3e3", src: "/images/DS2.png" },
  { color: "#21242b", src: "/images/Django.png" },
];

const slider4 = [
  { color: "#d4e3ec", src: "/images/SID QUIZ.jpg" },
  { color: "#e5e0e1", src: "/images/SID HACK.jpg" },
  { color: "#d7d4cf", src: "/images/ASSOC.jpg" },
  { color: "#e1dad6", src: "/images/pad.jpg" },
];

const Certifications = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x4 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  // useEffect hook for the mobile scroll animation
  useEffect(() => {
    const projects = document.querySelectorAll('.project');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    projects.forEach(project => {
      observer.observe(project);
    });
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Certifications | My Portfolio</title>
        <meta name="description" content="Certifications and achievements" />
      </Helmet>

      <div ref={container} className="certifications-page">
        <h1 className="section-title">Certifications</h1>

        <div className="slidingImages">
          {/* Desktop/Tablet sliders */}
          <motion.div style={{ x: x1 }} className="slider desktop-only">
            {slider1.map((project, index) => (
              <div key={index} className="project" style={{ backgroundColor: project.color }}>
                <div className="imageContainer">
                  <img src={project.src} alt={`certification-${index}`} />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div style={{ x: x2 }} className="slider desktop-only">
            {slider2.map((project, index) => (
              <div key={index} className="project" style={{ backgroundColor: project.color }}>
                <div className="imageContainer">
                  <img src={project.src} alt={`certification-${index}`} />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div style={{ x: x3 }} className="slider desktop-only">
            {slider3.map((project, index) => (
              <div key={index} className="project" style={{ backgroundColor: project.color }}>
                <div className="imageContainer">
                  <img src={project.src} alt={`certification-${index}`} />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div style={{ x: x4 }} className="slider desktop-only">
            {slider4.map((project, index) => (
              <div key={index} className="project" style={{ backgroundColor: project.color }}>
                <div className="imageContainer">
                  <img src={project.src} alt={`certification-${index}`} />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Mobile-only list */}
          <div className="mobile-only">
            {[...slider1, ...slider2, ...slider3, ...slider4].map((project, index) => (
              <div key={index} className="project" style={{ backgroundColor: project.color }}>
                <div className="imageContainer">
                  <img src={project.src} alt={`certification-${index}`} />
                </div>
              </div>
            ))}
          </div>

          <motion.div style={{ height }} className="circleContainer desktop-only">
            <div className="circle"></div>
          </motion.div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Certifications;