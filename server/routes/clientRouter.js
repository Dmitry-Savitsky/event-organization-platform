const Router = require(`express`)
const router = new Router

const ClientController = require("../controllers/ClientController");

router.post('/create', ClientController.create);

router.get('/get', ClientController.get);

router.delete('/delete', ClientController.delete);

module.exports = router