const { db } = require('../middleware/dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription d’un utilisateur (hashage du mot de passe)
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO admin_membre (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Erreur lors de l'inscription." });
      }
      res.status(201).json({ message: "Inscription réussie !" });
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Connexion d’un utilisateur (vérification du hash + JWT)
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }
  const sql = "SELECT * FROM admin_membre WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la connexion." });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }
    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }
    // Génération du token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ message: "Connexion réussie !", token });
  });
};