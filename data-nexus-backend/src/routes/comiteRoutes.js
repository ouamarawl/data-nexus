const express = require('express');
const router = express.Router();
const comiteController = require('../controllers/comiteController');
const { checkDBConnection } = require('../middleware/dbConnection');
const { validateComite } = require('../middleware/validator');

// Récupérer tous les comités
router.get('/', checkDBConnection, comiteController.getAllComites);

// Récupérer un comité par ID
router.get('/:id', checkDBConnection, comiteController.getComiteById);

// Ajouter un comité
router.post('/', checkDBConnection, validateComite, comiteController.addComite);

// Modifier un comité
router.put('/:id', checkDBConnection, validateComite, comiteController.updateComite);

// Supprimer un comité
router.delete('/:id', checkDBConnection, comiteController.deleteComite);

module.exports = router;
