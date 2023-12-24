const Router = require(`express`)
const router = new Router

const OrderHasExecutorController = require("../controllers/ordersHasExecutorController");

router.post('/create', OrderHasExecutorController.create);

router.get('/get', OrderHasExecutorController.get);

router.delete('/delete', OrderHasExecutorController.delete);

module.exports = router