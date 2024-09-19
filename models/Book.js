const mongoose = require('mongoose');

// Schéma d'un livre
const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  rating: [
    {
      userId: { type: String },
      rade: { type: Number },
    }
  ],
  averageRating: { type: Number }
});

// Exporter le modèle comme modèle réutilisable
module.exports = mongoose.model('book', bookSchema);