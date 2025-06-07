// src/pages/Home.jsx
import React from "react";
import StarryBackground from "../components/StarryBackground";
import Render from "../components/Render";
import ModelHero from "../components/models/ModelHero";
import AnimateUpDown from "../components/AnimateUpDown";
import ConstellationButtons from "../components/ConstellationButtons";

export default function Home() {
  return (
    <StarryBackground>
      <ConstellationButtons />
      <Render>
        <AnimateUpDown>
          <ModelHero />
        </AnimateUpDown>
      </Render>
    </StarryBackground>
  );
}