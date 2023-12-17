const Router = require(`express`)
const router = new Router

router.post('/', (req, res) => {
});

router.get('/auth', (req, res) => {
    res.json({message: `client get router is working`})
});

router.delete('/:id', (req, res) => {
});

module.exports = router