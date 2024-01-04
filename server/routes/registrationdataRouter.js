const Router = require(`express`)
const router = new Router
const AuthMiddleware = require(`../middleware/AuthMiddleware`)

const RegistrationDataController = require("../controllers/RegistrationDataController");

router.post('/registration', RegistrationDataController.registration);

router.post('/login', RegistrationDataController.login);

router.get('/auth', AuthMiddleware, RegistrationDataController.check);

module.exports = router