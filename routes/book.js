const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/book');

// Route GET pour récupérer tous les livres
router.get('/', bookCtrl.getAllBooks);

// Route GET pour récupérer les 3 livres les mieux notés
router.get('/bestrating', bookCtrl.getBooksByBestRating);

// Route GET pour récupérer un livre spécifique par ID
router.get('/:id', bookCtrl.getBookById);

module.exports = router;