const express = require("express");
const mongoose = require("mongoose");
const password = require("./utils/password");
const Book = require("./models/Book"); // Modèle des livres

// Connexion à la base de données
mongoose
  .connect(
    `mongodb+srv://magnusfox:${password}@cluster0.69g5w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
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

// Route GET pour récupérer les 3 livres les mieux notés
app.get('/api/books/bestrating', async (req, res) => {
  try {
    const books = await Book.find();
    // Vérifie si des livres ont été trouvés
    if (!books || books.length === 0) {
      return res.status(404).json({ message: 'Aucun livre trouvé' });
    }
    const sortedBooks = books.sort((a, b) => b.averageRating - a.averageRating);
    const topRatedBooks = sortedBooks.slice(0, 3); // Limitation à 3 Livres
    // Retourner les livres triés
    res.status(200).json(topRatedBooks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des livres', error: error.message });
  }
});

// Route GET pour récupérer tous les livres
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route GET pour récupérer un livre spécifique par ID
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Exportation de l'application
module.exports = app;