const Router = require(`express`)
const router = new Router

const OrderController = require("../controllers/orderController");

router.post('/create', OrderController.create);

router.get('/get', OrderController.get);

router.delete('/delete', OrderController.delete);

module.exports = router