import React, { useEffect, useState } from "react";
import "./Gestion_des_admines.css";

function Gestion_des_admines() {
  const [admins, setAdmins] = useState([]);
  const [admin_membre, setadmin_membre] = useState([]);
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
      const response = await fetch(`http://localhost:5050/api/info_admin/valider/${id}`, {
        method: "POST"
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erreur lors de la validation");
      alert(data.message || "Admin validé avec succès");
      await fetchAdmins();
      await fetchAdminMembre();
    } catch (error) {
      alert("Erreur de validation :" + error.message);
    }
  };

  // Supprimer un admin validé (admin_membre) par id
  const supprimerAdminMembre = async (id) => {
    if (!id) return alert("Administrateur introuvable !");
    try {
      const response = await fetch(
        `http://localhost:5050/api/admin_membre/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      await fetchAdminMembre();
      alert("Administrateur supprimé avec succès !");
    } catch (error) {
      alert("Erreur lors de la suppression !");
    }
  };
 
   // Rafraîchir les information des admines  chaque 1 seconde
     useEffect(() => {
       fetchAdmins(); // Chargement initial
       // Plus de setInterval ici pour éviter le spam de requêtes
     }, []);  
       // Rafraîchir les admine_mebres chaque 1 seconde
       useEffect(() => {
        fetchAdminMembre(); // Chargement initial
        // Plus de setInterval ici pour éviter le spam de requêtes
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
                  onClick={() => validerAdmin(admin.id)}
                >
                  Valider
                </button>
                <button
                  className="delete-btn"
                  onClick={() => supprimerAdminMembre(admin.id)}
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
