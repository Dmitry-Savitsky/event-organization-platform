const ApiError = require(`../error/ApiError`)

class RegistrationDataController{
    async registration(req, res) {
        
    }

    async login(req, res) {
        
    }

    async auth(req, res, next) {
        const { id } = req.query;
    
        if (!id) {
            console.error("ID is not set");
            return next(ApiError.badRequest(`id is not set`));
        }
    
        console.log("ID is set:", id)
        res.json(id);
    }
}

module.exports = new RegistrationDataController()