import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import nexus from "../Assets/nexus.jpg";
import Searchbar from "../Searchbar/Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHouse,
  faAddressCard,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Vérifie si l'écran est petit
  const [panier, setPanier] = useState([]);
  // Met à jour la valeur isMobile lorsque la taille de l'écran change
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Charger le panier depuis le localStorage
  const loadPanier = () => {
    const storedPanier = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(storedPanier);
  };

  // Charger le panier au montage
  useEffect(() => {
    loadPanier();
  }, []);

  // Vérifier les changements du panier toutes les secondes
  useEffect(() => {
    const interval = setInterval(() => {
      const storedPanier = JSON.parse(localStorage.getItem("panier")) || [];
      if (JSON.stringify(storedPanier) !== JSON.stringify(panier)) {
        setPanier(storedPanier); // Met à jour le panier s'il y a un changement
      }
    }, 1000); // Vérifie chaque seconde

    return () => clearInterval(interval);
  }, [panier]); // Réécoute à chaque mise à jour du panier

  // Fonction pour calculer le nombre total d'articles
  const calcule_qnt = () =>
    panier.reduce((total, item) => total + (item.quantite || 1), 0);

  return (
    <div className="navbar">
       <div className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <p className="logo">
        Nexus <img src={nexus} alt="nexus" /> Shop
      </p>

      <div className="list-navbar">
        <Link to="/">
          <li>
            <FontAwesomeIcon icon={faHouse} /> Home
          </li>
        </Link>
        <Link to="/about">
          <li>
            <FontAwesomeIcon icon={faAddressCard} /> About
          </li>
        </Link>
        <Link to="/admin">
          <li>
            <FontAwesomeIcon icon={faUser} /> Admin
          </li>
        </Link>
        <Link
          to="/panier"
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => setSidebarOpen(false)}
        >
          <FontAwesomeIcon icon={faCartShopping} /> Basket{" "}
          <p style={{ marginLeft: "1px", color: "red" }}>({calcule_qnt()})</p>
        </Link>
      </div>

      {/* Affiche la barre de recherche seulement si ce n'est pas un mobile */}
      {!isMobile && <Searchbar />}

     

      {isMobile && <li style={{textdecoration: 'none'}}>
            <Link
              to="/panier"
              style={{ display: "flex", alignItems: "center" , textdecoration: 'none' }}
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon icon={faCartShopping} color="black" /> 
              <p style={{ marginLeft: "1px", color: "red" }}>
                ({calcule_qnt()})
              </p>
            </Link>
      </li> }


      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-close" onClick={() => setSidebarOpen(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>

        {/* Searchbar affichée uniquement dans la sidebar sur mobile */}
        {isMobile && (
          <div className="sidebar-search">
            <Searchbar />
          </div>
        )}

        <ul>
          <li>
            <Link to="/" onClick={() => setSidebarOpen(false)}>
              <FontAwesomeIcon icon={faHouse} /> Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setSidebarOpen(false)}>
              <FontAwesomeIcon icon={faAddressCard} /> About
            </Link>
          </li>
          <li>
            <Link to="/admin" onClick={() => setSidebarOpen(false)}>
              <FontAwesomeIcon icon={faUser} /> Admin
            </Link>
          </li>
          {/* <li>
            <Link
              to="/panier"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon icon={faCartShopping} /> Basket{" "}
              <p style={{ marginLeft: "1px", color: "red" }}>
                ({calcule_qnt()})
              </p>
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default Header;
