import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function AnimateUpDown({ children }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    // Animasi naik turun y-position
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 5, ease: "power1.inOut" } });
    tl.to(ref.current.position, { y: 0.10 })
      .to(ref.current.position, { y: 0 });

    return () => {
      tl.kill();
    };
  }, []);

  // Clone children dan beri ref ke objek (mesh)
  return React.cloneElement(children, { ref });
}
