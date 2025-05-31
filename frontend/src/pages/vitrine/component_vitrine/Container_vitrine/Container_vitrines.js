import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Carousel from "../../../../component/carousel/Carousel";
import './Container_vitrines.css'

const Vitrine_section_produits = () => {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [quantite, setQuantite] = useState(1);
  const [panier, setPanier] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/produits");
        if (!response.ok) throw new Error("Problème de chargement des produits");

        const data = await response.json();
        const storedPanier = JSON.parse(localStorage.getItem("panier")) || [];

        const panierMisAJour = storedPanier
          .map((item) => {
            const produitAPI = data.find(
              (prod) => String(prod.id) === String(item.produit_id)
            );
            return produitAPI ? { ...item, prix: produitAPI.prix } : null;
          })
          .filter(Boolean);

        setPanier(panierMisAJour);
        localStorage.setItem("panier", JSON.stringify(panierMisAJour));
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchProduits();
  }, []);

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const response = await fetch(`http://localhost:5050/api/produits/${id}`);
        if (!response.ok) throw new Error("Produit introuvable");

        const data = await response.json();

        let imagesArray = [];
        try {
          imagesArray = typeof data.images === "string" ? JSON.parse(data.images) : data.images;
        } catch (error) {
          console.error("Erreur de parsing JSON des images :", error);
          imagesArray = [data.images];
        }

        setProduit({ ...data, images: imagesArray });
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    if (id) fetchProduit();
  }, [id]);

  const augmenterQuantite = () => setQuantite((prev) => prev + 1);
  const diminuerQuantite = () => setQuantite((prev) => (prev > 1 ? prev - 1 : prev));

  const ajouter_au_panier = useCallback(() => {
    if (!produit) return;

    let panierActuel = JSON.parse(localStorage.getItem("panier")) || [];

    const produit_existant = panierActuel.find((item) => String(item.produit_id) === String(id));

    if (produit_existant) {
      produit_existant.quantite += quantite;
    } else {
      panierActuel.push({
        produit_id: String(id),
        quantite,
        prix_unitaire: produit.prix ?? 0,
        date_ajout: new Date().toISOString().split("T")[0],
        image_produit: Array.isArray(produit.images) ? produit.images[0] : produit.images,
        titre_produit: produit.titre ?? "Produit inconnu",
        en_stock: produit.stock ?? 1,
      });
    }

    localStorage.setItem("panier", JSON.stringify(panierActuel));
    setPanier(panierActuel);
    alert("Produit ajouté au panier !");
  }, [id, produit, quantite]);

  if (error) return <p>Erreur : {error}</p>;
  if (!produit) return <p>Chargement...</p>;

  return (
    <div className="container_vitrine">
      <div className="images_produits">
        <Carousel images={Array.isArray(produit.images) ? produit.images : [produit.images]} />
      </div>

      <div className="achats">
        <div className="lien_ver">
          <p>
            <Link to="/">Home</Link> / <Link to="#">{produit.categorie ?? "Catégorie inconnue"}</Link> /
            <Link to="#">
              <span>{produit.titre ?? "Titre indisponible"}</span>
            </Link>
          </p>
          <h1 id="titre">{produit.titre ?? "Titre indisponible"}</h1>
          <p style={{ color: "black", fontSize: "135%" }}>
            {produit.description ?? "Description indisponible"}
          </p>
          <p id="prix">{produit.prix ? produit.prix * quantite : "Prix indisponible"} د.ج</p>
        </div>

        <p id="stock">{produit.stock ? `${produit.stock} en stock` : "Stock indisponible"}</p>

        <div className="Bouttons">
          <div className="bouttons_quontité">
            <button id="moins" onClick={diminuerQuantite}>-</button>
            <div><p id="nbr_qnt">{quantite}</p></div>
            <button id="plus" onClick={augmenterQuantite}>+</button>
          </div>
          <button onClick={ajouter_au_panier}>
            <p>Ajouter au panier</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Vitrine_section_produits);
