import React, { useEffect, useState, useCallback } from "react";
import "./Container_card_panier.css";
import Card_panier from "../../../../component/cards/Card_panier";

const Container_card_panier = () => {
  const [data, setData] = useState({ produits: [], panier: [] });

  // Charger les produits et synchroniser avec le panier
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/produits");

        if (!response.ok) {
          throw new Error(`Erreur serveur : ${response.status}`);
        }

        const produits = await response.json();

        // Vérifier que les produits sont bien un tableau
        if (!Array.isArray(produits)) {
          throw new Error("Données API invalides");
        }

        const storedPanier = JSON.parse(localStorage.getItem("panier")) || [];

        const panierMisAJour = storedPanier
          .map((item) => {
            const produitAPI = produits.find(
              (prod) => String(prod.id) === String(item.produit_id)
            );
            return produitAPI ? { ...item, prix: produitAPI.prix } : null;
          })
          .filter(Boolean);

        setData({ produits, panier: panierMisAJour });
        localStorage.setItem("panier", JSON.stringify(panierMisAJour));
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      }
    };

    fetchProduits();
  }, []);

  // Mise à jour du panier
  const mettreAJourPanier = useCallback((nouveauPanier) => {
    setData((prev) => ({ ...prev, panier: nouveauPanier }));
    localStorage.setItem("panier", JSON.stringify(nouveauPanier));
  }, []);

  // Supprimer un produit du panier
  const supprimerDuPanier = useCallback(
    (id) => {
      const nouveauPanier = data.panier.filter((item) => item.produit_id !== id);
      mettreAJourPanier(nouveauPanier);
    },
    [data.panier, mettreAJourPanier]
  );

  // Modifier la quantité
  const modifierQuantite = useCallback(
    (id, quantite) => {
      if (quantite < 1) return supprimerDuPanier(id);

      const nouveauPanier = data.panier.map((item) =>
        item.produit_id === id ? { ...item, quantite } : item
      );
      mettreAJourPanier(nouveauPanier);
    },
    [data.panier, mettreAJourPanier, supprimerDuPanier]
  );

  return (
    <div className="container-cards-panier">
      {data.panier.length === 0 ? (
        <p className="panier-vide">🛒 Votre panier est vide.</p>
      ) : (
        data.panier.map((item) => (
          <Card_panier
            key={item.produit_id}
            id={item.produit_id}
            prix={item.prix}
            disponibilite={item.en_stock}
            image={item.image_produit}
            titre={item.titre_produit}
            nbr_produits={item.quantite}
            supprimerProduit={supprimerDuPanier}
            modifierQuantite={modifierQuantite}
          />
        ))
      )}
    </div>
  );
};

export default Container_card_panier;
