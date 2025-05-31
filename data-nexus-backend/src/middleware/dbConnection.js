const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nexus-data",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err.message);
    process.exit(1);
  } else {
    console.log("Connecté à MySQL !");
  }
});

// Middleware pour vérifier la connexion
function checkDBConnection(req, res, next) {
  if (!db || db.state === "disconnected") {
    return res.status(500).json({ message: "Connexion à la base de données perdue." });
  }
  next();
}

module.exports = { db, checkDBConnection };