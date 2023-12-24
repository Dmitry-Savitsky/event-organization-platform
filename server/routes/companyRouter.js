const Router = require(`express`)
const router = new Router

const companyController = require("../controllers/companyController");

router.post('/', companyController.create);

router.get('/', companyController.getAll);

router.delete('/', companyController.delete);

module.exports = router