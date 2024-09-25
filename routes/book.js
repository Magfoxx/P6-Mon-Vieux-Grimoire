const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const bookCtrl = require('../controllers/book');

// Logique des routes books
router.get('/', bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.getBooksByBestRating);
router.get('/:id', bookCtrl.getBookById);
router.post('/', auth, multer, multer.resizeImage, bookCtrl.createBook);
router.put('/:id', auth, multer, multer.resizeImage, bookCtrl.updateBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);

module.exports = router;