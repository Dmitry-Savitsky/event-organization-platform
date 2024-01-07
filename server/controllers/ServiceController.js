const { Service } = require(`../models/models`)
const { Company } = require(`../models/models`)
const ApiError = require(`../error/ApiError`)
const uuid = require(`uuid`)
const path = require(`path`)


class ServiceController {
    async create(req, res) {
        const { ServiceName, ServiceType, ServicePrice, idCompany } = req.body;
        const { img } = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, `..`, `static`, fileName))

        try {
            const newService = await Service.create({ ServiceName, ServiceType, ServicePrice, img: fileName, idCompany }); //, img:fileName 
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

    async getOne(req, res) {
    try {
        const { id } = req.params;
        console.log("Received ID:", id); // Log the received ID for debugging

        const service = await Service.findByPk(id,  {
            include: [{ model: Company, attributes: ['idCompany', 'CompanyName', 'CompanyPhone'] }]
        });

        if (!service) {
            res.status(404).json({ message: 'Service not found' });
        } else {
            res.json(service);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving service' });
    }
}


    async delete(req, res) {

    }
}

module.exports = new ServiceController()