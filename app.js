const express = require("express");
const mongoose = require("mongoose");
const password = require("./utils/password");

const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

// Connexion à la base de données
mongoose
  .connect(
    `mongodb+srv://magnusfox:${password}@cluster0.69g5w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Création de l'application
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

// Middleware pour extraire le corps JSON des requêtes
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);

// Exportation de l'application
module.exports = app;