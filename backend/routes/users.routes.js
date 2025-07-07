import express from "express";
const router = express.Router();

import {
  creerUnUtilisateur,
  listerTousLesUtilisateurs,
  obtenirUnUtilisateur,
  mettreAJourUnUtilisateur,
  supprimerUnUtilisateur,
  trouverParEmail,
} from "../controllers/user.controller.js";
import { protect, restrictTo } from "../middlewares/auth.js";

// POST / - Créer un utilisateur
router.post("/", protect, restrictTo("admin"), creerUnUtilisateur);

// GET / - Lister tous les utilisateurs
router.get("/", protect, restrictTo("admin"), listerTousLesUtilisateurs);

// GET //:id - Obtenir un utilisateur
router.get("/:id", protect, restrictTo("admin"), obtenirUnUtilisateur);

// PUT //:id - Mettre à jour un utilisateur
router.put("/:id", protect, restrictTo("admin"), mettreAJourUnUtilisateur);

// DELETE //:id - Supprimer un utilisateur
router.delete("/:id", protect, restrictTo("admin"), supprimerUnUtilisateur);

// GET //email/:email - Trouver par email
router.get("/email/:email", protect, restrictTo("admin"), trouverParEmail);

export default router;
