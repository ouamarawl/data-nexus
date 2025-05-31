import "./gestion_des_commands.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Card_commande from "../../../../component/cards/Card_commande";

function Gestion_des_commands() {
  const [commandes, setCommandes] = useState([]);
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [livraisonState, setLivraisonState] = useState({});
  const [panier_local, setPanier_local] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Récupérer les commandes
  const fetchCommandes = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5050/api/commandes");
      const data = await response.json();

      console.log("📦 Commandes reçues :", data);

      const commandesAvecProduits = data.map(cmd => ({
        ...cmd,
        produit: typeof cmd.produit === "string" ? JSON.parse(cmd.produit) : cmd.produit
      }));

      setCommandes(commandesAvecProduits);
      setLivraisonState(
        commandesAvecProduits.reduce((acc, cmd) => ({ ...acc, [cmd.id]: false }), {})
      );
    } catch (error) {
      console.error("❌ Erreur lors du chargement des commandes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Récupérer le panier_local depuis le localStorage
  const fetchPanier_local = useCallback(() => {
    setPanier_local(JSON.parse(localStorage.getItem("panier")) || []);
  }, []);

  // ✅ Charger les données au montage
  useEffect(() => {
    fetchCommandes();
    fetchPanier_local();
  }, [fetchCommandes, fetchPanier_local]);

  // ✅ Basculer l'état de livraison
  const toggleLivraison = useCallback((id) => {
    setLivraisonState((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // ✅ Optimisation de l'affichage des commandes
  const commandesAffichees = useMemo(
    () =>
      commandes.map((cmd) => (
        <tr key={cmd.id} onClick={() => setSelectedCommande(cmd)} className="commande-row">
          <td>{cmd.id}</td>
          <td>{cmd.nom}</td>
          <td>{cmd.prenom}</td>
          <td>{cmd.email}</td>
          <td>{cmd.numero}</td>
          <td>
            {cmd.produit.map((p, index) => (
              <span key={index}>
                {p.titre_produit} (x{p.quantite}) {index !== cmd.produit.length - 1 && ", "}
              </span>
            ))}
          </td>
          <td>
            {cmd.prix_total ? `${parseFloat(cmd.prix_total).toFixed(2)} DA` : "Non disponible"}
          </td>
          <td>
            {cmd.date_commande ? new Date(cmd.date_commande).toLocaleDateString() : "Non disponible"}
          </td>
          <td>{cmd.lieu}</td>
          <td>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLivraison(cmd.id);
              }}
              className={livraisonState[cmd.id] ? "btn-livraison livree" : "btn-livraison non-livree"}
            >
              {livraisonState[cmd.id] ? "✔️ Livrée" : "❌ Non livrée"}
            </button>
          </td>
        </tr>
      )),
    [commandes, livraisonState, toggleLivraison]
  );
  
  // Rafraîchir les commandes  chaque 1 seconde
  useEffect(() => {
    fetchCommandes(); // Chargement initial
    const intervalId = setInterval(fetchCommandes, 1000);

    return () => clearInterval(intervalId);
  }, []);  

  return (
    <div className="gestion_des_commands">
      <h2>Gestion des Commandes</h2>
      {loading ? (
        <p>Chargement des commandes...</p>
      ) : (
        <table className="table-commandes">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Numéro</th>
              <th>Produit</th>
              <th>Prix</th>
              <th>Date</th>
              <th>Lieu</th>
              <th>Livraison</th>
            </tr>
          </thead>
          <tbody>{commandesAffichees}</tbody>
        </table>
      )}

      {/* ✅ Détails de la commande sélectionnée */}
      {selectedCommande && (
        <div className="container-cards-panier_local-detailles">
          <h3>🛒 Détails du Panier de {selectedCommande.nom}</h3>
          {selectedCommande.produit && selectedCommande.produit.length > 0 ? (
            <div className="cards-grid">
              {selectedCommande.produit.map((item) => (
                <Card_commande
                  key={item.produit_id}
                  id={item.produit_id}
                  prix={item.prix_unitaire}
                  image={item.image_produit}
                  titre={item.titre_produit}
                  nbr_produits={item.quantite}
                />
              ))}
            </div>
          ) : (
            <p className="panier_local-vide">Le panier est vide.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Gestion_des_commands;