const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'books', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    comment: { type: String, required: true },
    note: { type: Number, required: true, min: 1, max: 5 },
    dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('reviews', reviewSchema);