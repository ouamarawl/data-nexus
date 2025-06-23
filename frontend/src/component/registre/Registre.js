import "./registre.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Registre() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [dateInscription, setDateInscription] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const containerRef = useRef(null);
  const registerBtnRef = useRef(null); // Ajout de useRef
  const loginBtnRef = useRef(null); // Ajout de useRef
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const ajouterUtilisateur = useCallback(async () => {
    console.log("Ajout d'utilisateur en cours...");
    if (
      !nom ||
      !email ||
      !password ||
      !role ||
      !telephone ||
      !adresse ||
      !dateInscription
    ) {
      toast.error("❌ Tous les champs sont obligatoires !");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("❌ Veuillez entrer un email valide !");
      return;
    }

    if (password.length < 6) {
      toast.error("❌ Le mot de passe doit contenir au moins 6 caractères !");
      return;
    }

    const userData = {
      nom: nom.trim(),
      email: email.trim(),
      password: password.trim(),
      role: role.trim(),
      telephone: telephone.trim(),
      adresse: adresse.trim(),
      date_inscription: dateInscription.trim(),
    };

    console.log("📤 Envoi des données :", userData);

    try {
      const response = await fetch("http://localhost:5050/api/info_admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erreur HTTP: ${response.status} - ${errorData.error}`);
      }

      // Tentative de connexion automatique après inscription
      // Supposons que l'API d'inscription ne retourne pas de token, donc on tente un login
      try {
        const loginResponse = await fetch(
          "http://localhost:5050/api/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email.trim(),
              password: password.trim(),
            }),
          }
        );
        const loginData = await loginResponse.json();
        // Ajout du log pour diagnostic
        console.log(
          "Réponse API /api/auth/login après inscription :",
          loginData
        );
        if (loginResponse.ok && loginData.token) {
          login(loginData.token);
          toast.success("✅ Inscription et connexion réussies !");
          setTimeout(() => navigate("/admin_dashboard"), 2000);
        } else {
          toast.success("✅ Inscription réussie ! Veuillez vous connecter.");
        }
      } catch (loginError) {
        toast.success("✅ Inscription réussie ! Veuillez vous connecter.");
      }
    } catch (error) {
      console.error("🚨 Erreur d'ajout :", error.message);
      toast.error("⚠️ Erreur lors de l'inscription !");
    }
  }, [
    nom,
    email,
    password,
    role,
    telephone,
    adresse,
    dateInscription,
    navigate,
  ]);

  const verification_id = useCallback(async () => {
    if (!loginEmail || !loginPassword) {
      toast.error("❌ Veuillez entrer votre email et mot de passe !");
      return;
    }
    try {
      const response = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data); // ✅ met à jour le contexte admin
        toast.success("✅ Connexion réussie !");
        setTimeout(() => navigate("/admin_dashboard"), 2000);
      } else {
        toast.error(
          "⛔ " + (data.message || "Mot de passe ou email incorrect !")
        );
      }
    } catch (error) {
      toast.error("⚠️ Erreur lors de la connexion !");
    }
  }, [loginEmail, loginPassword, navigate, login]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await ajouterUtilisateur();
        setNom("");
        setEmail("");
        setPassword("");
        setRole("");
        setTelephone("");
        setAdresse("");
        setDateInscription("");
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
      }
    },
    [ajouterUtilisateur]
  );

  const handleRegisterClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.add("active");
    }
  };

  const handleLoginClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.remove("active");
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const registerBtn = registerBtnRef.current;
    const loginBtn = loginBtnRef.current;

    if (registerBtn && loginBtn) {
      registerBtn.addEventListener("click", handleRegisterClick);
      loginBtn.addEventListener("click", handleLoginClick);
    }

    return () => {
      if (registerBtn && loginBtn) {
        registerBtn.removeEventListener("click", handleRegisterClick);
        loginBtn.removeEventListener("click", handleLoginClick);
      }
    };
  }, []);

  return (
    <div className="registre">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container" ref={containerRef}>
        {/* Formulaire d'inscription */}
        <div id="login" className="form-box login">
          <form className="form-register" onSubmit={handleSubmit}>
            <h1>Create an admin account</h1>
            <span>Use your email to register</span>
            <div className="input-box">
              <input
                type="text"
                placeholder="Name"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <i className="bx bxs-user-detail"></i>
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Phone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
              <i className="bx bxs-phone"></i>
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Address"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
              />
              <i className="bx bxs-map"></i>
            </div>
            <div className="input-box">
              <input
                type="date"
                value={dateInscription}
                onChange={(e) => setDateInscription(e.target.value)}
              />
              <i className="bx bxs-calendar"></i>
            </div>

            {/* <div className="forgot-link">
              <a style={{textDecoration:'none'}} href="#">Mot de passe oublié ?</a>
            </div> */}
            <button type="submit" id="sign-up-btn" className="btn">
              <p>Sign-Up</p>
            </button>
            {/* <p>ou connectez-vous avec les plateformes sociales</p>
            <div className="social-icons">
              <a href="#"><i className='bx bxl-google'></i></a>
              <a href="#"><i className='bx bxl-facebook'></i></a>
              <a href="#"><i className='bx bxl-github'></i></a>
              <a href="#"><i className='bx bxl-linkedin'></i></a>
            </div> */}
          </form>
        </div>

        {/* Formulaire de connexion */}
        <div id="sign-in" className="form-box register">
          <form className="form-register">
            <h1>Connection</h1>
            <span>Use your email and password</span>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            {/* <a style={{textDecoration:'none'}} href="#">Mot de passe oublié ?</a> */}
            <button
              type="button"
              id="sign-in-btn"
              className="btn"
              onClick={verification_id}
            >
              <p>Sign-In</p>
            </button>
            <p>or register with social platforms</p>
            {/* <div className="social-icons">
              <a href="#"><i className='bx bxl-google'></i></a>
              <a href="#"><i className='bx bxl-facebook'></i></a>
              <a href="#"><i className='bx bxl-github'></i></a>
              <a href="#"><i className='bx bxl-linkedin'></i></a>
            </div> */}
          </form>
        </div>

        {/* Interface de transition entre Sign-In et Sign-Up */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button ref={registerBtnRef} className="btn register-btn">
              Register
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button ref={loginBtnRef} className="btn login-btn">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registre;
