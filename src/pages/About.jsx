import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import StarryBackground from "../components/StarryBackground";
import Render from "../components/Render";

import RandiText from "../components/models/RandiText";

export default function About() {
  const contentRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    if (contentRef.current && contentRef.current.children) {
      gsap.fromTo(
        contentRef.current.children,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.3,
          delay: 1,
          ease: "power2.out",
        }
      );
    }
  }, []);

  const handleScroll = () => {
    if (infoRef.current) {
      infoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <StarryBackground>
      {/* Container untuk posisi tombol di atas canvas */}
      <div className="relative w-full h-screen">
        <Render autoRotate={false} animatedContainer={false}>
          <RandiText />
        </Render>

        {/* Tombol scroll di luar canvas */}
        <button
          onClick={handleScroll}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/80 text-black px-4 py-2 rounded-full shadow-lg hover:bg-white transition z-10"
        >
          Scroll ke Bawah
        </button>
      </div>

      {/* Informasi di bawah */}
      <div ref={infoRef} className="min-h-screen p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Informasi Tambahan</h2>
        <p>
          Ini bagian informasi setelah scroll. Tambahkan detail yang kamu mau di sini ya sayang 💕
        </p>
      </div>
    </StarryBackground>
  );
}
