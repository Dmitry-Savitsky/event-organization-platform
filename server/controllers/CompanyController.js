const {Company} = require(`../models/models`)
const ApiError = require(`../error/ApiError`)
class CompanyController{
    async create(req, res) {
        const { CompanyName, CompanyPhone, CompanyAddress } = req.body;

        try {
            const newCompany = await Company.create({ CompanyName, CompanyPhone, CompanyAddress });
            return res.json({ Company: newCompany });
        } catch (error) {
            console.error(error);  // Вывод ошибки в консоль для отладки
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
        
    }

    async getAll(req, res) {
        
    }

    async delete(req, res) {
        
    }
}

module.exports = new CompanyController()