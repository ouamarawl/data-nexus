const { db } = require("../middleware/dbConnection");
const bcrypt = require("bcrypt");

// Obtenir toutes les infos admin
exports.getAllInfoAdmin = (req, res) => {
  db.query("SELECT * FROM info_admin", (err, results) => {
    if (err) {
      console.error("Erreur SQL info_admin:", err); // Ajout du log détaillé
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Obtenir une info admin par ID
exports.getInfoAdminById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM info_admin WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Info admin non trouvée" });
    res.json(results[0]);
  });
};

// Ajouter une info admin
exports.createInfoAdmin = (req, res) => {
  const data = req.body;
  db.query("INSERT INTO info_admin SET ?", data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...data });
  });
};

// Modifier une info admin
exports.updateInfoAdmin = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db.query("UPDATE info_admin SET ? WHERE id = ?", [data, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Info admin non trouvée" });
    res.json({ id, ...data });
  });
};

// Supprimer une info admin
exports.deleteInfoAdmin = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM info_admin WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Info admin non trouvée" });
    res.json({ message: "Info admin supprimée" });
  });
};

// Valider un admin : copier de info_admin vers admin_membre
exports.validerAdmin = async (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM info_admin WHERE id = ?", [id], async (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la récupération.", error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Admin non trouvé." });
    const admin = results[0];
    // Vérifie si déjà validé
    db.query("SELECT * FROM admin_membre WHERE email = ?", [admin.email], async (err2, exists) => {
      if (err2) return res.status(500).json({ message: "Erreur lors de la vérification.", error: err2.message });
      if (exists.length > 0) return res.status(400).json({ message: "Cet admin est déjà validé." });
      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      db.query(
        "INSERT INTO admin_membre (name, email, password) VALUES (?, ?, ?)",
        [admin.nom, admin.email, hashedPassword],
        (err3) => {
          if (err3) return res.status(500).json({ message: "Erreur lors de la validation.", error: err3.message });
          res.status(201).json({ message: "Admin validé et ajouté à admin_membre." });
        }
      );
    });
  });
};
