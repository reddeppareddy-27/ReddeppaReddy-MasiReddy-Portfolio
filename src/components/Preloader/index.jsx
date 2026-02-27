import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { opacity, slideUp } from './anim';
import './style.css';

const words = ["Hello", "Welcome", "Bonjour", "Hola"];

const pageNames = {
  "/": "Home",
  "/about": "About",
  "/portfolio": "Portfolio",
  "/certification": "Certifications",
  "/contact": "Contact"
};

export const Preloader = ({ isLoading, setIsLoading, currentPath }) => {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    
    const displayWords = [...words, pageNames[currentPath] || "Home"];

    useEffect(() => {
        // Reset index when page changes
        setIndex(0);
    }, [currentPath]);

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
        
        const handleResize = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight });
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (index === displayWords.length - 1) {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
            return;
        }
        
        const timeout = setTimeout(() => {
            setIndex(index + 1);
        }, index === 0 ? 1000 : 150);
        
        return () => clearTimeout(timeout);
    }, [index, setIsLoading, displayWords.length]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    };

    if (!isLoading) return null;

    return (
        <motion.div 
            className="preloader__wrapper"
            variants={slideUp} 
            initial="initial" 
            exit="exit"
        >
            {dimension.width > 0 && (
                <>
                    <motion.div 
                        className="preloader__text"
                        variants={opacity} 
                        initial="initial" 
                        animate="enter"
                        key={`text-${index}`}
                    >
                        <span className="preloader__dot"></span>
                        <p className={index === displayWords.length - 1 ? "page-name" : ""}>
                            {displayWords[index]}
                        </p>
                    </motion.div>
                    <svg>
                        <motion.path 
                            variants={curve} 
                            initial="initial" 
                            exit="exit"
                        ></motion.path>
                    </svg>
                </>
            )}
        </motion.div>
    );
};
