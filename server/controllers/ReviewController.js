const { Review, Order, Client } = require(`../models/models`)
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
        try {
          const reviews = await Review.findAll({
            include: [
              { model: Client, attributes: ['idClient', 'ClientName', 'ClientPhone'] },
              { model: Order, attributes: ['idOrder', 'OrderComment', 'OrderStart', 'OrderEnd', 'OrderAddress'] },
            ],
          });
    
          res.json(reviews);
        } catch (error) {
          console.error('Error fetching reviews:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
    }

    async delete(req, res) {

    }
}

module.exports = new ReviewController()