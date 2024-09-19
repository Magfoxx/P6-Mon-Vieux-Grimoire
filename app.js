const express = require('express');
const mongoose = require('mongoose');
const password = require('./utils/password');

const Book = require('./models/Book');

// Connexion à la base de données
mongoose.connect(`mongodb+srv://magnusfox:${password}@cluster0.69g5w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  { useNewUrlParser: true, // Obsolète depuis la version 4.0.0 de Node.js
    useUnifiedTopology: true }) // Obsolète depuis la version 4.0.0 de Node.js
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Création de l'application
const app = express();
// Middleware permettant à Express d'extraire le corps JSON des requêtes POST
app.use(express.json());

// Middleware gérant les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



// Création des livres (provisoire)
const books = [
  {
    "id": "1",
    "userId": "clc4wj5lh3gyi0ak4eq4n8syr",
    "title": "Milwaukee Mission",
    "author": "Elder Cooper",
    "imageUrl": "https://via.placeholder.com/206x260",
    "year": 2021,
    "genre": "Policier",
    "ratings": [
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "clc4wj5lh3gyi0ak4eq4n8syr", "grade": 5 },
      { "userId": "1", "grade": 5 }
    ],
    "averageRating": 3
  },
  {
    "id": "2",
    "userId": "clbxs3tag6jkr0biul4trzbrv",
    "title": "Book for Esther",
    "author": "Alabaster",
    "imageUrl": "https://via.placeholder.com/206x260",
    "year": 2022,
    "genre": "Paysage",
    "ratings": [
      { "userId": "clbxs3tag6jkr0biul4trzbrv", "grade": 4 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 }
    ],
    "averageRating": 4.2
  },
  {
    "id": "3",
    "userId": "1",
    "title": "The Kinfolk Table",
    "author": "Nathan Williams",
    "imageUrl": "https://via.placeholder.com/206x260",
    "year": 2022,
    "genre": "Cuisine",
    "ratings": [
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 }
    ],
    "averageRating": 3
  },
  {
    "id": "4",
    "userId": "1",
    "title": "Milwaukee Mission",
    "author": "Elder Cooper",
    "imageUrl": "https://via.placeholder.com/206x260",
    "year": 2021,
    "genre": "Policier",
    "ratings": [
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 }
    ],
    "averageRating": 3
  },
  {
    "id": "5",
    "userId": "1",
    "title": "Book for Esther",
    "author": "Alabaster",
    "imageUrl": "https://via.placeholder.com/206x260",
    "year": 2022,
    "genre": "Paysage",
    "ratings": [
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 }
    ],
    "averageRating": 4
  },
  {
    "id": "6",
    "userId": "1",
    "title": "The Kinfolk Table",
    "author": "Nathan Williams",
    "imageUrl": "https://via.placeholder.com/206x260",
    "year": 2022,
    "genre": "Cuisine",
    "ratings": [
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 }
    ],
    "averageRating": 3
  },
  {
    "id": "7",
    "userId": "1",
    "title": "Milwaukee Mission",
    "author": "Elder Cooper",
    "imageUrl": "https://via.placeholder.com/206x260",
    "year": 2021,
    "genre": "Policier",
    "ratings": [
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 }
    ],
    "averageRating": 3
  },
  {
    "id": "8",
    "userId": "clc7s9xnh7zpt0ak4fisdwuj1",
    "title": "Book for Esther",
    "author": "Alabaster",
    "imageUrl": "https://via.placeholder.com/206x260",
    "year": 2022,
    "genre": "Paysage",
    "ratings": [
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 }
    ],
    "averageRating": 4
  },
  {
    "id": "9",
    "userId": "clc4wj5lh3gyi0ak4eq4n8syr",
    "title": "The Kinfolk Table",
    "author": "Nathan Williams",
    "imageUrl": "https://via.placeholder.com/206x260",
    "year": 2022,
    "genre": "Cuisine",
    "ratings": [
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "1", "grade": 5 },
      { "userId": "clc4wj5lh3gyi0ak4eq4n8syr", "grade": 1 }
    ],
    "averageRating": 3
  }
];

// Route des 3 meilleurs livres (GET)
app.get('/api/books/bestRating', (req, res) => {
  const topRatedBooks = books
    .sort((a, b) => b.averageRating - a.averageRating) // Tri par averageRating décroissant
    .slice(0, 3); // Ne garder que les 3 meilleurs
    console.log('Les 3 livres on été récupéré avec succès !');
  res.status(200).json(topRatedBooks); // Renvoie les 3 meilleurs livres
});

// Route de récupération des livres (GET)
app.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

// Route de récupération d'un livre spécifique par son id (GET)
app.get('/api/books/:id', (req, res) => {
  const bookId = req.params.id;
  const book = books.find(b => b.id === bookId);
  if (book) {
    res.status(200).json(book);
  } else {
    console.log('Livre non trouvé');
    res.status(404).json({ message: 'Livre non trouvé !' });
  }
});



module.exports = app;