const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    titre: { type: String, required: true },
    categorie: { type: String, required: true },
    annee: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
})

module.exports = mongoose.model('books', bookSchema);