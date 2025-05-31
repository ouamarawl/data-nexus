const { db } = require('../middleware/dbConnection');

// Inscription d’un utilisateur (exemple, à adapter selon ta table)
exports.register = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  const sql = "INSERT INTO admin_membre (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de l'inscription." });
    }
    res.status(201).json({ message: "Inscription réussie !" });
  });
};

// Connexion d’un utilisateur (exemple simple, sans JWT)
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }
  const sql = "SELECT * FROM admin_membre WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la connexion." });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }
    res.status(200).json({ message: "Connexion réussie !" });
  });
};