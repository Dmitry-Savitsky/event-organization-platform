const Router = require(`express`)
const router = new Router

const ServiceController = require("../controllers/serviceController");

router.post('/create', ServiceController.create);

router.get('/get', ServiceController.get);

router.delete('/delete', ServiceController.delete);

module.exports = router