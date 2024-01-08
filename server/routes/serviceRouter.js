const Router = require(`express`)
const router = new Router

const ServiceController = require("../controllers/ServiceController");

router.post('/create', ServiceController.create);

router.get('/get', ServiceController.get);

router.get('/:id', ServiceController.getOne);

router.delete('/:id', ServiceController.delete);

router.put('/update/:id', ServiceController.update);

module.exports = router