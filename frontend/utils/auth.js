// utils/auth.js
export function getCurrentUser() {
  const token = localStorage.getItem("jwtToken");
  if (!token) return null;

  try {
    // Décoder le payload sans vérification (attention: ne pas faire confiance à ces données pour la sécurité)
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      id: payload.id,
      role: payload.role,
      email: payload.email,
      fullName: payload.fullName,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

// utils/auth.js
export function logout() {
  // 1. Supprimer le token
  localStorage.removeItem("jwtToken");

  // 2. Supprimer d'autres données utilisateur si nécessaire
  localStorage.removeItem("userData");

  // 3. Rediriger vers la page de login
  window.location.href = "/utilisateur/connexion/index.html";

  // 4. (Optionnel) Envoyer une requête au backend pour invalider le token
  // fetch('/api/auth/logout', { method: 'POST' });
}
