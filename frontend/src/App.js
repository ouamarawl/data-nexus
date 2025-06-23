import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Panier from "./pages/panier/Panier";
import About from "./pages/about/About";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Admin from "./pages/Admin_dashboard/Admin";
import Resulta_searshing from "./component/Searchbar/Resulta_searshing";
import Vitrines from "./pages/vitrine/Vitrines";
import Admin_dashboard from "./pages/Admin_dashboard/Admin_dashboard";
import Formulaire_commandes from "./component/formulaire_commandes/Formulaire_commandes";
import Produits_categories from "./pages/produits_categories/Produits_categories";
import ScrollToTop from "./ScrollToTop"; // Import du composant ScrollToTop

// 🔐 Protection des routes admin
const ProtectedRoute = ({ children }) => {
  const { admin } = useContext(AuthContext);
  return admin ? children : <Navigate to="/admin" replace />;
};

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/resulta_searshing" element={<Resulta_searshing />} />
          <Route path="/vitrine/:id" element={<Vitrines />} />
          <Route
            path="/formulaire_commandes"
            element={<Formulaire_commandes />}
          />
          <Route
            path="/produits_categories/:categorie"
            element={<Produits_categories />}
          />

          {/* ✅ Protection réactivée ici */}
          <Route
            path="/admin_dashboard"
            element={
              <ProtectedRoute>
                <Admin_dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
