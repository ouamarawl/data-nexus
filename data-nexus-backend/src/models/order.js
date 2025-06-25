// src/models/order.js
const { db } = require('../middleware/dbConnection');

class Order {
  constructor(nom, prenom, email, numero, produit, prix_total, lieu) {
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.numero = numero;
    this.produit = produit;
    this.prix_total = prix_total;
    this.lieu = lieu;
  }

  static create(orderData, callback) {
    const sql = "INSERT INTO commandes (nom, prenom, email, numero, produit, prix_total, date_commande, lieu) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)";
    db.query(sql, [orderData.nom, orderData.prenom, orderData.email, orderData.numero, orderData.produit, orderData.prix_total, orderData.lieu], callback);
  }

  static findAll(callback) {
    const sql = "SELECT * FROM commandes";
    db.query(sql, callback);
  }

  static findById(id, callback) {
    const sql = "SELECT * FROM commandes WHERE id = ?";
    db.query(sql, [id], callback);
  }

  static update(id, orderData, callback) {
    const sql = "UPDATE commandes SET nom = ?, prenom = ?, email = ?, numero = ?, produit = ?, prix_total = ?, lieu = ? WHERE id = ?";
    db.query(sql, [orderData.nom, orderData.prenom, orderData.email, orderData.numero, orderData.produit, orderData.prix_total, orderData.lieu, id], callback);
  }

  static delete(id, callback) {
    const sql = "DELETE FROM commandes WHERE id = ?";
    db.query(sql, [id], callback);
  }
}

module.exports = Order;