const Router = require(`express`)
const router = new Router

const ExecutorController = require("../controllers/executorController");

router.post('/create', ExecutorController.create);

router.get('/get', ExecutorController.get);

router.delete('/delete', ExecutorController.delete);

module.exports = router