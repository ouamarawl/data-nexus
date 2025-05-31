// src/models/product.js
const db = require('../config/db');

class Product {
  constructor(titre, description, prix, images, categorie) {
    this.titre = titre;
    this.description = description;
    this.prix = prix;
    this.images = images;
    this.categorie = categorie;
  }

  static getAll(callback) {
    db.query('SELECT * FROM produits', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM produits WHERE id = ?', [id], callback);
  }

  save(callback) {
    const sql = 'INSERT INTO produits (titre, description, prix, images, categorie) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [this.titre, this.description, this.prix, this.images, this.categorie], callback);
  }

  static update(id, updatedProduct, callback) {
    const sql = 'UPDATE produits SET titre = ?, description = ?, prix = ?, images = ?, categorie = ? WHERE id = ?';
    db.query(sql, [updatedProduct.titre, updatedProduct.description, updatedProduct.prix, updatedProduct.images, updatedProduct.categorie, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM produits WHERE id = ?', [id], callback);
  }
}

module.exports = Product;