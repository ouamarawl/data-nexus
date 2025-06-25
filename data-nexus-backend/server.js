const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// ✅ 👉 TRÈS IMPORTANT : charger .env en premier
require("dotenv").config();

const { checkDBConnection } = require("./src/middleware/dbConnection");
const adminRoutes = require("./src/routes/adminRoutes");
const authRoutes = require("./src/routes/authRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const productRoutes = require("./src/routes/productRoutes");
const infoAdminRoutes = require("./src/routes/infoAdminRoutes");
const upload = require("./src/middleware/upload");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sécurité + Limitation
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000,
  message: "Trop de requêtes, réessayez plus tard."
}));

// CORS avec frontend autorisé
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Statics pour les images
app.use("/images", express.static(path.join(__dirname, "src", "utils", "Assets")));

// Routes API
app.use("/api/admin_membre", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/commandes", orderRoutes);
app.use("/api/produits", productRoutes);
app.use("/api/info_admin", infoAdminRoutes);

// Route pour upload d’images
app.post("/api/upload", upload.array("images", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "Aucune image envoyée" });
  }
  const imageUrls = req.files.map(file => `/images/${file.filename}`);
  res.json({ imageUrls });
});

// Juste pour vérifier si le mot de passe est bien lu
console.log("Mot de passe MySQL lu depuis .env :", process.env.DB_PASSWORD);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
