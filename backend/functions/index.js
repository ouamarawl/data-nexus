// استيراد المكتبات المطلوبة
const functions = require("firebase-functions");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// إنشاء تطبيق Express
const app = express();
app.use(express.json());
app.use(cors({origin: "https://nexus-shop-ecom.web.app"}));

// إنشاء اتصال بقاعدة البيانات MySQL المستضافة على الإنترنت
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nexus-data",
  port: 3306,
});
// التحقق من اتصال قاعدة البيانات
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// نقطة نهاية API لاختبار الاتصال
app.get("/test", (req, res) => {
  res.send("API is working!");
});

// نقطة نهاية لجلب جميع المنتجات
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      return res.status(500).json({error: err.message});
    }
    res.json(results);
  });
});

// نقطة نهاية لإضافة منتج جديد
app.post("/products", (req, res) => {
  const {name, price, description} = req.body;
  const
    query = "INSERT INTO products (name, price, description) VALUES (?, ?, ?)";
  db.query(query, [name, price, description], (err, result) => {
    if (err) {
      return res.status(500).json({error: err.message});
    }// eslint-disable-next-line max-len
    res.json({message: "Product added successfully!", id: result.insertId});
  });
});

// eslint-disable-next-line max-len
exports.api = functions.https.onRequest(
    app);
