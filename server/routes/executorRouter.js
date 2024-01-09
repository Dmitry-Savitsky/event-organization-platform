const Router = require(`express`)
const router = new Router

const ExecutorController = require("../controllers/ExecutorController");

router.post('/create', ExecutorController.create);

router.get('/get', ExecutorController.get);

router.get('/:id', ExecutorController.getOne);

router.delete('/:id', ExecutorController.delete);

router.put('/update/:id', ExecutorController.update);

module.exports = router