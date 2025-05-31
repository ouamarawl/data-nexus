import React, { useState, useEffect } from "react";
import "./Formulaire_commandes.css";
const Formulaire_commandes = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    numero: "",
    produit: "Custom order",
    prix_total: 4500, // Default value
    lieu: "",
  });
  const [panier, setPanier] = useState([]);
  const [produits, setProduits] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedPanier = localStorage.getItem("panier");
    if (storedPanier) {
      setPanier(JSON.parse(storedPanier));
    }
  }, []);

  // Save cart to localStorage on each modification
  useEffect(() => {
    if (panier.length > 0) {
      localStorage.setItem("panier", JSON.stringify(panier));
    }
  }, [panier]);

  // Load products from API
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/produits");
        const data = await response.json();
        setProduits(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    fetchProduits();
  }, []);

  // Calculate total price and number of products
  const totalProduits = panier.reduce((total, produit) => total + produit.quantite, 0);
  const prixTotal = panier.reduce((total, produit) => total + produit.quantite * parseFloat(produit.prix_unitaire || 0), 0);

  // Handle user input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Récupérer le panier depuis le localStorage
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
  
    // Générer la date avec heure et minutes
    const dateCommande = new Date().toISOString().slice(0, 19).replace("T", " ");
  
    // Construire l'objet à envoyer
    const updatedFormData = {
      ...formData,
      produit: JSON.stringify(panier), // Convertir le panier en JSON avant l'envoi
      prix_total: parseFloat(prixTotal.toFixed(2)),
      date_commande: dateCommande,
    };
  
    console.log("Données envoyées :", updatedFormData); // Vérification
  
    try {
      const response = await fetch("http://localhost:5050/api/commandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });
  
      if (response.ok) {
        alert("Commande enregistrée avec succès !");
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          numero: "",
          produit: JSON.stringify([]), // Réinitialiser le produit à un tableau vide
          prix_total: 0,
          lieu: "",
        });
        localStorage.removeItem("panier"); // Vider le panier après validation
      } else {
        const errorData = await response.json();
        alert(`Erreur : ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert("Échec de l'envoi de la commande.");
    }
  };
  
  
  
  
  return (
    <div className="commande-container">
      <h2>Finalize your order</h2>

      <div className="resume-panier">
        <h3>Cart summary</h3>
        <p>Number of products: {totalProduits}</p>
        <hr />
        <div className="prix-totale">
          <p>Total price:</p>
          <p>{prixTotal.toFixed(2)} DA</p>
        </div>
        <hr />
      </div>

      <form className="form-commandes" onSubmit={handleSubmit}>
        <label>Last name:</label>
        <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />

        <label>First name:</label>
        <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone number:</label>
        <input type="tel" name="numero" value={formData.numero} onChange={handleChange} required />

        <label>Delivery address:</label>
        <input type="text" name="lieu" value={formData.lieu} onChange={handleChange} required />

        <button type="submit">Confirm order</button>
      </form>

      <div className="support">
        <h3>Need help?</h3>
        <p>
          Contact us at <strong>+213 549 255 042</strong>
        </p>
      </div>
    </div>
  );
}

export default Formulaire_commandes;
