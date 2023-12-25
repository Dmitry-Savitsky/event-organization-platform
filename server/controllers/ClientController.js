const {Client} = require(`../models/models`)
const ApiError = require(`../error/ApiError`)
const uuid = require(`uuid`)
const path = require(`path`)

class ClientController{
    async create(req, res) {
        const { ClientName, ClientPhone} = req.body;
        const { img } = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, `..`, `static`, fileName))

        try {
            const newClient = await Client.create({ ClientName, ClientPhone, img:fileName }); //, img:fileName 
            return res.json({ Client: newClient });
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
        
    }

    async getAll(req, res) {
        
    }

    async getOne(req, res) {
        
    }

    async delete(req, res) {
        
    }
}

module.exports = new ClientController()