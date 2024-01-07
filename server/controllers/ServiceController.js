const { Service } = require(`../models/models`)
const ApiError = require(`../error/ApiError`)
const uuid = require(`uuid`)
const path = require(`path`)


class ServiceController {
    async create(req, res) {
        const { ServiceName, ServiceType, ServicePrice } = req.body;
        const { img } = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, `..`, `static`, fileName))

        try {
            const newService = await Service.create({ ServiceName, ServiceType, ServicePrice, img: fileName }); //, img:fileName 
            return res.json({ Service: newService });
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async get(req, res) {
        try {
            const services = await Service.findAll();

            const transformedServices = services.map((service) => ({
                idService: service.idService,
                serviceName: service.ServiceName,
                serviceType: service.ServiceType,
                servicePrice: service.ServicePrice,
                img: service.img
            }));

            res.status(200).json(transformedServices);
        } catch (error) {
            console.error(error);
            res.status(500).json(ApiError.internal('Internal Server Error'));
        }
    }

    async delete(req, res) {

    }
}

module.exports = new ServiceController()