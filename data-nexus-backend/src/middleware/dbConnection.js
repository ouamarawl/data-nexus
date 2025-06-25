const mysql = require('mysql2');
require('dotenv').config();

// 🧪 Vérification que les variables d’environnement sont bien lues
console.log("🔐 Paramètres lus depuis .env :");
console.log("➡️ DB_HOST     :", process.env.DB_HOST);
console.log("➡️ DB_USER     :", process.env.DB_USER);
console.log("➡️ DB_PASSWORD :", process.env.DB_PASSWORD ? "✔️ (défini)" : "❌ (non défini)");
console.log("➡️ DB_NAME     :", process.env.DB_NAME);

// 🔍 Traçage de l’origine de la création de la connexion
console.trace("🔍 mysql.createConnection appelé ici");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "nexus-data",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion à la base de données :", err.message);
    process.exit(1); // Stoppe le serveur si erreur critique
  } else {
    console.log("✅ Connecté à MySQL !");
  }
});

// ✅ Middleware pour vérifier la connexion
function checkDBConnection(req, res, next) {
  if (!db || db.state === "disconnected") {
    return res.status(500).json({ message: "Connexion à la base de données perdue." });
  }
  next();
}

module.exports = { db, checkDBConnection };
