const Router = require(`express`);
const router = new Router

const ClientAddressController = require("../controllers/ClientAddressController");

router.post('/create', ClientAddressController.create);

router.get('/get', ClientAddressController.getAll);

router.delete('/delete', ClientAddressController.delete);

module.exports = router