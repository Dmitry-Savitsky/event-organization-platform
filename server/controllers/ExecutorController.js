const { Executor } = require(`../models/models`);
const { Company } = require(`../models/models`);
const ApiError = require(`../error/ApiError`);
const uuid = require(`uuid`);
const path = require(`path`);

class ExecutorController {
    async create(req, res, next) {
        const { ExecutorName, ExecutorPhone, idCompany } = req.body;

        try {
            const newExecutor = await Executor.create({
                ExecutorName,
                ExecutorPhone,
                idCompany,
            });
            return res.json({ Executor: newExecutor });
        } catch (error) {
            return res.json({ error });
        }
    }

    async get(req, res) {
        try {
            const executors = await Executor.findAll();

            const transformedExecutors = executors.map((executor) => ({
                idExecutor: executor.idExecutor,
                executorName: executor.ExecutorName,
                executorPhone: executor.ExecutorPhone,
            }));

            res.status(200).json(transformedExecutors);
        } catch (error) {
            console.error(error);
            res.status(500).json(ApiError.internal('Internal Server Error'));
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            console.log("Received ID:", id); // Log the received ID for debugging

            const executor = await Executor.findByPk(id, {
                include: [{ model: Company, attributes: ['idCompany', 'CompanyName', 'CompanyPhone'] }],
            });

            if (!executor) {
                res.status(404).json({ message: 'Executor not found' });
            } else {
                res.json(executor);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving executor' });
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { executorName, executorPhone } = req.body;

        try {
            const existingExecutor = await Executor.findByPk(id);
            if (!existingExecutor) {
                return res.status(404).json({ error: 'Executor not found' });
            }

            existingExecutor.ExecutorName = executorName;
            existingExecutor.ExecutorPhone = executorPhone;

            await existingExecutor.save();

            return res.json({ Executor: existingExecutor });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const executor = await Executor.findByPk(id);
            if (!executor) {
                return res.status(404).json({ message: 'Executor not found' });
            }

            await Executor.destroy({
                where: { idExecutor: id },
            });

            res.status(204).json({ message: 'Executor deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting executor' });
        }
    }
}

module.exports = new ExecutorController();
