const { Review } = require(`../models/models`)
const ApiError = require(`../error/ApiError`)

class ReviewController {
    async create(req, res) {
        const { ReviewText, ReviewRating, idClients, idOrders } = req.body;

        try {
            const newReview = await Review.create({
                ReviewText,
                ReviewRating,
                idClients,
                idOrders,
            });

            return res.json({ Review: newReview });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating review' });
        }
    }

    async get(req, res) {

    }

    async delete(req, res) {

    }
}

module.exports = new ReviewController()