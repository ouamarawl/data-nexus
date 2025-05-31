import "./gestion_des_produits.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Gestion_des_produits() {
  const [produits, setProduits] = useState([]);
  const [description, setDescription] = useState("");
  const [titre, setTitre] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("");
  const [id, setId] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [Categories, SetCategories] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Fonction pour normaliser les images quel que soit leur format
  const normalizeImages = (images) => {
    if (!images) return [];

    try {
      // Si c'est déjà un tableau, on le retourne directement
      if (Array.isArray(images)) return images.filter((img) => img);

      // Si c'est une chaîne JSON, on tente de la parser
      if (typeof images === "string") {
        try {
          const parsed = JSON.parse(images);
          if (Array.isArray(parsed)) return parsed.filter((img) => img);
          if (typeof parsed === "string") return [parsed].filter((img) => img);
          return [parsed].filter((img) => img);
        } catch (e) {
          return [images].filter((img) => img);
        }
      }

      // Si c'est un objet avec une propriété url
      if (images.url) return [images.url].filter((img) => img);

      // Sinon, on crée un tableau avec l'élément
      return [images].filter((img) => img);
    } catch (e) {
      console.error("Erreur de normalisation des images:", e, images);
      return [];
    }
  };

  useEffect(() => {
    const fetchProduits = () => {
      fetch("http://localhost:5050/api/produits")
        .then((response) => response.json())
        .then((data) => {
          const produitsNormalises = data.map((prod) => ({
            ...prod,
            images: normalizeImages(prod.images), // Utilisation de la fonction de normalisation
          }));
          setProduits(produitsNormalises);
        })
        .catch((error) =>
          console.error("Erreur de chargement des produits :", error)
        );
    };

    const interval = setInterval(fetchProduits, 3000); // Rafraîchissement toutes les 3 secondes
    fetchProduits(); // Chargement initial

    return () => clearInterval(interval);
  }, []);

  // Ajout d'un useEffect pour charger dynamiquement les catégories
  useEffect(() => {
    const fetchCategories = () => {
      fetch("http://localhost:5050/api/categories")
        .then((response) => response.json())
        .then((data) => SetCategories(data))
        .catch((error) =>
          console.error("Erreur de chargement des catégories :", error)
        );
    };

    fetchCategories(); // Chargement initial
    const interval = setInterval(fetchCategories, 2000); // Rafraîchissement toutes les 2s
    return () => clearInterval(interval);
  }, []);

  const recherche = () => {
    let product = document.getElementById("search").value.trim();
    if (!product) {
      alert("Veuillez entrer un nom de produit");
      return;
    }

    const foundProduct = produits.find((prod) =>
      prod.titre.toLowerCase().includes(product.toLowerCase())
    );

    if (foundProduct) {
      const productImages = normalizeImages(foundProduct.images);
      console.log("Images normalisées:", productImages);

      setExistingImages(productImages);
      setDescription(foundProduct.description || "");
      setTitre(foundProduct.titre || "");
      setPrix(foundProduct.prix || "");
      setCategorie(foundProduct.categorie || "");
      setId(foundProduct._id || foundProduct.id || "");
    } else {
      setExistingImages([]);
      alert("Aucun produit trouvé");
    }
  };

  const ajouter = async () => {
    if (selectedFile.length === 0) {
      alert("⚠️ Veuillez sélectionner au moins une image !");
      return;
    }

    const formData = new FormData();
    selectedFile.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:5050/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const imageUrls = response.data.imageUrls.map((url) =>
        url.startsWith("http") ? url : `http://localhost:5050${url}`
      );

      const nouveauProduit = {
        titre,
        categorie,
        images: imageUrls,
        description,
        prix,
      };

      await axios.post("http://localhost:5050/api/produits", nouveauProduit);
      alert("✅ Produit ajouté avec succès !");

      setSelectedFile([]);
      setTitre("");
      setDescription("");
      setPrix("");
      setCategorie("");
    } catch (error) {
      console.error("Erreur lors de l'upload :", error.response?.data || error);
    }
  };

  const supprimer = () => {
    if (!id) {
      alert("⚠️ Veuillez sélectionner un produit à supprimer !");
      return;
    }

    fetch(`http://localhost:5050/api/produits/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setProduits(produits.filter((produit) => produit.id !== id));
        alert("🗑️ Produit supprimé avec succès !");
        setExistingImages([]);
        setSelectedFile([]);
        setTitre("");
        setDescription("");
        setPrix("");
        setCategorie("");
        setId("");
      })
      .catch((error) => {
        console.error("Erreur de suppression de produit:", error);
        alert("❌ Erreur lors de la suppression du produit !");
      });
  };

  const modifier = async () => {
    if (!id) {
      alert("⚠️ Veuillez sélectionner un produit à modifier !");
      return;
    }

    let updatedImages = Array.isArray(existingImages) ? existingImages : [];

    if (selectedFile.length > 0) {
      const formData = new FormData();
      selectedFile.forEach((file) => {
        formData.append("images", file);
      });

      try {
        const uploadResponse = await axios.post(
          "http://localhost:5050/api/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        updatedImages = uploadResponse.data.imageUrls.map((url) =>
          url.startsWith("http") ? url : `http://localhost:5050${url}`
        );
      } catch (error) {
        console.error("❌ Erreur lors de l'upload des images :", error);
        return;
      }
    }

    const produitData = {
      titre,
      description,
      prix,
      images: updatedImages,
      categorie,
    };

    fetch(`http://localhost:5050/api/produits/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produitData),
    })
      .then((response) => response.json())
      .then(() => {
        setProduits(
          produits.map((produit) =>
            produit.id === id ? { ...produit, ...produitData } : produit
          )
        );
        alert("✏️ Produit modifié avec succès !");
        setExistingImages(updatedImages);
        setSelectedFile([]);
      })
      .catch((error) => {
        console.error("Erreur de modification de produit:", error);
        alert("❌ Erreur lors de la modification du produit !");
      });
  };

  return (
    <div className="container-card-admin">
      <h2 className="admin-title">gestion des produits</h2>
      <div className="search-bar-2">
        <input id="search" type="search" />
        <button onClick={recherche}>Search</button>
      </div>

      <form className="inputs">
        <select
          className="custom-select"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        >
          <option value="">Sélectionner une catégorie</option>
          {Categories.map((cat, index) => (
            <option key={index} value={cat.titre}>
              {cat.titre}
            </option>
          ))}
        </select>

        <div className="image-upload-section">
          <label className="file-upload-label">
            Sélectionner des images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setSelectedFile((prevFiles) => [
                    ...prevFiles,
                    ...Array.from(e.target.files),
                  ]);
                }
              }}
              className="file-input"
            />
          </label>

          <button
            onClick={(e) => {
              e.preventDefault();
              setSelectedFile([]);
            }}
            className="clear-all-btn"
          >
            <svg viewBox="0 0 24 24" width="14" height="14">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Tout effacer
          </button>

          {selectedFile.length > 0 && (
            <div className="selected-images-preview">
              <h4>Images sélectionnées ({selectedFile.length}) :</h4>
              <div className="images-grid">
                {selectedFile.map((file, index) => (
                  <div key={index} className="image-preview-item">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Aperçu ${index + 1}`}
                      className="preview-image"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedFile((prevFiles) =>
                          prevFiles.filter((_, i) => i !== index)
                        );
                      }}
                      className="remove-image-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {existingImages.length > 0 ? (
            <div className="existing-images-preview">
              <h4>Images du produit ({existingImages.length}) :</h4>
              <div className="images-grid">
                {existingImages.map((image, index) => {
                  const imagePath = image.startsWith("http")
                    ? image
                    : image.startsWith("/uploads")
                    ? `http://localhost:5050${image}`
                    : `http://localhost:5050/uploads/${image}`;

                  return (
                    <div
                      key={`prod-img-${index}`}
                      className="image-preview-item"
                    >
                      <img
                        src={imagePath}
                        alt={`Image produit ${index + 1}`}
                        className="preview-image"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/150?text=Image+Indisponible";
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setExistingImages((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                        className="remove-image-btn"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="no-images-message">
              Aucune image disponible pour ce produit
            </p>
          )}
        </div>

        <input
          placeholder="Titre"
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
        <input
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Prix"
          type="number"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
        />
      </form>

      <div className="buttons">
        <button id="ajouter" onClick={ajouter}>
          Ajouter
        </button>
        <button id="modifier" onClick={modifier}>
          Modifier
        </button>
        <button id="supprimer" onClick={supprimer}>
          Supprimer
        </button>
      </div>

      <h2 className="admin-title">Produits</h2>
      {produits.length > 0 ? (
        <textarea
          value={produits
            .map(
              (prod) => `${prod.titre} - ${prod.categorie} - ${prod.prix} DA`
            )
            .join("\n")}
          readOnly
          rows="10"
          cols="30"
        />
      ) : (
        <p>Aucun produit disponible.</p>
      )}
    </div>
  );
}

export default Gestion_des_produits;
