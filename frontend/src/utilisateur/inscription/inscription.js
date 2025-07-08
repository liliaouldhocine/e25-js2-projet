import { env } from "../../config/env.js";
import "../../assets/styles/styles.scss";
import "./inscription.scss";
import getNavMenu from "../../components/navigation/index.js";
import fetchWithAuth from "../../../api/api.js";

getNavMenu("register");

export function setupRegisterForm() {
  const form = document.getElementById("registerForm");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Réinitialiser les messages d'erreur
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    // Validation des champs
    let isValid = true;

    // Nom complet
    if (!fullNameInput.value.trim()) {
      nameError.textContent = "Le nom complet est requis !";
      isValid = false;
    } else if (fullNameInput.value.trim().length < 3) {
      nameError.textContent = "Le nom doit contenir au moins 3 caractères";
      isValid = false;
    }

    // Email
    if (!emailInput.value) {
      emailError.textContent = "L'email est requis !";
      isValid = false;
    } else if (!validateEmail(emailInput.value)) {
      emailError.textContent = "Veuillez entrer un email valide.";
      isValid = false;
    }

    // Mot de passe
    if (!passwordInput.value) {
      passwordError.textContent = "Le mot de passe est requis !";
      isValid = false;
    } else if (passwordInput.value.length < 6) {
      passwordError.textContent =
        "Le mot de passe doit contenir au moins 6 caractères.";
      isValid = false;
    }

    // Confirmation mot de passe
    if (!confirmPasswordInput.value) {
      confirmPasswordError.textContent =
        "Veuillez confirmer votre mot de passe!";
      isValid = false;
    } else if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordError.textContent =
        "Les mots de passe ne correspondent pas.";
      isValid = false;
    }

    if (!isValid) return;

    // Données du formulaire
    const registerData = {
      fullName: fullNameInput.value.trim(),
      email: emailInput.value,
      password: passwordInput.value,
    };

    try {
      // Envoi de la requête d'inscription
      const response = await fetchWithAuth(
        `${env.BACKEND_AUTH_URL}/inscription`,
        {
          method: "POST",
          body: JSON.stringify(registerData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de l'inscription");
      }

      // Récupération de la réponse
      const data = await response.json();

      // Si l'API retourne directement un JWT
      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
        window.location.href = "/utilisateur/index.html";
      } else {
        // Redirection vers la page de connexion avec message de succès
        window.location.href = "/utilisateur/connexion/index.html";
      }
    } catch (error) {
      // Gestion des erreurs
      if (error.message.includes("email")) {
        emailError.textContent = error.message;
      } else {
        // Afficher l'erreur générale
        const errorContainer = document.createElement("div");
        errorContainer.className = "text-error";
        errorContainer.textContent = error.message;
        form.prepend(errorContainer);
      }
      console.error("Erreur d'inscription:", error);
    }
  });

  // Validation en temps réel
  passwordInput.addEventListener("input", checkPasswordStrength);
  confirmPasswordInput.addEventListener("input", checkPasswordMatch);

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function checkPasswordStrength() {
    const password = passwordInput.value;
    let strength = "weak";

    if (password.length >= 8) {
      if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
        strength = "strong";
      } else if (/[A-Z]/.test(password) || /[0-9]/.test(password)) {
        strength = "medium";
      }
    }

    // Mettre à jour l'affichage de la force du mot de passe
    const strengthElement =
      document.getElementById("passwordStrength") ||
      createPasswordStrengthElement();
    strengthElement.textContent = `Force du mot de passe: ${getStrengthText(
      strength
    )}`;
    strengthElement.className = `password-strength ${strength}`;
  }

  function createPasswordStrengthElement() {
    const element = document.createElement("div");
    element.id = "passwordStrength";
    passwordInput.parentNode.insertBefore(element, passwordError);
    return element;
  }

  function getStrengthText(strength) {
    const texts = {
      weak: "Faible",
      medium: "Moyenne",
      strong: "Forte",
    };
    return texts[strength] || "";
  }

  function checkPasswordMatch() {
    if (passwordInput.value && confirmPasswordInput.value) {
      if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.textContent =
          "Les mots de passe ne correspondent pas";
      } else {
        confirmPasswordError.textContent = "";
      }
    }
  }
}

setupRegisterForm();
