const { db } = require('../middleware/dbConnection');
const upload = require("../middleware/upload");

// Récupérer toutes les catégories
exports.getAllCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la récupération des catégories", error: err.message });
    res.status(200).json(results);
  });
};

// Ajouter une catégorie
exports.addCategory = (req, res) => {
  const { titre, image } = req.body;
  if (!titre) return res.status(400).json({ message: "Le titre est requis." });

  // Correction : forcer l’URL complète
  let imageUrl = image;
  if (image && image.startsWith("/images/")) {
    imageUrl = "http://localhost:5050" + image;
  }

  db.query("INSERT INTO categories (titre, image) VALUES (?, ?)", [titre, imageUrl], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de l'ajout", error: err.message });
    res.status(201).json({ id: result.insertId, titre, image: imageUrl });
  });
};


// Modifier une catégorie avec gestion d'upload d'image
exports.updateCategory = [
  upload.single("image"), // Accepte un champ image (optionnel)
  (req, res) => {
    const { id } = req.params;
    let titre = req.body.titre;
    let image = req.body.image; // Peut être une string (ancienne image) ou undefined
    if (!titre) return res.status(400).json({ message: "Le titre est requis." });

    // Si une nouvelle image est uploadée, on l'utilise
    if (req.file) {
      image = `/images/${req.file.filename}`;
    }
    // Sinon, on garde l'ancienne image (envoyée dans le body)

    // Mise à jour SQL
    db.query(
      "UPDATE categories SET titre = ?, image = ? WHERE id = ?",
      [titre, image, id],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la modification", error: err.message });
        res.status(200).json({ message: "Catégorie modifiée avec succès !", titre, image });
      }
    );
  }
];

// Supprimer une catégorie
exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM categories WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
    res.status(200).json({ message: "Catégorie supprimée avec succès !" });
  });
};