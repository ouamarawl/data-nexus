import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";
import Fuse from "fuse.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Searchbar() {
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/produits")
      .then((response) => response.json())
      .then((data) => setProduits(data))
      .catch((error) => console.error("Erreur de chargement :", error));
  }, []);

  const search = () => {
    const recherche = document.getElementById("input").value.trim();
    if (!recherche) return;

    const fuse = new Fuse(produits, { keys: ["titre"], threshold: 0.4 });
    const resultatsTrouves = fuse.search(recherche).map((res) => res.item);

    navigate("/Resulta_searshing", { state: { resultats: resultatsTrouves } });
  };

  return (
    <div className="search-container">
      <div className="search_bar">
        <input type="search" id="input" placeholder="Rechercher" />
        <button onClick={search}>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "rgb(35, 34, 29)" }} />
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
