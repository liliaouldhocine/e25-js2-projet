import { getCurrentUser, logout } from "../../../utils/auth.js";

const links = {
  index: {
    index: "./index.html",
    product: "./produit/index.html",
    addProduct: "./produit/form/index.html",
    profile: "./utilisateur/index.html",
    login: "./utilisateur/connexion/index.html",
    register: "./utilisateur/inscription/index.html",
    logout: "",
  },
  product: {
    index: "../index.html",
    product: "./index.html",
    addProduct: "./form/index.html",
    profile: "../utilisateur/index.html",
    login: "../utilisateur/connexion/index.html",
    register: "../utilisateur/inscription/index.html",
    logout: "",
  },
  addProduct: {
    index: "../../index.html",
    product: "../index.html",
    addProduct: "./index.html",
    profile: "../../utilisateur/index.html",
    login: "../../utilisateur/connexion/index.html",
    register: "../../utilisateur/inscription/index.html",
    logout: "",
  },
  profile: {
    index: "../index.html",
    product: "../produit/index.html",
    addProduct: "../produit/form/index.html",
    profile: "./index.html",
    login: "./connexion/index.html",
    register: "./inscription/index.html",
    logout: "",
  },
  login: {
    index: "../../index.html",
    product: "../../produit/index.html",
    addProduct: "../../produit/form/index.html",
    profile: "../index.html",
    login: "./index.html",
    register: "../inscription/index.html",
    logout: "",
  },
  register: {
    index: "../../index.html",
    product: "../../produit/index.html",
    addProduct: "../../produit/form/index.html",
    profile: "../index.html",
    login: "../connexion/index.html",
    register: "./index.html",
    logout: "",
  },
};

const user = getCurrentUser();
const isConnected = user;
const isAdmin = user && user.role === "admin";

const getNavMenu = (page) => {
  const menu = document.querySelector(`#menu-${page}`);
  const addProduct = `<li>
        <a href="${links[page].addProduct}" class="header-nav ${
    page == "addProduct" ? "active" : ""
  }">Ajouter un produit</a>
    </li>`;
  const registerLogin = `<li>
        <a href="${links[page].register}" class="header-nav ${
    page == "register" ? "active" : ""
  }">Inscription</a>
    </li>
    |
    <li>
        <a href="${links[page].login}" class="header-nav ${
    page == "login" ? "active" : ""
  }">Connexion</a>
    </li>`;
  const profileLogout = `<li>
        <a href="${links[page].profile}" class="header-nav ${
    page == "profile" ? "active" : ""
  }">Profile</a>
    </li>
    |
    <li>
        <a href="" class="header-nav" id="btn-logout">Déconnexion</a>
    </li>`;

  menu.innerHTML = `
    <li>
        <a href="${links[page].index}" class="header-nav ${
    page == "index" ? "active" : ""
  }">Accueil</a>
    </li>
    ${isAdmin ? addProduct : ""} 
    ${isConnected ? profileLogout : registerLogin}
    
  `;
};

document.addEventListener("click", (event) => {
  const logoutBtn = event.target.closest("#btn-logout");
  if (logoutBtn) {
    event.preventDefault();
    logout();
  }
});

export default getNavMenu;
