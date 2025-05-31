import React, { useEffect, useState, useCallback } from "react";
import Card_panier from "../../component/cards/Card_panier";
import Card_resume_panier from "../../component/cards/Card_resume_panier";
import "./Panier.css";
import Card_produits from "../../component/cards/Card_produits";
import Container_card_panier from "./component_panier/Container_card_panier/Container_card_panier";
import Container_resume_panier from "./component_panier/Container_resume_panier/Container_resume_panier";
import Panier_section_produit from "./component_panier/Panier_section_produit/Panier_section_produit";

function Panier() {
  const [produits, setProduits] = useState([]);
  const [panier, setPanier] = useState([]);

  // Charger les produits et synchroniser avec le panier
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/produits");
        if (!response.ok) throw new Error("Erreur lors de la récupération des produits");

        const data = await response.json();
        const storedPanier = JSON.parse(localStorage.getItem("panier")) || [];

        const panierMisAJour = storedPanier
          .map((item) => {
            const produitAPI = data.find((prod) => String(prod.id) === String(item.produit_id));
            return produitAPI ? { ...item, prix: parseFloat(produitAPI.prix) || 0 } : null;
          })
          .filter(Boolean);

        setProduits(data);
        setPanier(panierMisAJour);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error.message);
      }
    };

    fetchProduits();
  }, []);

  // Gérer les modifications du panier et synchroniser avec localStorage
  const mettreAJourPanier = useCallback((nouveauPanier) => {
    setPanier(nouveauPanier);
    localStorage.setItem("panier", JSON.stringify(nouveauPanier));
  }, []);

  // Ajouter un produit au panier
  const ajouterAuPanier = useCallback((produit) => {
    if (!produit || !produit.id) return;

    const nouveauPanier = [...panier, { ...produit, quantite: 1 }];
    mettreAJourPanier(nouveauPanier);
  }, [panier, mettreAJourPanier]);

  // Supprimer un produit du panier
  const supprimerDuPanier = useCallback((id) => {
    const nouveauPanier = panier.filter((item) => item.produit_id !== id);
    mettreAJourPanier(nouveauPanier);
  }, [panier, mettreAJourPanier]);

  // Modifier la quantité d’un produit dans le panier
  const modifierQuantite = useCallback((id, quantite) => {
    if (quantite < 1) {
      supprimerDuPanier(id);
      return;
    }

    const nouveauPanier = panier.map((item) =>
      item.produit_id === id ? { ...item, quantite } : item
    );
    mettreAJourPanier(nouveauPanier);
  }, [panier, mettreAJourPanier, supprimerDuPanier]);

  return (
    <div className="panier">
      <h1>Basket</h1>
      <Container_card_panier />

      <h1>Cart Summary</h1>
      <Container_resume_panier />

      <Panier_section_produit />
    </div>
  );
}

export default Panier;
