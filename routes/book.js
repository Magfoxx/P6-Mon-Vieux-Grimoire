const express = require("express");
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

const bookCtrl = require('../controllers/book');

// Route GET pour récupérer tous les livres
router.get('/', bookCtrl.getAllBooks);

// Route GET pour récupérer les 3 livres les mieux notés
router.get('/bestrating', bookCtrl.getBooksByBestRating);

// Route GET pour récupérer un livre spécifique par ID
router.get('/:id', bookCtrl.getBookById);

// Route POST pour créer un livre
router.post('/', auth, multer, bookCtrl.createBook);

// Route PUT pour mettre à jour un livre
router.put('/:id', auth, multer, bookCtrl.updateBook);

// Route DELETE pour supprimer un livre
router.delete('/:id', auth, bookCtrl.deleteBook);

// Route POST pour noter un livre
router.post('/:id/rating', auth, bookCtrl.rateBook);

module.exports = router;