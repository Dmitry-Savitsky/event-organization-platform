const Router = require(`express`)
const router = new Router

const clientRouter = require(`./clientRouter`);
const companyRouter = require(`./companyRouter`);
const executorRouter = require(`./executorRouter`);
const serviceRouter = require(`./serviceRouter`);
const orderRouter = require(`./orderRouter`);
const reviewRouter = require(`./reviewRouter`);
const clientaddressRouter = require(`./clientaddressRouter`);
const ordersHasExecutorRouter = require(`./ordersHasExecutorRouter`);

router.use(`/client`, clientRouter)
router.use(`/company`, companyRouter)
router.use(`/executor`, executorRouter)
router.use(`/service`, serviceRouter)
router.use(`/order`, orderRouter)
router.use(`/review`, reviewRouter)
router.use(`/clientaddress`, clientaddressRouter)
router.use(`/ordershasexecutor`, ordersHasExecutorRouter)

module.exports = router