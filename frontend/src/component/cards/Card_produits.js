import React from "react";
import { Link } from "react-router-dom";

function Card_produits({ id, titre, image, description, prix }) {
  return (
    <Link to={`/vitrine/${id}#titre_detaille`} className="card-link">
      <div className="card-produit">
        <h3>{titre}</h3>
        <img
          src={image}
          alt={`Image du produit: ${titre}`}
          onError={(e) => {
            e.target.src =
              "https://dummyimage.com/300x200/cccccc/000000&text=Image+Introuvable";
          }}
          className="card-image"
        />
        <p>{description}</p>
        <p className="prix">{prix} DA</p>
        <p className="voir-produit">Voir le produit</p>
      </div>
    </Link>
  );
}

export default Card_produits;
