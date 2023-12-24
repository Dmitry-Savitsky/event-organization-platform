const Router = require(`express`)
const router = new Router

const ReviewController = require("../controllers/reviewController");

router.post('/create', ReviewController.create);

router.get('/get', ReviewController.get);

router.delete('/delete', ReviewController.delete);

module.exports = router