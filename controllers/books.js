const Book = require('../schemas/books');

exports.getAllBooks = (req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.json(error));
}

exports.createBook = (req, res) => {
    const book = new Book({
      ...req.body,
    });
    
    book.save()
      .then((data) => res.status(202).json(data))
      .catch((error) => res.json(error));
}

exports.updateBook = (req, res) => {
    Book.updateOne(
      {
        _id: req.params.id,
      },
      {
        _id: req.params.id,
        ...req.body,
      }
    )
      .then((data) =>
        res.status(200).json(data)
      )
      .catch((error) => res.status(400).json(error));
}

exports.deleteBook = (req, res) => {
    Book.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Livre supprimé avec succès" }))
      .catch((error) => res.json(error));
}