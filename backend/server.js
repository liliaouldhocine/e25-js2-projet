// Packages NPM
import express from "express";
import cors from "cors"; // Pour l'interprétation des headers
import morgan from "morgan";
import dotenv from "dotenv";
import "colors"; // Pour la coloration des logs

// Modules natifs
import path from "path";
import { fileURLToPath } from "url";

// Modules locaux
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

// Charger les variables d'environnement
dotenv.config({ path: "./.env" });

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5252;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("short"));
}

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is on http://localhost:${PORT}`.yellow.bold)
);
