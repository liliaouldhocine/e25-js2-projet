import express from "express";
const router = express.Router();

import {
  creerProduit,
  listerTousLesProduits,
  produitsDisponibles,
  obtenirUnProduit,
  mettreAJourUnProduit,
  metterAJourLeStock,
  supprimerUnProduit,
  rechercheDeProduits,
} from "../controllers/produit.controller.js";
import { protect, restrictTo } from "../middlewares/auth.js";

// POST /products - Créer un produit
router.post("/", protect, restrictTo("admin"), creerProduit);

// GET /products - Lister tous les produits
router.get("/", listerTousLesProduits);

// GET /products/available - Produits disponibles
router.get("/available", produitsDisponibles);

// GET /products/:id - Obtenir un produit
router.get("/:id", obtenirUnProduit);

// PUT /products/:id - Mettre à jour un produit
router.put("/:id", protect, restrictTo("admin"), mettreAJourUnProduit);

// PATCH /products/:id/stock - Mettre à jour le stock
router.patch("/:id/stock", protect, restrictTo("admin"), metterAJourLeStock);

// DELETE /products/:id - Supprimer un produit
router.delete("/:id", protect, restrictTo("admin"), supprimerUnProduit);

// GET /products/search/:query - Recherche de produits
router.get("/search/:query", rechercheDeProduits);

export default router;
