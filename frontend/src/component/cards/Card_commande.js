import {React , useState} from 'react'
import "./cards.css";
function Card_commande({ id, image, titre, disponibilite, prix, nbr_produits, modifierQuantite, supprimerProduit }) {
    const [quantite, setQuantite] = useState(nbr_produits);
  
    const mettreAJourPanier = (nouvelleQuantite) => {
      if (nouvelleQuantite < 1) return;
      setQuantite(nouvelleQuantite);
      modifierQuantite(id, nouvelleQuantite);
    };

  return (
    <div className="container-card-panier">
      <div className="classe-superieur">
        <div className="partie-L">
          <img src={image} alt={titre} className="image-produit" />
          <div className="enfant-l">
            
              <p>{titre}</p>
            
            <p className="disponibilite">{disponibilite ? "in stock" : "Stock unavailable"}</p>
            <h3 className="logo">Nexus Shop</h3>
          </div>
        </div>
        <div className="partie-R">
          <p className="prix">{quantite * prix} DA</p>
        </div>
      </div>

      <div className="classe-inferieur">
        <div className="button-dajout">
          <p id="nbr_qnt">{quantite}x</p>
        </div>
      </div>
    </div>
  )
}

export default Card_commande