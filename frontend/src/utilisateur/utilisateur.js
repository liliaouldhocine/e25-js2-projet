import { logout, getCurrentUser } from "../../utils/auth.js";
import fetchWithAuth from "../../api/api.js";

import "../assets/styles/styles.scss";
import "./utilisateur.scss";

import getNavMenu from "../components/navigation";

getNavMenu("profile");

// Charger les données du profil
async function loadProfile() {
  try {
    // Option 1: Décoder le JWT côté client (basique)
    const userFromToken = getCurrentUser();
    renderProfile(userFromToken);
  } catch (error) {
    console.error("Erreur:", error);
    if (error.message.includes("401")) {
      window.location.href = "/utilisateur/connexion/index.html";
    }
  }
}

// Afficher les données du profil
function renderProfile(user) {
  if (!user) return;

  const content = document.querySelector(".content");
  content.innerHTML = `
     <div class="card p-20 user-container">
        <h2>Profile</h2>
          <div class="user">
              <div class="px-20 user-details">
                  <div class="fullName"><h2>${user.fullName}</h2></div>
                  <div class="fullName"><h2>${user.email}</h2></div>
              </div>
          </div>
      </div>
  `;
}

// Initialisation
loadProfile();
