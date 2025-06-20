const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');

const auth = require('../middleware/auth');

router.get('/', auth, booksController.getAllBooks);
router.post("/", auth, booksController.createBook);
router.put('/:id', auth,  booksController.updateBook);
router.delete('/:d', auth, booksController.deleteBook);

module.exports = router;