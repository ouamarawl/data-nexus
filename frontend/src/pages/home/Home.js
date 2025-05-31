import React, { useEffect } from "react";
import AOS from "aos";

// Composants
import Section_categories from "./component-home/section_categories/Section_categories";
import Section_produits from "./component-home/section_produits/Section_produits";

// Styles
import "./Home.css";

function Home() {
  // Initialisation AOS (vérifie si window est défini pour éviter les erreurs SSR)
  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init({
        duration: 1000,
        once: true,
        easing: "ease-in-out",
      });
    }
  }, []);

  return (
    <div className="Home">
      <Section_categories />
      <Section_produits />
    </div>
  );
}

export default Home;
