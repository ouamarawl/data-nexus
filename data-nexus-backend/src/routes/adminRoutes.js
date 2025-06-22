const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
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

// Transfert d'un admin depuis info_admin (mot de passe déjà hashé)
router.post('/transfer', checkDBConnection, authController.transferAdmin);

module.exports = router;