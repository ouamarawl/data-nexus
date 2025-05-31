import React from "react";
import "./Admin.css";
import Statistiques from "./component_admin/statistiques/Statistiques";
import Gestion_des_produits from "./component_admin/gestion_des_produits/Gestion_des_produits";
import Gestion_des_commands from "./component_admin/gestion_des_commandes/Gestion_des_commands";
import Gestion_des_admines from "./component_admin/gestion_des_admines/Gestion_des_admines.js";
import Gestion_categories from "./component_admin/gestion_categories/Gestion_categories.js";

function Admin_dashboard() {
  const handleValidate = (id) => {
    alert(`Validation de l'administrateur ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Suppression de l'administrateur ID: ${id}`);
    // Ici, tu peux aussi faire un appel API pour supprimer l'admin du serveur
  };

  return (
    <div className="admin-dashboard">
      <h1 id="admin-dashboard-titre" >Admin dashboard</h1>
      <div className="section-dashboard">
        <div className="container_1">
          <Gestion_des_produits />
          <Gestion_categories />
          <Statistiques />
        </div>
        <div className="container_2">
          <Gestion_des_commands />
          <Gestion_des_admines
            onValidate={handleValidate}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default Admin_dashboard;
