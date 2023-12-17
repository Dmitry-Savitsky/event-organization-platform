const Router = require(`express`);
const router = new Router

const clientAddressController = require("../controllers/clientAddressController");

router.post('/create', clientAddressController.create);

router.get('/get', clientAddressController.get);

router.delete('/delete', clientAddressController.delete);

module.exports = router