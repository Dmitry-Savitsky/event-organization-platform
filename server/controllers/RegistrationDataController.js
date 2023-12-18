const ApiError = require(`../error/ApiError`)

class RegistrationDataController{
    async registration(req, res) {
        
    }

    async login(req, res) {
        
    }

    async auth(req, res, next) {
        //res.json(`CHECK reg data controller test`)
        const {id} = req.query
        if(!id){
           return next(ApiError.badRequest("id is not set"))
        }
        res.json(id)
        
    }
}

module.exports = new RegistrationDataController()