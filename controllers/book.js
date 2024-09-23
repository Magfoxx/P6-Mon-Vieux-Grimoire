const Book = require("../models/Book");

// Obtenir la liste de tous les livres
exports.getAllBooks = (req, res, next) => {
  // Logique pour obtenir la liste des livres depuis la base de données
  Book.find()
    .then((books) => {
      if (books.length === 0) {
        return res.status(404).json({ message: "Aucun livre trouvé." });
      }
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Une erreur est survenue lors de la récupération des livres.",
        error: error,
      });
    });
};

// Obtenir les détails d'un livre spécifique
exports.getBookById = (req, res, next) => {
  const bookId = req.params.id;
  Book.findById(bookId)
    .then((book) => {
      if (!book) {
        return res
          .status(404)
          .json({ message: "Livre non trouvé !", error: error });
      }
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Une erreur est survenue lors de la récupération du livre",
        error: error
      });
    });
};

// Obtenir la liste des livres ayant la meilleure note
exports.getBooksByBestRating = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) =>
      res.status(500).json({
        message:
          "Une errur est survenue lors de la récupération des livres avec la meilleure note",
        error: error
      })
    );
};
