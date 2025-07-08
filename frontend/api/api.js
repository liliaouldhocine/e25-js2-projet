import { env } from "../src/config/env.js";
import { logout } from "../utils/auth.js";

export default async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("jwtToken");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expiré ou invalide
    logout();
    throw new Error("Session expirée");
  }

  return response;
}

// frontend/js/auth.js
export async function checkAuth(requiredRole) {
  try {
    const response = await fetch(`${env.BACKEND_AUTH_URL}/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    });

    if (!response.ok) {
      logout(); // Fonction qui supprime le JWT et redirige
      return false;
    }

    const user = await response.json();
    console.log(user);

    if (requiredRole && !requiredRole.includes(user.user.role)) {
      window.location.href = "/index.html";
      return false;
    }

    return true;
  } catch (error) {
    logout();
    return false;
  }
}
