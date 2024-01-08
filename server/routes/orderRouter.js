const Router = require(`express`)
const router = new Router

const OrderController = require("../controllers/OrderController");

router.post('/create', OrderController.create);

router.get('/get', OrderController.get);

router.delete('/delete', OrderController.delete);

router.put('/updateExecutor/:id/:newExecutorId', OrderController.updateExecutor);


module.exports = router 