import React, { useEffect, useState } from "react";
import "./Gestion_categories.css";

const API_URL = "http://localhost:5050/api/categories";

const Gestion_categories = () => {
  const [categories, setCategories] = useState([]);
  const [titre, setTitre] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erreur lors du chargement des catégories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const ajouterCategorie = async () => {
    if (!titre || !image) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const formData = new FormData();
    formData.append("images", image);

    try {
      const uploadResponse = await fetch("http://localhost:5050/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error("Erreur lors de l'upload de l'image");
      const uploadData = await uploadResponse.json();
      const imageUrl = `http://localhost:5050${uploadData.imageUrls[0]}`;



      const categoryResponse = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titre, image: imageUrl }),
      });

      if (!categoryResponse.ok) throw new Error("Erreur lors de l'ajout de la catégorie");

      const newCategory = await categoryResponse.json();
      setCategories([...categories, newCategory]);
      setTitre("");
      setImage(null);
      alert("Catégorie ajoutée avec succès !");
    } catch (error) {
      console.error("❌ Erreur :", error.message);
    }
  };

  const supprimerCategorie = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression");
      setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const modifierCategorie = async () => {
    if (!editId || titre.trim() === "") {
      alert("Veuillez sélectionner une catégorie à modifier !");
      return;
    }

    const formData = new FormData();
    formData.append("titre", titre);
    if (image && typeof image !== "string") {
      formData.append("image", image); // Ajout de l'image seulement si elle est modifiée
    }

    try {
      const response = await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        body: formData, // Envoi sous format FormData
      });

      if (!response.ok) throw new Error("Erreur lors de la modification");

      setCategories(categories.map((cat) =>
        cat.id === editId ? { ...cat, titre, image: image ? (typeof image === "string" ? image : URL.createObjectURL(image)) : cat.image } : cat
      ));

      setEditId(null);
      setTitre("");
      setImage(null);
      alert("Catégorie modifiée avec succès !");
    } catch (error) {
      console.error("❌ Erreur :", error.message);
    }
  };
   
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCategories(); // Rafraîchir les catégories automatiquement
    }, 2000); // Rafraîchissement toutes les 5 secondes
  
    return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage du composant
  }, []);
  

  return (
    <div className="gestion-categories-container">
      <h2 className="gestion-categories-title">Gestion des Catégories</h2>

      <div className="gestion-categories-form">
        <input
          type="text"
          placeholder="Titre de la catégorie"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="gestion-categories-input"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="gestion-categories-input"
        />
        
        {/* Affichage de l'image sélectionnée */}
        {image && (
          <img
            src={typeof image === "string" ? image : URL.createObjectURL(image)}
            alt="Aperçu"
            className="gestion-categories-preview"
          />
        )}

        <button
          onClick={modifierCategorie}
          className="gestion-categories-btn-md"
        >
          Modifier Catégorie
        </button>

        <button onClick={ajouterCategorie} className="gestion-categories-btn-aj">
          Ajouter Catégorie
        </button>
      </div>

      <div className="gestion-categories-list">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div key={cat.id} className="gestion-categories-item">
              <img
                src={cat.image}
                alt={cat.titre}
                className="gestion-categories-img"
                onError={e => { e.target.src = "https://via.placeholder.com/150?text=Image+Indisponible"; }}
              />
              <p className="gestion-categories-text">{cat.titre}</p>
              <button
                onClick={() => supprimerCategorie(cat.id)}
                className="gestion-categories-delete-btn"
              >
                Supprimer
              </button>
              <button
                onClick={() => {
                  setEditId(cat.id);
                  setTitre(cat.titre);
                  setImage(cat.image);
                }}
                className="gestion-categories-edit-btn"
              >
                Modifier
              </button>
            </div>
          ))
        ) : (
          <p className="gestion-categories-empty">Aucune catégorie trouvée</p>
        )}
      </div>
    </div>
  );
};

export default Gestion_categories;
