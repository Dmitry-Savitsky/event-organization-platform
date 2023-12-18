const Router = require(`express`)
const router = new Router

const RegistrationDataController = require("../controllers/RegistrationDataController");
//правильно ли?
router.post('/registration', RegistrationDataController.registration);

router.post('/login', RegistrationDataController.login);

router.get('/auth', RegistrationDataController.auth);

module.exports = router