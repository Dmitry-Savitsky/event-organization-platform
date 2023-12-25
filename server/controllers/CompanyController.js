const {Company} = require(`../models/models`)
const ApiError = require(`../error/ApiError`)
const uuid = require(`uuid`)
const path = require(`path`)

class CompanyController{
    async create(req, res) {
        const { CompanyName, CompanyPhone, CompanyAddress } = req.body;
        const { img } = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, `..`, `static`, fileName))

        try {
            const newCompany = await Company.create({ CompanyName, CompanyPhone, CompanyAddress, img:fileName }); //, img:fileName 
            return res.json({ Company: newCompany });
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
        
    }

    async getAll(req, res) {
        const companies = await Company.findAll()
        return res.json(companies)
    }

    async getOne(req, res) {
        
    }

    async delete(req, res) {
        
    }
}

module.exports = new CompanyController()