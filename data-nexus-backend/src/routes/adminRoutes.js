const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { checkDBConnection } = require('../middleware/dbConnection');
const authenticateToken = require('../middleware/auth');
const { validateAdmin } = require('../middleware/validator');

// Récupérer tous les admins
router.get('/', checkDBConnection, authenticateToken, adminController.getAllAdmins);

// Récupérer un admin par ID
router.get('/:id', checkDBConnection, authenticateToken, adminController.getAdminById);

// Ajouter un admin
router.post('/', checkDBConnection, authenticateToken, validateAdmin, adminController.addAdmin);

// Modifier un admin
router.put('/:id', checkDBConnection, authenticateToken, validateAdmin, adminController.updateAdmin);

// Supprimer un admin
router.delete('/:id', checkDBConnection, authenticateToken, adminController.deleteAdmin);

module.exports = router;