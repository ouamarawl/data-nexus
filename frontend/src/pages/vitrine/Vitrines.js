import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container_vitrines from "./component_vitrine/Container_vitrine/Container_vitrines";
import Vitrine_section_produits from "./component_vitrine/Vitrine_section_produits/Vitrine_section_produits";
import "./Vitrines.css";

const Vitrines = React.memo(() => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="page_vitrine">
      <h1 id="titre_detaille" style={{ marginTop: "10%" }}>Product Detail</h1>
      <Container_vitrines />
      <Vitrine_section_produits />
    </div>
  );
});

export default Vitrines;
