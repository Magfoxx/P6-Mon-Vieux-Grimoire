const express = require("express");
const mongoose = require("mongoose");
const password = require("./utils/password");

const bookRoutes = require("./routes/book");

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


/* -------------------- AUTH ROUTES -------------------- */

// Route pour l'inscription (POST)
app.post('/api/auth/signup', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    // Logique pour créer un utilisateur et hacher le mot de passe.
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } else {
    res.status(400).json({ message: 'Données manquantes' });
  }
});

// Route pour la connexion (POST)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    // Logique pour la connexion (validation des identifiants).
    res.status(202).json({ message: 'Connexion réussie !' });
  } else {
    res.status(400).json({ message: 'Identifiants manquants' });
  }
});

/* -------------------- BOOK ROUTES -------------------- */

app.use('/api/books', bookRoutes);

// Exportation de l'application
module.exports = app;