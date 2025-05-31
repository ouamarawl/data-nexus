import './Panier_section_produit.css';
import React, { useEffect, useState, useCallback } from "react";
import Card_produits from "../../../../component/cards/Card_produits";

function Panier_section_produit() {
  const [produits, setProduits] = useState([]);
  const [panier, setPanier] = useState([]);

  // Charger les produits et synchroniser avec le panier
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/produits", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Échec du chargement des produits");

        const data = await response.json();
        const storedPanier = JSON.parse(localStorage.getItem("panier")) || [];

        const panierMisAJour = storedPanier
          .map(item => {
            const produitAPI = data.find(prod => String(prod.id) === String(item.produit_id));
            return produitAPI ? { ...item, prix: produitAPI.prix } : null;
          })
          .filter(Boolean);

        setProduits(data);
        setPanier(panierMisAJour);
        localStorage.setItem("panier", JSON.stringify(panierMisAJour));
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      }
    };

    fetchProduits();
  }, []);

  // Gérer les modifications du panier et synchroniser avec localStorage
  const mettreAJourPanier = useCallback((nouveauPanier) => {
    setPanier(prevPanier => {
      const updatedPanier = [...nouveauPanier];
      localStorage.setItem("panier", JSON.stringify(updatedPanier));
      return updatedPanier;
    });
  }, []);

  // Ajouter un produit
  const ajouterAuPanier = useCallback((produit) => {
    setPanier(prevPanier => {
      const nouveauPanier = [...prevPanier, { ...produit, quantite: 1 }];
      localStorage.setItem("panier", JSON.stringify(nouveauPanier));
      return nouveauPanier;
    });
  }, []);

  return (
    <div className="panier-section-produits">
      <h1>Continue Shopping</h1>
      <div className="container-produits">
        {produits.length > 0 ? (
          produits.map((produit) => {
            let imagesArray = [];
            try {
              imagesArray = Array.isArray(produit.images) 
                ? produit.images 
                : JSON.parse(produit.images || "[]");
            } catch (error) {
              console.error("Erreur de parsing des images :", error);
            }

            const imageUrl = imagesArray.length > 0 
              ? imagesArray[0] 
              : "https://dummyimage.com/300x200/cccccc/000000&text=Aucune+Image";

            return (
              <Card_produits
                key={produit.id}
                id={produit.id}
                titre={produit.titre}
                image={imageUrl}
                description={produit.description}
                prix={produit.prix}
                ajouterAuPanier={() => ajouterAuPanier(produit)}
              />
            );
          })
        ) : (
          <p>Aucun produit disponible.</p>
        )}
      </div>
    </div>
  );
}

export default Panier_section_produit;
