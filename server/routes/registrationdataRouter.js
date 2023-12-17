const Router = require(`express`)
const router = new Router

const registrationdataController = require("../controllers/registrationdataController");
//правильно ли?
router.post('/registration', registrationdataController.registration);

router.post('/login', registrationdataController.login);

router.get('/auth', registrationdataController.check);

module.exports = router