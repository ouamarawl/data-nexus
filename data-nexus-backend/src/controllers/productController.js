const { db } = require('../middleware/dbConnection');

// // Récupérer tous les produits
// exports.getAllProducts = (req, res) => {
//   db.query("SELECT * FROM produits", (err, results) => {
//     if (err) return res.status(500).json({ message: "Erreur lors de la récupération des produits", error: err.message });
//     res.status(200).json(results);
//   });
// };

// // Récupérer un produit par ID
// exports.getProductById = (req, res) => {
//   const { id } = req.params;
//   db.query("SELECT * FROM produits WHERE id = ?", [id], (err, result) => {
//     if (err) return res.status(500).json({ message: "Erreur lors de la récupération du produit", error: err.message });
//     if (result.length === 0) return res.status(404).json({ message: "Produit non trouvé" });
//     res.status(200).json(result[0]);
//   });
// };


// Récupérer tous les produits
exports.getAllProducts = (req, res) => {
  db.query("SELECT * FROM produits", (err, results) => {
    if (err) {
      return res.status(500).json({ 
        message: "Erreur lors de la récupération des produits", 
        error: err.message 
      });
    }
          
    // Transformation du champ images en tableau
    const produits = results.map(prod => {
      return {
        ...prod,
        images: prod.images ? JSON.parse(prod.images) : [] // si vide => tableau vide
      };
    });

    res.status(200).json(produits);
  });
};

// Récupérer un produit par ID
exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM produits WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ 
        message: "Erreur lors de la récupération du produit", 
        error: err.message 
      });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // Transformation du champ images
    const produit = {
      ...result[0],
      images: result[0].images ? JSON.parse(result[0].images) : []
    };

    res.status(200).json(produit);
  });
};

// Ajouter un produit
exports.addProduct = (req, res) => {
  const { titre, description, prix, images, categorie } = req.body;
  if (!titre || !description || !prix || !images || !categorie) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  const imagesJson = JSON.stringify(Array.isArray(images) ? images : [images]);
  db.query(
    "INSERT INTO produits (titre, description, prix, images, categorie) VALUES (?, ?, ?, ?, ?)",
    [titre, description, prix, imagesJson, categorie],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur lors de l'ajout", error: err.message });
      res.status(201).json({ message: "Produit ajouté avec succès !" });
    }
  );
};

// Modifier un produit
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { titre, description, prix, images, categorie } = req.body;
  if (!titre || !description || !prix || !images || !categorie) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  const imagesJson = JSON.stringify(Array.isArray(images) ? images : [images]);
  db.query(
    "UPDATE produits SET titre = ?, description = ?, prix = ?, images = ?, categorie = ? WHERE id = ?",
    [titre, description, prix, imagesJson, categorie, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur lors de la modification", error: err.message });
      res.status(200).json({ message: "Produit modifié avec succès !" });
    }
  );
};

// Supprimer un produit
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM produits WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
    res.status(200).json({ message: "Produit supprimé avec succès !" });
  });
};