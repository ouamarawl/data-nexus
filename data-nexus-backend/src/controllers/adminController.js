const { db } = require('../middleware/dbConnection');

// Récupérer tous les admins
exports.getAllAdmins = (req, res) => {
  db.query("SELECT * FROM admin_membre", (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la récupération des admins", error: err.message });
    res.status(200).json(results);
  });
};

// Récupérer un admin par ID
exports.getAdminById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM admin_membre WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la récupération de l'admin", error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Admin non trouvé" });
    res.status(200).json(result[0]);
  });
};

// Ajouter un admin
exports.addAdmin = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  db.query(
    "INSERT INTO admin_membre (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur lors de l'ajout", error: err.message });
      res.status(201).json({ message: "Admin ajouté avec succès !" });
    }
  );
};

// Modifier un admin
exports.updateAdmin = (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  db.query(
    "UPDATE admin_membre SET name = ?, email = ?, password = ? WHERE id = ?",
    [name, email, password, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur lors de la modification", error: err.message });
      res.status(200).json({ message: "Admin modifié avec succès !" });
    }
  );
};

// Supprimer un admin
exports.deleteAdmin = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM admin_membre WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
    res.status(200).json({ message: "Admin supprimé avec succès !" });
  });
};