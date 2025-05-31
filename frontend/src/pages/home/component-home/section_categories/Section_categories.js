import React, { useEffect, useState } from "react";
import Card_categories from "../../../../component/cards/Card_categories";
import AOS from "aos";
import "aos/dist/aos.css";
import './Section_categorie.css';

const Section_categories = () => {
  const [categories, setCategories] = useState([]);
  const [produits, setProduits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Initialisation AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  // Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/categories");
        const result = await response.json();
        setCategories(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Erreur de chargement des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  // Charger les produits liés à la catégorie sélectionnée
  useEffect(() => {
    if (!selectedCategory) return; // Ne charge pas si aucune catégorie n'est sélectionnée

    const fetchProduits = async () => {
      try {
        const response = await fetch(`http://localhost:5050/api/produits?categorie=${selectedCategory}`);
        const result = await response.json();
        setProduits(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Erreur de chargement des produits :", error);
      }
    };

    fetchProduits();
  }, [selectedCategory]);

  return (
    <div className="section-categories" data-aos="fade-up">
      <h1>Catégories</h1>
      <div className="container-categories">
        {categories.map((categorie) => (
          <div 
            key={categorie.id} 
            data-aos="zoom-in"
            onClick={() => setSelectedCategory(categorie.titre)} // Sélectionne la catégorie
            style={{ cursor: "pointer" }} // Indique que c'est cliquable
          >
            <Card_categories titre={categorie.titre} image={categorie.image} />
          </div>
        ))}
      </div>

      {/* Afficher les produits de la catégorie sélectionnée */}
      {selectedCategory && (
        <div className="container-produits">
          <h2>Produits de la catégorie : {selectedCategory}</h2>
          {produits.length > 0 ? (
            produits.map((produit) => (
              <div key={produit.id} className="produit-card">
                <img src={produit.image} alt={produit.nom} />
                <p>{produit.nom}</p>
                <p>Prix : {produit.prix} DA</p>
              </div>
            ))
          ) : (
            <p>Aucun produit trouvé pour cette catégorie.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Section_categories;
