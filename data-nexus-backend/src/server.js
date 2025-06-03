const express = require("express");
const cors = require("cors");
const path = require("path");
const { checkDBConnection } = require("./middleware/dbConnection");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const infoAdminRoutes = require("./routes/infoAdminRoutes");
const upload = require("./middleware/upload");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "utils", "Assets")));

const imagesPath = path.join(__dirname, "src", "utils", "Assets");
console.log("📁 Images path:", imagesPath);
app.use("/images", express.static(imagesPath));



// Routes
app.use("/api/admin_membre", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/commandes", orderRoutes);
app.use("/api/produits", productRoutes);
app.use("/api/info_admin", infoAdminRoutes);

// Route d'upload d'image pour les catégories
app.post("/api/upload", upload.array("images", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "Aucune image envoyée" });
  }
  const imageUrls = req.files.map(
    (file) => `/images/${file.filename}`
  );
  res.json({ imageUrls });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


