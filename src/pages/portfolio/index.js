import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import { motion } from "framer-motion";
import gsap from "gsap";

export const Portfolio = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [viewType, setViewType] = useState("list"); // "list" or "grid"
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const closeTimeoutRef = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);

  useEffect(() => {
    // Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    // Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });

    // Cleanup timeout on unmount
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
  };

  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    
    if (active) {
      // Clear any pending close timeout when entering
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      setModal({ active, index });
    } else {
      // Add significant delay before closing for stable hover
      closeTimeoutRef.current = setTimeout(() => {
        setModal({ active: false, index });
      }, 200);
    }
  };

  const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: {
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] },
    },
  };

  const projectVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
  };

  const handleCursorClick = () => {
    if (dataportfolio[index]?.link) {
      window.open(dataportfolio[index].link, "_blank");
    }
  };

  // Filter portfolio based on selected category
  const filteredPortfolio = selectedCategory === "all" 
    ? dataportfolio 
    : dataportfolio.filter(item => item.category === selectedCategory);

  // Get unique categories
  const categories = ["all", ...new Set(dataportfolio.map(item => item.category))];
  const categoryLabels = {
    all: "All",
    web: "Web Development",
    analytics: "Data Analytics"
  };

  return (
    <HelmetProvider>
      <Container
        className="About-header po_container"
        onMouseMove={(e) => {
          moveItems(e.clientX, e.clientY);
        }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title> Projects | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="12">
            <div className="projects-header">
              <h1 className="display-4"> Projects </h1>
              <div className="view-toggle">
                <button 
                  className={`toggle-btn list-btn ${viewType === 'list' ? 'active' : ''}`}
                  onClick={() => setViewType('list')}
                  title="List View"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <button 
                  className={`toggle-btn grid-btn ${viewType === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewType('grid')}
                  title="Grid View"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        {/* Category Filter Buttons */}
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {categoryLabels[category] || category}
            </button>
          ))}
        </div>

        {/* Projects View */}
        {viewType === "list" ? (
          <div className="projects-list">
            {/* Table Header */}
            <div className="projects-table-header">
              <div className="table-col-client">CLIENT</div>
              <div className="table-col-location">LOCATION</div>
              <div className="table-col-services">SERVICES</div>
              <div className="table-col-year">YEAR</div>
            </div>
            
            {/* Table Rows */}
            {filteredPortfolio.map((data, i) => {
              return (
                <motion.div
                  key={i}
                  className="project-item"
                  variants={projectVariants}
                  initial="initial"
                  animate="animate"
                  onMouseEnter={(e) => {
                    manageModal(true, i, e.clientX, e.clientY);
                  }}
                  onMouseLeave={(e) => {
                    manageModal(false, i, e.clientX, e.clientY);
                  }}
                >
                  <div className="table-col-client">{data.description}</div>
                  <div className="table-col-location">{data.location}</div>
                  <div className="table-col-services">{data.services}</div>
                  <div className="table-col-year">{data.year}</div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="projects-grid">
            {filteredPortfolio.map((data, i) => {
              return (
                <motion.div
                  key={i}
                  className="project-grid-item"
                  variants={projectVariants}
                  initial="initial"
                  animate="animate"
                  onMouseEnter={(e) => {
                    manageModal(true, i, e.clientX, e.clientY);
                  }}
                  onMouseLeave={(e) => {
                    manageModal(false, i, e.clientX, e.clientY);
                  }}
                >
                  <div className="grid-item-image">
                    <img src={data.img} alt={data.description} />
                  </div>
                  <div className="grid-item-content">
                    <h3>{data.description}</h3>
                    <p>{data.services}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Custom cursor - Clickable */}
        <motion.div
          ref={cursor}
          className="cursor"
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          onClick={handleCursorClick}
          style={{ cursor: active ? "pointer" : "default" }}
        >
          View
        </motion.div>

        {/* Modal preview */}
        <motion.div
          ref={modalContainer}
          className="modal-container"
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        >
          {dataportfolio[index] && (
            <div className="modal-preview">
              <img src={dataportfolio[index].img} alt="" />
            </div>
          )}
        </motion.div>
      </Container>
    </HelmetProvider>
  );
};
