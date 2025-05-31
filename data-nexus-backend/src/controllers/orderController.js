const { db } = require('../middleware/dbConnection');

// Récupérer toutes les commandes
exports.getAllOrders = (req, res) => {
  db.query("SELECT * FROM commandes", (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la récupération des commandes", error: err.message });
    res.status(200).json(results);
  });
};

// Récupérer une commande par ID
exports.getOrderById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM commandes WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la récupération de la commande", error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Commande non trouvée" });
    res.status(200).json(result[0]);
  });
};

// Ajouter une commande
exports.addOrder = (req, res) => {
  const { client, produits, total, statut } = req.body;
  if (!client || !produits || !total || !statut) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  const produitsJson = JSON.stringify(Array.isArray(produits) ? produits : [produits]);
  db.query(
    "INSERT INTO commandes (client, produits, total, statut) VALUES (?, ?, ?, ?)",
    [client, produitsJson, total, statut],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur lors de l'ajout", error: err.message });
      res.status(201).json({ message: "Commande ajoutée avec succès !" });
    }
  );
};

// Modifier une commande
exports.updateOrder = (req, res) => {
  const { id } = req.params;
  const { client, produits, total, statut } = req.body;
  if (!client || !produits || !total || !statut) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  const produitsJson = JSON.stringify(Array.isArray(produits) ? produits : [produits]);
  db.query(
    "UPDATE commandes SET client = ?, produits = ?, total = ?, statut = ? WHERE id = ?",
    [client, produitsJson, total, statut, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur lors de la modification", error: err.message });
      res.status(200).json({ message: "Commande modifiée avec succès !" });
    }
  );
};

// Supprimer une commande
exports.deleteOrder = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM commandes WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
    res.status(200).json({ message: "Commande supprimée avec succès !" });
  });
};