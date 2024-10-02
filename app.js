require("dotenv").config(); // Charge les variables d'environnement à partir du fichier .env
const express = require("express");
const mongoose = require("mongoose");

// Récupération de la chaîne de connexion MongoDB depuis le fichier .env
const mongoUri = process.env.MONGO_URI;

const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");
const path = require("path");

// Connexion à MongoDB via l'URI
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));

const app = express();

// Middleware gérant les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Middleware pour extraire le corps JSON des requêtes POST
app.use(express.json());

// Définition des routes pour les livres et l'authentification des utilisateurs
app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);

// Gestion de la ressource images de manière statique
app.use("/images", express.static(path.join(__dirname, "images")));

// Exportation de l'application
module.exports = app;