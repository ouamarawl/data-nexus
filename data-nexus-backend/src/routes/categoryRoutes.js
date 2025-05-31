const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { checkDBConnection } = require('../middleware/dbConnection');
const upload = require("../middleware/upload");

// Route pour récupérer toutes les catégories
router.get('/', checkDBConnection, categoryController.getAllCategories);

// Route pour ajouter une catégorie
router.post('/', checkDBConnection, categoryController.addCategory);

// Modifier une catégorie (accepte upload d'image)
router.put('/:id', checkDBConnection, categoryController.updateCategory);

// Supprimer une catégorie
router.delete('/:id', checkDBConnection, categoryController.deleteCategory);

module.exports = router;