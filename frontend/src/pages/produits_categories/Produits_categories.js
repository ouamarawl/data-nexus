import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card_produits from "../../component/cards/Card_produits";
import "./Produits_categories.css";

function Produits_categories() {
  const { categorie } = useParams(); // 🔥 Récupérer la catégorie depuis l'URL
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Catégorie sélectionnée :", categorie); // Vérification

    fetch(`http://localhost:5050/api/produits?categorie=${categorie}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Données reçues côté React :", data); // Vérification
        setProduits(data);
      })
      .catch((error) => {
        console.error("Erreur de chargement Produits :", error);
        setProduits([]);
      })
      .finally(() => setLoading(false));
  }, [categorie]);

  return (
    <div className="Produits_categories">
      <h1>Nos Produits - {categorie}</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : produits.length > 0 ? (
        <div className="container-produits">
          {produits.length > 0 ? (
            produits.map((produit) => {
              console.log("Produit reçu :", produit);
              console.log("Images disponibles :", produit.images);

              // Conversion de la chaîne JSON en tableau
              let imagesArray = [];
              try {
                imagesArray = JSON.parse(produit.images);
              } catch (error) {
                console.error("Erreur de parsing des images :", error);
              }

              console.log("Tableau d'images après parsing :", imagesArray);

              const imageUrl =
                imagesArray.length > 0
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
                />
              );
            })
          ) : (
            <p>Aucun produit disponible.</p>
          )}
        </div>
      ) : (
        <p>Aucun produit disponible dans cette catégorie.</p>
      )}
    </div>
  );
}

export default Produits_categories;
