// src/models/category.js
const { db } = require('../middleware/dbConnection');

class Category {
  constructor(titre, image) {
    this.titre = titre;
    this.image = image;
  }

  static getAllCategories(callback) {
    db.query('SELECT * FROM Categories', callback);
  }

  static getCategoryById(id, callback) {
    db.query('SELECT * FROM Categories WHERE id = ?', [id], callback);
  }

  save(callback) {
    const sql = 'INSERT INTO Categories (titre, image) VALUES (?, ?)';
    db.query(sql, [this.titre, this.image], callback);
  }

  static updateCategory(id, titre, image, callback) {
    const sql = 'UPDATE Categories SET titre = ?, image = ? WHERE id = ?';
    db.query(sql, [titre, image, id], callback);
  }

  static deleteCategory(id, callback) {
    db.query('DELETE FROM Categories WHERE id = ?', [id], callback);
  }
}

module.exports = Category;