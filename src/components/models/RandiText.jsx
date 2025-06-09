import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

// Individual letter component with animation
function AnimatedLetter({ 
  letter, 
  position, 
  delay, 
  isVisible, 
  onAnimationComplete 
}) {
  const meshRef = useRef();
  const [scale, setScale] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Pulsing animation time
  const pulseTime = useRef(0);
  
  useEffect(() => {
    if (isVisible && !animationStarted) {
      const timer = setTimeout(() => {
        setAnimationStarted(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay, animationStarted]);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Entrance animation
      if (animationStarted && !animationComplete) {
        const newScale = Math.min(scale + delta * 3, 1);
        const newOpacity = Math.min(opacity + delta * 4, 1);
        
        setScale(newScale);
        setOpacity(newOpacity);
        
        meshRef.current.scale.set(newScale, newScale, newScale);
        meshRef.current.material.opacity = newOpacity;
        
        if (newScale >= 1 && newOpacity >= 1) {
          setAnimationComplete(true);
          onAnimationComplete?.();
        }
      }
      
      // Pulsing glow effect
      if (animationComplete) {
        pulseTime.current += delta;
        const pulse = Math.sin(pulseTime.current * 2) * 0.3 + 0.7;
        meshRef.current.material.emissiveIntensity = pulse;
        
        // Subtle floating animation
        meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + delay) * 0.002;
      }
    }
  });
  
  // Create neon blue material with glow
  const material = new THREE.MeshPhysicalMaterial({
    color: '#00ffff',
    emissive: '#0088ff',
    emissiveIntensity: 0.5,
    roughness: 0.1,
    metalness: 0.8,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: opacity,
  });
  
  return (
    <Text3D
      ref={meshRef}
      font="/fonts/helvetiker_regular.typeface.json"
      size={0.5}
      height={0.15}
      curveSegments={32}
      bevelEnabled={true}
      bevelThickness={0.02}
      bevelSize={0.02}
      bevelOffset={0}
      bevelSegments={8}
      position={position}
      material={material}
    >
      {letter}
    </Text3D>
  );
}

// Glowing outline effect component
function GlowEffect({ children }) {
  return (
    <group>
      {/* Main text */}
      {children}
      
      {/* Glow layers */}
      <group scale={[1.05, 1.05, 1.05]}>
        {React.cloneElement(children, {
          material: new THREE.MeshBasicMaterial({
            color: '#00ddff',
            transparent: true,
            opacity: 0.3,
            side: THREE.BackSide,
          })
        })}
      </group>
      
      <group scale={[1.1, 1.1, 1.1]}>
        {React.cloneElement(children, {
          material: new THREE.MeshBasicMaterial({
            color: '#0099ff',
            transparent: true,
            opacity: 0.15,
            side: THREE.BackSide,
          })
        })}
      </group>
    </group>
  );
}

// Main RANDI component
export default function RandiText() {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const groupRef = useRef();
  
  const letters = ['R', 'A', 'N', 'D', 'I'];
  const letterSpacing = 0.6;
  const animationDelay = 300; // milliseconds between letters
  
  // Start animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Handle letter animation completion
  const handleLetterComplete = (index) => {
    if (index < letters.length - 1) {
      setTimeout(() => {
        setCurrentLetterIndex(index + 1);
      }, animationDelay);
    }
  };
  
  // Subtle group rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });
  
  return (
    <Center>
      <group ref={groupRef}>
        {/* Background glow */}
        <pointLight 
          position={[0, 0, 2]} 
          color="#00aaff" 
          intensity={2} 
          distance={10}
        />
        
        {/* Letters */}
        {letters.map((letter, index) => {
          const xPosition = (index - 2) * letterSpacing; // Center the text
          const isVisible = startAnimation && index <= currentLetterIndex;
          
          return (
            <GlowEffect key={index}>
              <AnimatedLetter
                letter={letter}
                position={[xPosition, 0, 0]}
                delay={0}
                isVisible={isVisible}
                onAnimationComplete={() => handleLetterComplete(index)}
              />
            </GlowEffect>
          );
        })}
        
        {/* Additional atmospheric lighting */}
        <spotLight
          position={[0, 3, 2]}
          angle={Math.PI / 3}
          penumbra={0.5}
          intensity={1}
          color="#00ccff"
          target-position={[0, 0, 0]}
        />
      </group>
    </Center>
  );
}