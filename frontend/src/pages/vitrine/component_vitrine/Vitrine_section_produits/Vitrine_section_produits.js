import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card_produits from "../../../../component/cards/Card_produits";
import './Vitrine_section_produits.css';

function Container_vitrines() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/produits");
        const data = await response.json();
        setProduits(data);

        // Trouver le produit actuel
        const produitSelectionne = data.find((prod) => String(prod.id) === String(id));
        if (produitSelectionne) {
          setProduit({
            ...produitSelectionne,
            images: parseImages(produitSelectionne.images),
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      }
    };

    fetchProduits();
  }, [id]);

  const parseImages = (images) => {
    try {
      return typeof images === "string" ? JSON.parse(images) : images || [];
    } catch (error) {
      console.error("Erreur de parsing JSON des images :", error);
      return [];
    }
  };

  if (!produit) {
    return <p>Chargement...</p>;
  }

  // 🔥 Filtrer les produits de la même catégorie (exclure le produit actuel)
  const produitsSimilaires = produits.filter(
    (p) => p.categorie === produit.categorie && String(p.id) !== String(id)
  );

  return (
    <div className="vitrine-section-produits">
      <h1 style={{ marginTop: "5%", marginBottom: "4%" }}>Continue Shopping</h1>
      <div className="container-produits">
        {produitsSimilaires.length > 0 ? (
          produitsSimilaires.map((prod) => (
            <Card_produits
              key={prod.id}
              id={prod.id}
              titre={prod.titre}
              image={parseImages(prod.images)[0] || "https://dummyimage.com/300x200/cccccc/000000&text=Aucune+Image"}
              description={prod.description}
              prix={prod.prix}
            />
          ))
        ) : (
          <p>Aucun produit similaire disponible.</p>
        )}
      </div>
    </div>
  );
}

export default Container_vitrines;
