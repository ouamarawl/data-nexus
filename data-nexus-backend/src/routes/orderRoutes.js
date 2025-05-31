const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { checkDBConnection } = require('../middleware/dbConnection');


// Récupérer toutes les commandes
router.get('/', checkDBConnection, orderController.getAllOrders);

// Récupérer une commande par ID
router.get('/:id', checkDBConnection, orderController.getOrderById);

// Ajouter une commande
router.post('/', checkDBConnection, orderController.addOrder);

// Modifier une commande
router.put('/:id', checkDBConnection, orderController.updateOrder);

// Supprimer une commande
router.delete('/:id', checkDBConnection, orderController.deleteOrder);

module.exports = router;

