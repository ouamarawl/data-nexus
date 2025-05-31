import React, { useEffect, useState, useCallback } from "react";
import Card_resume_panier from "../../../../component/cards/Card_resume_panier";
import "./Container_resume_panier.css";

function Container_resume_panier() {
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

  return (
    <div className="container-cards-resume-panier">
      <Card_resume_panier
        nombreProduits={panier.reduce((total, p) => total + p.quantite, 0)}
        prixTotal={panier.reduce((total, p) => total + p.quantite * parseFloat(p.prix || 0), 0)}
      />
    </div>
  );
}

export default Container_resume_panier;