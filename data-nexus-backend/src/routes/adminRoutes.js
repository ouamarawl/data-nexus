const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { checkDBConnection } = require('../middleware/dbConnection');

// Récupérer tous les admins
router.get('/', checkDBConnection, adminController.getAllAdmins);

// Récupérer un admin par ID
router.get('/:id', checkDBConnection, adminController.getAdminById);

// Ajouter un admin
router.post('/', checkDBConnection, adminController.addAdmin);

// Modifier un admin
router.put('/:id', checkDBConnection, adminController.updateAdmin);

// Supprimer un admin
router.delete('/:id', checkDBConnection, adminController.deleteAdmin);

module.exports = router;