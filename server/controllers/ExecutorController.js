const { Executor, Company } = require('../models/models');

class ExecutorController{
    async create(req, res) {
        const { ExecutorName, ExecutorPhone, idCompany } = req.body;

        try {
            const newExecutor = await Executor.create({
                ExecutorName,
                ExecutorPhone,
                idCompany
            });

            return res.json({ Executor: newExecutor });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating executor' });
        }
    }

    async get(req, res) {
        
    }

    async delete(req, res) {
        
    }
}

module.exports = new ExecutorController()