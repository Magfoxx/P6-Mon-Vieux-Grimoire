const express = require('express');
const app = express();

// Récupération des livres depuis le frontend (provisoire)
const books = require('../frontend/public/data/data.json');

app.use(express.json());


// Route des 3 meilleurs livres (GET)
app.get('/api/books/bestRating', (req, res) => {
  const topRatedBooks = books
    .sort((a, b) => b.averageRating - a.averageRating) // Tri par averageRating décroissant
    .slice(0, 3); // Ne garder que les 3 meilleurs
    console.log('Les 3 livres on été récupéré avec succès !');
  res.status(200).json(topRatedBooks); // Envoyer les 3 meilleurs livres
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
  res.status(404).json({ message: 'Livre non trouvé !' });
 }
});



module.exports = app;