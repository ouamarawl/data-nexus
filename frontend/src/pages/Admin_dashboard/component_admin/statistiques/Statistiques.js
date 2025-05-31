import React, { useState, useEffect } from "react";
import "./statistiques.css";

function Statistiques() {
  const [loadingProduits, setLoadingProduits] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState({});

  // Fonction pour charger les catégories
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/categories");
      const data = await response.json();
      setCategories(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories", error);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Fonction pour charger les produits
  const fetchProduits = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/produits");
      const data = await response.json();

      if (Array.isArray(data)) {
        setProduits(data);
      } else if (data.produits && Array.isArray(data.produits)) {
        setProduits(data.produits);
      } else {
        setProduits([]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des produits", error);
      setProduits([]);
    } finally {
      setLoadingProduits(false);
    }
  };

  // Rafraîchir les catégories chaque 1 seconde
  useEffect(() => {
    fetchCategories(); // Chargement initial
    const intervalId = setInterval(fetchCategories, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Rafraîchir les produits chaque 10 secondes
  useEffect(() => {
    fetchProduits(); // Chargement initial
    const intervalId = setInterval(fetchProduits, 10000);

    return () => clearInterval(intervalId);
  }, []);

  // Mise à jour du comptage des catégories
  useEffect(() => {
    const countCategories = produits.reduce((acc, produit) => {
      const categorie = produit.categorie?.trim().toLowerCase();
      if (categorie) {
        acc[categorie] = (acc[categorie] || 0) + 1;
      }
      return acc;
    }, {});

    setCategoriesCount(countCategories);
  }, [produits]);

  return (
    <div className="container_stat">
      <h2>Statistiques des Produits</h2>
      <div className="stat">
        {(loadingProduits || loadingCategories) ? (
          <p>Chargement des statistiques...</p>
        ) : (
          <div className="stats_grid">
            {categories.map((cat) => (
              <div key={cat.titre} className={`stat_card ${cat.titre.toLowerCase()}`}>
                <h3>{cat.titre}</h3>
                <p>{categoriesCount[cat.titre.toLowerCase()] || 0} produits</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Statistiques;
