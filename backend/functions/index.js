// Import required libraries
const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dh3bfg4tk",
  api_key: "792455357644867",
  api_secret: "MSHKYxkcYVeKGU11i-2ICgrDjs8",
});

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors({origin: ["http://localhost:3000", "https://nexus-shop-ecom.web.app"]}));

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Nexus API!");
});

// Test connection route
app.get("/test", (req, res) => {
  res.send("API is working with Firestore!");
});

/** ===================== ✅ جلب المنتجات من Firestore ✅ ===================== */
app.get("/products", async (req, res) => {
  try {
    const productsRef = db.collection("produits");
    const snapshot = await productsRef.get();

    if (snapshot.empty) {
      return res.status(404).json({message: "No products found!"});
    }

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(products);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});


app.get("/users", async (req, res) => {
  try {
    const usersRef = db.collection("admin_membre");
    const snapshot = await usersRef.get();

    if (snapshot.empty) {
      return res.status(404).json({message: "No users found!"});
    }

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(users);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

/** ===================== ✅ جلب الطلبات من Firestore ✅ ===================== */
app.get("/orders", async (req, res) => {
  try {
    const ordersRef = db.collection("commandes");
    const snapshot = await ordersRef.get();

    if (snapshot.empty) {
      return res.status(404).json({message: "No orders found!"});
    }

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(orders);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});


app.post("/products", async (req, res) => {
  try {
    const {name, price, description, imageUrl} = req.body;
    const docRef = await db
        .collection("produits")
        .add({name, price, description, imageUrl});


    res.json({message: "Product added successfully!", id: docRef.id});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

/** ===================== ✅ رفع صورة إلى Cloudinary ✅ ===================== */
app.post("/upload", async (req, res) => {
  try {
    const file = req.body.image; // يجب أن يكون Base64
    const result = await cloudinary.uploader.upload(file);

    res.json({url: result.secure_url});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Export Express app as Firebase Function
exports.api = functions.https.onRequest(app);
