import React, { useEffect, useState } from "react";
import Card_produits from "../../../../component/cards/Card_produits";
import accessoires from "../../../../component/Assets/accessories-women.avif"; // Correction du nom
import bijoux from "../../../../component/Assets/bijoux.jpeg";
import cosmetiques from "../../../../component/Assets/cosmetiques.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";
import './Section_produits.css'

function Section_produits() {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Ajout de la gestion des erreurs

  // Initialiser AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  // Charger les produits
  useEffect(() => {
    fetch("http://localhost:5050/api/produits")
      .then((response) => {
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log("Données reçues de l'API Produits :", data);

        if (Array.isArray(data)) {
          setProduits(data);
          extractCategories(data);
        } else if (data.produits && Array.isArray(data.produits)) {
          setProduits(data.produits);
          extractCategories(data.produits);
        } else {
          throw new Error("Format de données incorrect");
        }
      })
      .catch((error) => {
        console.error("Erreur de chargement Produits :", error);
        setError("Impossible de charger les produits. Veuillez réessayer.");
        setProduits([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Fonction pour extraire les catégories et leur associer des images
  const extractCategories = (produits) => {
    const uniqueCategories = [...new Set(produits.map((p) => p.categorie))];

    console.log("Catégories trouvées :", uniqueCategories);

    const images = {
      Bijoux: bijoux,
      Cosmétiques: cosmetiques,
      Accessoires: accessoires, // Correction du nom
    };

    const categoriesWithImages = uniqueCategories.map((categorie) => ({
      id: categorie,
      titre: categorie,
      image: images[categorie] || "https://dummyimage.com/300x200/cccccc/000000&text=Aucune+Image",
    }));

    console.log("Catégories avec images :", categoriesWithImages);
    setCategories(categoriesWithImages);
  };

  return (
    <div className="section-produits" data-aos="fade-up">
      <h1>Nos Produits</h1>

      {loading ? (
        <p>Chargement des produits...</p>
      ) : error ? (
        <p className="error">{error}</p>
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
              <div key={produit.id || produit.titre} data-aos="flip-left">
                <Card_produits
                  id={produit.id}
                  titre={produit.titre}
                  image={imageUrl}
                  description={produit.description}
                  prix={produit.prix}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p>Aucun produit disponible.</p>
      )}
    </div>
  );
}

export default Section_produits;
