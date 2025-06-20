const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviews');
const auth = require('../middleware/auth');

router.post('/', auth, reviewController.createReview);
router.get('/:id', auth, reviewController.getAllReviewByBookId);

module.exports = router;