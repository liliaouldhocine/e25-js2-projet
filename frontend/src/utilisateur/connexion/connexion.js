import { env } from "../../config/env.js";
import "../../assets/styles/styles.scss";
import "./connexion.scss";
import getLink from "../../components/navigation/index.js";
import fetchWithAuth from "../../../api/api.js";

getLink("login");

export function setupLoginForm() {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Réinitialiser les messages d'erreur
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validation des champs
    if (!emailInput.value) {
      emailError.textContent = "L'email est requis";
      return;
    }

    if (!validateEmail(emailInput.value)) {
      emailError.textContent = "Veuillez entrer un email valide";
      return;
    }

    if (!passwordInput.value) {
      passwordError.textContent = "Le mot de passe est requis";
      return;
    }

    if (passwordInput.value.length < 6) {
      passwordError.textContent =
        "Le mot de passe doit contenir au moins 6 caractères";
      return;
    }

    // Données du formulaire
    const loginData = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    try {
      // Envoi de la requête de connexion
      const response = await fetchWithAuth(
        `${env.BACKEND_AUTH_URL}/connexion`,
        {
          method: "POST",
          body: JSON.stringify(loginData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de la connexion");
      }

      // Récupération du JWT
      const data = await response.json();
      const { token } = data;
      console.log("Token reçu:", token);

      // Stockage du token
      storeJwtToken(token);

      // Redirection ou mise à jour de l'UI
      handleSuccessfulLogin();
    } catch (error) {
      // Gestion des erreurs
      emailError.textContent = error.message;
      console.error("Erreur de connexion:", error);
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function storeJwtToken(token) {
    // Stockage dans localStorage
    localStorage.setItem("jwtToken", token);
  }

  function handleSuccessfulLogin() {
    // Redirection vers une page sécurisée
    window.location.href = "/utilisateur/index.html";
  }
}

setupLoginForm();
