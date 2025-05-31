import React from "react";
import "./cards.css";
import { Link } from "react-router-dom";

function Card_categories(props) {
  console.log("URL Image catégorie :", props.image); // 🔍 Vérifie l'URL

  return (
    <Link to={`/produits_categories/${props.titre}`}>

      <div className="card-category">
        <img
          src={props.image} // Assurer que l'URL complète est utilisée
          alt={props.titre}
          onError={(e) => {
            console.error(`Erreur de chargement de l'image : ${props.image}`);
            e.target.src =
              "https://via.placeholder.com/300x200?text=Image+Introuvable";
          }}
        />
        <h3>{props.titre}</h3>
      </div>
    </Link>
  );
}

export default Card_categories;
