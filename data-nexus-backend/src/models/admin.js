// src/models/admin.js
const db = require('../config/db');

class Admin {
  constructor(nom, email, password, role, telephone, adresse, date_inscription) {
    this.nom = nom;
    this.email = email;
    this.password = password;
    this.role = role;
    this.telephone = telephone;
    this.adresse = adresse;
    this.date_inscription = date_inscription;
  }

  static findAll(callback) {
    db.query("SELECT * FROM info_admin", callback);
  }

  static findById(id, callback) {
    db.query("SELECT * FROM info_admin WHERE id = ?", [id], callback);
  }

  static create(adminData, callback) {
    const { nom, email, password, role, telephone, adresse, date_inscription } = adminData;
    db.query(
      "INSERT INTO info_admin (nom, email, password, role, telephone, adresse, date_inscription) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nom, email, password, role, telephone, adresse, date_inscription],
      callback
    );
  }

  static update(id, adminData, callback) {
    const { nom, email, password, role, telephone, adresse } = adminData;
    db.query(
      "UPDATE info_admin SET nom = ?, email = ?, password = ?, role = ?, telephone = ?, adresse = ? WHERE id = ?",
      [nom, email, password, role, telephone, adresse, id],
      callback
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM info_admin WHERE id = ?", [id], callback);
  }
}

module.exports = Admin;