import React from "react";
import "./cards.css";
import { useNavigate } from "react-router-dom";

function Card_resume_panier({ nombreProduits, prixTotal }) {
  const navigate = useNavigate(); // ✅ Utilisation du hook de navigation

  return (
    <div className="container-card-resume-panier">
      <p>Number of products: {nombreProduits}</p>
      <hr />
      <div className="prix-totale">
        <p>Total price:</p>
        <p>{prixTotal.toFixed(2)} DA</p> {/* ✅ Sécurisation de l'affichage des nombres */}
      </div>
      <hr />
      <div className='achter'>
        <button onClick={() => navigate("/formulaire_commandes")}>
          <p>Buy</p>
        </button>
      </div>
    </div>
  );
}

export default Card_resume_panier;
