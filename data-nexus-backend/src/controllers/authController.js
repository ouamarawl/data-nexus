const { db } = require('../middleware/dbConnection');
const bcrypt = require('bcrypt');

// Inscription d'un utilisateur
exports.register = async (req, res) => {
  const { name, email, password, isHashed } = req.body; // Ajout du flag isHashed
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    let hashedPassword;
    
    // Si le mot de passe est déjà haché (transfert depuis info_admin)
    if (isHashed) {
      hashedPassword = password;
    } 
    // Si c'est un nouveau mot de passe (inscription normale)
    else {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const sql = "INSERT INTO admin_membre (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Erreur SQL:", err);
        return res.status(500).json({ message: "Erreur lors de l'inscription." });
      }
      res.status(201).json({ message: "Inscription réussie !" });
    });
  } catch (err) {
    console.error("Erreur:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }

  try {
    const sql = "SELECT * FROM admin_membre WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error("Erreur SQL:", err);
        return res.status(500).json({ message: "Erreur serveur." });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Identifiants invalides." });
      }

      const user = results[0];
      
      // Vérification du mot de passe
      const match = await bcrypt.compare(password, user.password);
      
      if (!match) {
        return res.status(401).json({ message: "Identifiants invalides." });
      }

      return res.status(200).json({ message: "Connexion réussie !", user });
    });
  } catch (err) {
    console.error("Erreur:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Nouvelle route pour le transfert d'admin
exports.transferAdmin = async (req, res) => {
  const { name, email, hashedPassword } = req.body;
  if (!name || !email || !hashedPassword) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  try {
    const sql = "INSERT INTO admin_membre (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Erreur SQL lors du transfert:", err);
        return res.status(500).json({ message: "Erreur lors du transfert.", sqlMessage: err.sqlMessage, code: err.code });
      }
      res.status(201).json({ message: "Transfert réussi !" });
    });
  } catch (err) {
    console.error("Erreur JS:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};