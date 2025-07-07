import express from "express";
import { register, login, getMe } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/inscription", register);
router.post("/connexion", login);
router.get("/me", protect, getMe);

export default router;
