const { body, validationResult } = require('express-validator');

// Validation pour l'ajout/modification d'un admin
const validateAdmin = [
  body('name').notEmpty().withMessage('Le nom est requis.'),
  body('email').isEmail().withMessage('Email invalide.'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation pour l'ajout/modification d'une catégorie
const validateCategory = [
  body('name').notEmpty().withMessage('Le nom de la catégorie est requis.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation pour l'ajout/modification d'un produit
const validateProduct = [
  body('name').notEmpty().withMessage('Le nom du produit est requis.'),
  body('price').isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif.'),
  body('category_id').isInt().withMessage('L\'ID de catégorie est requis.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation pour l'ajout/modification d'une commande
const validateOrder = [
  body('client').notEmpty().withMessage('Le client est requis.'),
  body('produits').isArray({ min: 1 }).withMessage('La liste des produits est requise.'),
  body('total').isFloat({ min: 0 }).withMessage('Le total doit être un nombre positif.'),
  body('statut').notEmpty().withMessage('Le statut est requis.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation pour l'ajout/modification d'un comité
const validateComite = [
  body('nom').notEmpty().withMessage('Le nom du comité est requis.'),
  body('description').optional().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateAdmin, validateCategory, validateProduct, validateOrder, validateComite };
