import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./cards.css";

function CardPanier({ id, image, titre, disponibilite, prix, nbr_produits, modifierQuantite, supprimerProduit }) {
  const [quantite, setQuantite] = useState(nbr_produits);

  const mettreAJourPanier = (nouvelleQuantite) => {
    if (nouvelleQuantite < 1) return;
    setQuantite(nouvelleQuantite);
    modifierQuantite(id, nouvelleQuantite);
  };

  return (
    <div className="container-card-panier">
      <div className="classe-superieur">
        <div className="partie-L">
          <img src={image} alt={titre} className="image-produit" />
          <div className="enfant-l">
            <Link to="/vitrines" className="titre">
              <p>{titre}</p>
            </Link>
            <p className="disponibilite">{disponibilite ? "in stock" : "Stock unavailable"}</p>
            <h3 className="logo">Nexus Shop</h3>
          </div>
        </div>
        <div className="partie-R">
          <p className="prix">{quantite * prix} DA</p>
        </div>
      </div>

      <div className="classe-inferieur">
        <button className="supprimer" onClick={() => supprimerProduit(id)}>🗑 Delete</button>
        <div className="button-dajout">
          <button id="moins" onClick={() => mettreAJourPanier(quantite - 1)}>-</button>
          <p id="nbr_qnt">{quantite}</p>
          <button id="plus" onClick={() => mettreAJourPanier(quantite + 1)}>+</button>
        </div>
      </div>
    </div>
  );
}

export default CardPanier;