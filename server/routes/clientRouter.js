const Router = require(`express`)
const router = new Router

const ClientController = require("../controllers/ClientController");

router.post('/', ClientController.create);

router.get('/get', ClientController.getAll);

router.delete('/delete', ClientController.delete);

module.exports = router