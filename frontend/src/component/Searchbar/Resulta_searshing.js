import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card_produits from "../cards/Card_produits";
import "./Searchbar.css"; // Vérifie que ce fichier existe
import AOS from "aos";
import "aos/dist/aos.css";

function Resulta_searshing() {
  const location = useLocation();
  const navigate = useNavigate();
  const resultats = location.state?.resultats || []; // Evite une erreur si undefined
  const [produits, setProduits] = useState(resultats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location.state?.resultats) {
      console.warn("⚠ Aucun résultat trouvé, retour à la page d'accueil...");
      navigate("/");
      return;
    }

    setProduits(resultats);
    setLoading(false);
  }, [location, navigate]);

  return (
    <div className="resultats">
      <h1 style={{ marginBottom: "4%" }}>Résultats de la recherche</h1>
      <div className="section-produits" data-aos="fade-up">
        <h2>Nos Produits</h2>
        {loading ? (
          <p>Chargement des produits...</p>
        ) : produits.length > 0 ? (
          <div className="container-produits">
            {produits.map((produit) => {
              let imagesArray = [];
              try {
                imagesArray = produit.images ? JSON.parse(produit.images) : [];
              } catch (error) {
                console.error("Erreur de parsing des images :", error);
              }

              const imageUrl =
                imagesArray.length > 0
                  ? imagesArray[0]
                  : "https://dummyimage.com/300x200/cccccc/000000&text=Aucune+Image";

              return (
                <Card_produits
                  key={produit.id || produit.titre}
                  id={produit.id}
                  titre={produit.titre}
                  image={imageUrl}
                  description={produit.description}
                  prix={produit.prix}
                />
              );
            })}
          </div>
        ) : (
          <p>Aucun produit disponible.</p>
        )}
      </div>
    </div>
  );
}

export default Resulta_searshing;
