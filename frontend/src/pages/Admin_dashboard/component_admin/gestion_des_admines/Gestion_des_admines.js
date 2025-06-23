import React, { useEffect, useState } from "react";
import "./Gestion_des_admines.css";

function Gestion_des_admines() {
  const [admins, setAdmins] = useState([]);
  const [admin_membre, setadmin_membre] = useState([]);
  const [adminSelectionne, setAdminSelectionne] = useState(null); // ✅ Ajouté
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchAdmins = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/info_admin");
      if (!response.ok) throw new Error("Erreur chargement admins");
      const data = await response.json();
      console.log("Données Admins:", data);
      setAdmins(data);
    } catch (error) {
      setError(error.message);
    }
  };
  
  const fetchAdminMembre = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/admin_membre");
      if (!response.ok) throw new Error("Erreur chargement membres");
      const data = await response.json();
      setadmin_membre(data);
    } catch (error) {
      setError(error.message);
    }
  };
  
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchAdmins(), fetchAdminMembre()])
      .finally(() => setLoading(false));
  }, []);

  // Valider un admin (copie info_admin -> admin_membre)
  const validerAdmin = async (id) => {
    setError(null);
    try {
      let response;
      if (adminSelectionne?.password?.startsWith('$2')) {
        response = await fetch("http://localhost:5050/api/admin_membre/transfer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: adminSelectionne.nom,
            email: adminSelectionne.email,
            hashedPassword: adminSelectionne.password
          }),
        });
      } else {
        response = await fetch("http://localhost:5050/api/admin_membre", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: adminSelectionne.nom,
            email: adminSelectionne.email,
            password: adminSelectionne.password
          }),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        alert("Erreur HTTP: " + response.status + " - " + (errorData.sqlMessage || errorData.message));
        return;
      }
      alert("Utilisateur ajouté avec succès !");
      fetchAdminMembre();
    } catch (error) {
      alert("Erreur de validation :" + error.message);
    }
  };

  const supprimerAdminMembre = async (name, email, password) => {
    let adminId = null;
    for (let i = 0; i < admin_membre.length; i++) {
      if (
        admin_membre[i].name === name &&
        admin_membre[i].email === email
      ) {
        adminId = admin_membre[i].id;
        break;
      }
    }

    if (!adminId) return alert("Administrateur introuvable !");

    try {
      const response = await fetch(
        `http://localhost:5050/api/admin_membre/${adminId}`, // ✅ Corrigé ici
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      await fetchAdminMembre();
      alert("Administrateur supprimé avec succès !");
    } catch (error) {
      alert("Erreur lors de la suppression !");
    }
  };
 
  useEffect(() => {
    fetchAdmins();
  }, []);  

  useEffect(() => {
    fetchAdminMembre();
  }, []); 

  return (
    <div className="table-container">
      <h2>Gestion des administrateurs</h2>
      {loading && <p>Chargement en cours...</p>}
      {error && <p className="error">{error}</p>}

      <table className="table-style">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Mot de passe</th>
            <th>Rôle</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Date d'inscription</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.nom || admin.name || "Non spécifié"}</td>
              <td>{admin.email || "Non spécifié"}</td>
              <td>{admin.password || "Non spécifié"}</td>
              <td>{admin.role || "Non spécifié"}</td>
              <td>{admin.telephone || "Non spécifié"}</td>
              <td>{admin.adresse || "Non spécifié"}</td>
              <td>
                {admin.date_inscription
                  ? new Date(admin.date_inscription).toLocaleDateString(
                      "fr-FR",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "Non spécifié"}
              </td>
              <td className="button-des-admines">
                <button
                  className="validate-btn"
                  onClick={() => {
                    setAdminSelectionne(admin); // ✅ Mis à jour ici
                    validerAdmin(admin.id);
                  }}
                >
                  Valider
                </button>
                <button
                  className="delete-btn"
                  onClick={() =>
                    supprimerAdminMembre(
                      admin.name || admin.nom,
                      admin.email,
                      admin.password
                    )
                  }
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Gestion_des_admines;
