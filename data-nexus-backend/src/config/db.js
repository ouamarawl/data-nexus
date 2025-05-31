const mysql = require("mysql2");

// Configuration de la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nexus-data",
});

// Connexion à MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion à la base de données:", err.message);
    process.exit(1); // Stoppe le serveur si la BDD ne fonctionne pas
  } else {
    console.log("✅ Connecté à MySQL !");
  }
});

module.exports = db;