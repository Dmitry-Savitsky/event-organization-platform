const Router = require(`express`)
const router = new Router // создаем обьект роутера из экспресса

const clientRouter = require(`./clientRouter`);
const companyRouter = require(`./companyRouter`);
const executorRouter = require(`./executorRouter`);
const serviceRouter = require(`./serviceRouter`);
const orderRouter = require(`./orderRouter`);
const reviewRouter = require(`./reviewRouter`);
const clientAddressRouter = require(`./clientAddressRouter`);
const ordersHasExecutorRouter = require(`./ordersHasExecutorRouter`);
const registrationDataRouter = require(`./registrationDataRouter`);

//RegistrationData
//registrationDataRouter
//clientAddressRouter

router.use(`/client`, clientRouter)
router.use(`/company`, companyRouter)
router.use(`/executor`, executorRouter)
router.use(`/service`, serviceRouter)
router.use(`/order`, orderRouter)
router.use(`/review`, reviewRouter)
router.use(`/clientaddress`, clientAddressRouter)
router.use(`/ordershasexecutor`, ordersHasExecutorRouter)
router.use(`/registrationdata`, registrationDataRouter)

module.exports = router 
