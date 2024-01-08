const { Service } = require(`../models/models`)
const { Company } = require(`../models/models`)
const ApiError = require(`../error/ApiError`)
const uuid = require(`uuid`)
const path = require(`path`)


class ServiceController {
    
    async create(req, res, next) {
        const { ServiceName, ServiceType, ServicePrice, idCompany } = req.body;
        const { img } = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, `..`, `static`, fileName))

        try {
            const newService = await Service.create({ ServiceName, ServiceType, ServicePrice, img: fileName, idCompany }); 
            return res.json({ Service: newService });
        } catch (error) {
            return res.json({ error });
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

            const service = await Service.findByPk(id, {
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

    async update(req, res, next) {
        const { serviceId } = req.params; // Assuming you have the serviceId in the request parameters
        const { ServiceName, ServiceType, ServicePrice} = req.body;
    
        try {
            // Check if the service with the given ID exists
            const existingService = await Service.findByPk(serviceId);
            if (!existingService) {
                return res.status(404).json({ error: 'Service not found' });
            }
    
            // Update the service properties
            existingService.ServiceName = ServiceName;
            existingService.ServiceType = ServiceType;
            existingService.ServicePrice = ServicePrice;
    
            // Save the changes
            await existingService.save();
    
            return res.json({ Service: existingService });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
    


    async delete(req, res) {
        try {
            const { id } = req.params;
    
            // Check if the service exists
            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }
    
            // Delete the service
            await Service.destroy({
                where: { idService: id }
            });
    
            res.status(204).json({ message: 'Service deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting service' });
        }
    }
}

module.exports = new ServiceController()