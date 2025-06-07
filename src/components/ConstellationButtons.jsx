import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

import {
  FaStar,
  FaRocket,
  FaMoon,
  FaSatellite,
  FaMeteor,
  FaGalacticRepublic,
} from "react-icons/fa";

export default function ConstellationButtons() {
  const [buttons, setButtons] = useState([]);
  const [connections, setConnections] = useState([]);
  const lineRef = useRef(null);
  const navigate = useNavigate();
  // Ikon untuk setiap button
  const icons = [
    <FaStar className="text-yellow-300 text-xl" />,
    <FaRocket className="text-blue-400 text-xl" />,
    <FaMoon className="text-gray-200 text-xl" />,
    <FaSatellite className="text-purple-400 text-xl" />,
    <FaMeteor className="text-orange-400 text-xl" />,
    <FaGalacticRepublic className="text-green-400 text-xl" />,
  ];

  // Generate posisi acak untuk button
  const generateRandomPositions = () => {
    const routes = [
      "/about",
      "/projects",
      "/skills",
      "/experience",
      "/contact",
      "/certificates",
    ];

    const newButtons = [];
    for (let i = 0; i < 6; i++) {
      const x = 10 + Math.random() * 80;
      const y = 10 + Math.random() * 80;
      newButtons.push({
        id: i,
        x,
        y,
        icon: icons[i],
        route: routes[i], // 👈 tambahkan route di sini
      });
    }
    return newButtons;
  };

  // Generate koneksi antar button
  const generateConnections = (buttons) => {
    const newConnections = [];
    // Pastikan setiap button terhubung minimal dengan satu button lain
    const connected = new Set();

    // Buat koneksi acak
    for (let i = 0; i < buttons.length; i++) {
      // Setiap button terhubung dengan 1-3 button lainnya
      const numConnections = Math.floor(Math.random() * 2) + 1;
      const possibleTargets = [...Array(buttons.length).keys()].filter(
        (j) => j !== i && !connected.has(`${Math.min(i, j)}-${Math.max(i, j)}`)
      );

      // Acak target
      for (let k = 0; k < numConnections && possibleTargets.length > 0; k++) {
        const targetIndex = Math.floor(Math.random() * possibleTargets.length);
        const j = possibleTargets.splice(targetIndex, 1)[0];

        // Tambahkan koneksi
        newConnections.push({
          id: `${i}-${j}`,
          source: buttons[i],
          target: buttons[j],
          distance: Math.hypot(
            buttons[i].x - buttons[j].x,
            buttons[i].y - buttons[j].y
          ),
        });

        // Tandai koneksi ini sudah dibuat
        connected.add(`${Math.min(i, j)}-${Math.max(i, j)}`);
      }
    }

    return newConnections;
  };

  // Inisialisasi button dan koneksi
  useEffect(() => {
    const newButtons = generateRandomPositions();
    setButtons(newButtons);
    setConnections(generateConnections(newButtons));
  }, []);

  // Animasi garis
  useEffect(() => {
    if (!lineRef.current || connections.length === 0) return;

    // Animasi garis muncul
    gsap.fromTo(
      lineRef.current.children,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 0.6,
        scale: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5,
      }
    );

    // Animasi garis berkedip
    connections.forEach((conn, i) => {
      gsap.to(lineRef.current.children[i], {
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1,
      });
    });
  }, [connections]);

  // Animasi button
  useEffect(() => {
    if (buttons.length === 0) return;

    // Animasi button muncul
    gsap.fromTo(
      ".constellation-btn",
      { opacity: 0, scale: 0, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "elastic.out(1, 0.5)",
        delay: 0.3,
      }
    );

    // Animasi button berdenyut
    buttons.forEach((_, i) => {
      gsap.to(`.btn-${i}`, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });
  }, [buttons]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950">
      {/* Background bintang */}
      <div className="absolute inset-0">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Container utama */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Garis penghubung */}
        <svg
          ref={lineRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {connections.map((conn) => (
            <line
              key={conn.id}
              x1={conn.source.x}
              y1={conn.source.y}
              x2={conn.target.x}
              y2={conn.target.y}
              stroke="#87ceeb"
              strokeWidth="0.5"
              strokeDasharray="2,3"
              opacity="0.6"
            />
          ))}
        </svg>

        {/* Button */}
        <div className="relative w-full h-full">
          {buttons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => navigate(btn.route)} // 👈 navigate ke route terkait
              className={`constellation-btn btn-${btn.id} absolute flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-800 shadow-lg border border-blue-400 hover:from-blue-500 hover:to-indigo-700 transition-all duration-300 z-10`}
              style={{
                left: `${btn.x}%`,
                top: `${btn.y}%`,
                transform: "translate(-50%, -50%)",
                width: "60px",
                height: "60px",
                boxShadow: "0 0 15px rgba(135, 206, 235, 0.7)",
              }}
            >
              {btn.icon}
            </button>
          ))}
        </div>

        <div className="absolute bottom-10 left-0 right-0 text-center text-blue-200 text-sm">
          Press the constellation button to explore the portfolio in more
          detail.
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        .constellation-btn:hover {
          transform: translate(-50%, -50%) scale(1.15) !important;
          box-shadow: 0 0 25px rgba(135, 206, 235, 0.9) !important;
          z-index: 20 !important;
        }
      `}</style>
    </div>
  );
}
