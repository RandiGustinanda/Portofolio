// src/components/Render.jsx
import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Render({ children ,autoRotate = true}) {
  const containerRef = useRef(null);

  // Fixed responsive canvas sizing
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // Always maintain full viewport height
        containerRef.current.style.height = `${window.innerHeight}px`;
        containerRef.current.style.width = `${window.innerWidth}px`;
      }
    };

    // Set initial size
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 3.5],
          fov: 50,
          aspect: window.innerWidth / window.innerHeight,
        }}
        style={{
          background: "transparent",
        }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor(0x000000, 0);
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
        }}
      >
        {/* Tambahan dan perubahan lighting */}
        <hemisphereLight
          skyColor="#ffffff"
          groundColor="#444444"
          intensity={1.2}
        />

        <ambientLight intensity={1.2} color="#ffffff" />

        <directionalLight
          position={[3, 5, 2]}
          intensity={1.5}
          color="#ffffff"
          castShadow
        />

        <pointLight position={[-3, -3, 4]} intensity={0.9} color="#ffffff" />

        <spotLight
          position={[0, 8, 4]}
          angle={Math.PI / 4}
          penumbra={0.4}
          intensity={1.2}
          color="#ffffff"
          castShadow
        />

        {children}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false} // atau true kalau mau bisa manual rotate juga
          minDistance={1}
          maxDistance={10}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
