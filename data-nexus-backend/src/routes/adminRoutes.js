const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
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

// Transfert d'un admin depuis info_admin (mot de passe déjà hashé)
router.post('/transfer', checkDBConnection, authController.transferAdmin);

module.exports = router;