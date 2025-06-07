// src/pages/Home.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import Render from "../components/Render";
import ModelHero from "../components/models/ModelHero";
import AnimateUpDown from "../components/AnimateUpDown";
import ConstellationButtons from "../components/ConstellationButtons";

export default function Home() {
  const sparkleRef = useRef(null);
  const shootingStarsRef = useRef(null);
  const constellationsRef = useRef(null);
  const geometryRef = useRef(null);
 
  useEffect(() => {
    // Constellation patterns (simplified real constellations)
    const constellations = [
      // Ursa Major (Big Dipper)
      {
        name: "Ursa Major",
        stars: [
          { x: 15, y: 20 },
          { x: 25, y: 18 },
          { x: 35, y: 22 },
          { x: 45, y: 25 },
          { x: 50, y: 35 },
          { x: 42, y: 40 },
          { x: 32, y: 38 },
        ],
      },
      // Orion
      {
        name: "Orion",
        stars: [
          { x: 70, y: 30 },
          { x: 75, y: 25 },
          { x: 80, y: 35 },
          { x: 72, y: 45 },
          { x: 78, y: 50 },
          { x: 74, y: 55 },
          { x: 76, y: 60 },
        ],
      },
      // Cassiopeia
      {
        name: "Cassiopeia",
        stars: [
          { x: 85, y: 15 },
          { x: 90, y: 12 },
          { x: 95, y: 18 },
          { x: 88, y: 25 },
          { x: 92, y: 30 },
        ],
      },
    ];

    // Create sparkling stars background
    const createSparkles = () => {
      const sparkleContainer = sparkleRef.current;
      if (!sparkleContainer) return;

      sparkleContainer.innerHTML = "";
      const starCount = Math.min(
        200,
        Math.floor((window.innerWidth * window.innerHeight) / 6000)
      );

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.className = "sparkle-star";

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 0.5;
        const opacity = Math.random() * 0.8 + 0.2;
        const delay = Math.random() * 4;
        const duration = Math.random() * 3 + 2;

        star.style.cssText = `
          position: absolute;
          left: ${x}%;
          top: ${y}%;
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle, #ffffff 0%, #87ceeb 40%, #4169e1 70%, transparent 100%);
          border-radius: 50%;
          opacity: ${opacity};
          animation: sparkle ${duration}s ${delay}s infinite ease-in-out alternate;
          box-shadow: 0 0 ${size * 3}px rgba(135, 206, 235, 0.6);
        `;

        sparkleContainer.appendChild(star);
      }
    };

    // Create shooting stars
    const createShootingStars = () => {
      const shootingContainer = shootingStarsRef.current;
      if (!shootingContainer) return;

      const createShootingStar = () => {
        const star = document.createElement("div");
        star.className = "shooting-star";

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * (window.innerHeight * 0.3);
        const angle = Math.random() * 60 + 15; // 15-75 degrees
        const speed = Math.random() * 3 + 2; // 2-5 seconds
        const length = Math.random() * 100 + 50;

        star.style.cssText = `
          position: absolute;
          left: ${startX}px;
          top: ${startY}px;
          width: ${length}px;
          height: 2px;
          background: linear-gradient(90deg, 
            rgba(255,255,255,0) 0%, 
            rgba(135,206,235,0.8) 20%, 
            rgba(255,255,255,1) 60%, 
            rgba(135,206,235,0.4) 80%, 
            rgba(255,255,255,0) 100%);
          border-radius: 2px;
          transform: rotate(${angle}deg);
          animation: shoot ${speed}s linear forwards;
          box-shadow: 0 0 10px rgba(135, 206, 235, 0.8);
        `;

        shootingContainer.appendChild(star);

        setTimeout(() => {
          if (star.parentNode) {
            star.parentNode.removeChild(star);
          }
        }, speed * 1000);
      };

      // Create shooting stars periodically
      const shootingInterval = setInterval(() => {
        if (Math.random() < 0.3) {
          // 30% chance every interval
          createShootingStar();
        }
      }, 2000);

      return shootingInterval;
    };

    // Create constellations
    const createConstellations = () => {
      const constellationContainer = constellationsRef.current;
      if (!constellationContainer) return;

      constellationContainer.innerHTML = "";

      constellations.forEach((constellation, index) => {
        const group = document.createElement("div");
        group.className = "constellation-group";
        group.style.position = "absolute";
        group.style.width = "100%";
        group.style.height = "100%";

        // Create stars
        constellation.stars.forEach((starPos, starIndex) => {
          const star = document.createElement("div");
          star.className = "constellation-star";
          star.style.cssText = `
            position: absolute;
            left: ${starPos.x}%;
            top: ${starPos.y}%;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #ffffff 0%, #87ceeb 60%, transparent 100%);
            border-radius: 50%;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
            animation: constellationTwinkle ${3 + Math.random() * 2}s ${
            Math.random() * 2
          }s infinite ease-in-out alternate;
          `;
          group.appendChild(star);
        });

        // Create connecting lines
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.3;
        `;

        for (let i = 0; i < constellation.stars.length - 1; i++) {
          const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line.setAttribute("x1", `${constellation.stars[i].x}%`);
          line.setAttribute("y1", `${constellation.stars[i].y}%`);
          line.setAttribute("x2", `${constellation.stars[i + 1].x}%`);
          line.setAttribute("y2", `${constellation.stars[i + 1].y}%`);
          line.setAttribute("stroke", "#87ceeb");
          line.setAttribute("stroke-width", "0.5");
          line.style.animation = `fadeInOut ${4 + Math.random() * 2}s ${
            Math.random() * 3
          }s infinite ease-in-out alternate`;
          svg.appendChild(line);
        }

        group.appendChild(svg);
        constellationContainer.appendChild(group);
      });
    };

    // Create floating geometry
    const createGeometry = () => {
      const geometryContainer = geometryRef.current;
      if (!geometryContainer) return;

      geometryContainer.innerHTML = "";

      const shapes = ["triangle", "square", "pentagon", "hexagon", "circle"];
      const shapeCount = 8;

      for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement("div");
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        shape.className = `geometry-shape geometry-${shapeType}`;

        const size = Math.random() * 30 + 20;
        const x = Math.random() * 90 + 5;
        const y = Math.random() * 90 + 5;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;

        shape.style.cssText = `
          position: absolute;
          left: ${x}%;
          top: ${y}%;
          width: ${size}px;
          height: ${size}px;
          transform: rotate(${rotation}deg);
          animation: geometryFloat ${duration}s ${delay}s infinite linear;
          opacity: 0.1;
          border: 1px solid rgba(135, 206, 235, 0.3);
          background: rgba(65, 105, 225, 0.05);
        `;

        // Shape-specific styling
        if (shapeType === "circle") {
          shape.style.borderRadius = "50%";
        } else if (shapeType === "triangle") {
          shape.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
        } else if (shapeType === "pentagon") {
          shape.style.clipPath =
            "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)";
        } else if (shapeType === "hexagon") {
          shape.style.clipPath =
            "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)";
        }

        geometryContainer.appendChild(shape);
      }
    };

    // Initialize all elements
    createSparkles();
    createConstellations();
    createGeometry();
    const shootingInterval = createShootingStars();

    // Handle resize
    const handleResize = () => {
      createSparkles();
      createGeometry();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (shootingInterval) clearInterval(shootingInterval);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Blue gradient background - fixed */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 z-0"></div>

      {/* Sparkling stars overlay - fixed */}
      <div
        ref={sparkleRef}
        className="fixed inset-0 z-10 pointer-events-none"
      ></div>

      {/* Shooting stars overlay - fixed */}
      <div
        ref={shootingStarsRef}
        className="fixed inset-0 z-15 pointer-events-none"
      ></div>

      {/* Constellations overlay - fixed */}
      <div
        ref={constellationsRef}
        className="fixed inset-0 z-20 pointer-events-none"
      ></div>

      {/* Floating geometry overlay - fixed */}
      <div
        ref={geometryRef}
        className="fixed inset-0 z-25 pointer-events-none"
      ></div>

      {/* Additional atmospheric effects - fixed */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-900/20 to-blue-950/40"></div>
        <div className="floating-orb floating-orb-1"></div>
        <div className="floating-orb floating-orb-2"></div>
        <div className="floating-orb floating-orb-3"></div>
      </div>

      {/* Content layer */}
      <ConstellationButtons />

      <Render>
        <AnimateUpDown>
          <ModelHero />
        </AnimateUpDown>
      </Render>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes sparkle {
          0% {
            opacity: 0.2;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
          100% {
            opacity: 0.3;
            transform: scale(0.8) rotate(360deg);
          }
        }

        @keyframes shoot {
          0% {
            transform: translateX(0) translateY(0) rotate(var(--angle));
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px) rotate(var(--angle));
            opacity: 0;
          }
        }

        @keyframes constellationTwinkle {
          0% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0.2;
          }
        }

        @keyframes geometryFloat {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg) scale(1);
            opacity: 0.1;
          }
          25% {
            transform: translateX(20px) translateY(-30px) rotate(90deg)
              scale(1.1);
            opacity: 0.2;
          }
          50% {
            transform: translateX(-10px) translateY(-60px) rotate(180deg)
              scale(0.9);
            opacity: 0.15;
          }
          75% {
            transform: translateX(-30px) translateY(-30px) rotate(270deg)
              scale(1.05);
            opacity: 0.18;
          }
          100% {
            transform: translateX(0) translateY(0) rotate(360deg) scale(1);
            opacity: 0.1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) translateX(-10px);
            opacity: 0.7;
          }
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(135, 206, 235, 0.3) 0%,
            rgba(65, 105, 225, 0.1) 70%,
            transparent 100%
          );
          animation: float 8s ease-in-out infinite;
        }

        .floating-orb-1 {
          width: 200px;
          height: 200px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
          animation-duration: 12s;
        }

        .floating-orb-2 {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 15%;
          animation-delay: -4s;
          animation-duration: 10s;
        }

        .floating-orb-3 {
          width: 100px;
          height: 100px;
          bottom: 30%;
          left: 50%;
          animation-delay: -8s;
          animation-duration: 14s;
        }

        .shooting-star {
          filter: blur(1px);
        }

        .constellation-star {
          z-index: 25;
        }

        .geometry-shape {
          backdrop-filter: blur(1px);
          transition: all 0.3s ease;
        }

        .geometry-shape:hover {
          opacity: 0.3 !important;
          transform: scale(1.2) !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .sparkle-star {
            animation-duration: 2s !important;
          }
          .floating-orb {
            animation-duration: 6s !important;
          }
          .geometry-shape {
            animation-duration: 10s !important;
          }
        }

        /* Custom gradient utilities */
        .bg-gradient-radial {
          background: radial-gradient(
            ellipse at center,
            var(--tw-gradient-stops)
          );
        }
      `}</style>
    </main>
  );
}
