const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { checkDBConnection } = require('../middleware/dbConnection');
const { validateProduct } = require('../middleware/validator');

// Récupérer tous les produits
router.get('/', checkDBConnection, productController.getAllProducts);

// Récupérer un produit par ID
router.get('/:id', checkDBConnection, productController.getProductById);

// Ajouter un produit
router.post('/', checkDBConnection, validateProduct, productController.addProduct);

// Modifier un produit
router.put('/:id', checkDBConnection, validateProduct, productController.updateProduct);

// Supprimer un produit
router.delete('/:id', checkDBConnection, productController.deleteProduct);

module.exports = router;