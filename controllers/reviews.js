const Review = require('../schemas/reviews');

exports.createReview = (req, res) => {
    const review = new Review({
      ...req.body,
    });
    review
      .save()
      .then((data) => res.status(200).json(data))
      .catch((error) => res.json(error));

}

exports.getAllReviewByBookId = (req, res) => {
    Review.find({ bookId: req.params.bookId })
        .then((data) => res.status(200).json(data))
        .catch(error => res.json(error));
}