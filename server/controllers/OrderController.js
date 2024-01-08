const { Order, Executor, Client, Service, Company } = require('../models/models'); // Assuming you have the models imported
const ApiError = require(`../error/ApiError`)

class OrderController{
    async create(req, res) {
        const { OrderComment, OrderStart, OrderEnd, OrderAddress, idClients, idServices } = req.body;
    
        try {
            const newOrder = await Order.create({
                OrderComment,
                OrderStart,
                OrderEnd,
                OrderAddress,
                idClients,
                idServices
            });
    
            return res.json({ Order: newOrder });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating order' });
        }
    }

    async updateExecutor(req, res) {

        const { id, newExecutorId } = req.params;
    
        try {
            // Find the order by its ID
            const orderToUpdate = await Order.findByPk(id);
    
            // Check if the order exists
            if (!orderToUpdate) {
                return res.status(404).json({ message: 'Order not found' });
            }
    
            // Find the new executor by ID
            const newExecutor = await Executor.findByPk(newExecutorId);
    
            // Check if the new executor exists
            if (!newExecutor) {
                return res.status(404).json({ message: 'Executor not found' });
            }
    
            // Update the order's idExecutor with the new executor's ID
            await orderToUpdate.update({ idExecutor: newExecutorId });
    
            // Fetch the updated order to include associated data
            const updatedOrder = await Order.findByPk(id, {
                include: [
                    { model: Executor, attributes: ['idExecutor', /* other attributes */] },
                    // ... other includes for additional associations
                ]
            });
    
            return res.json({ Order: updatedOrder });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating order' });
        }
    }

    async get(req, res) {
        try {
            const orders = await Order.findAll({
                include: [
                    {
                        model: Service,
                        include: {
                            model: Company,
                            attributes: ['idCompany', 'CompanyName', 'CompanyPhone'],
                        },
                    },
                    {
                        model: Executor,
                        include: {
                            model: Company,
                            attributes: ['idCompany', 'CompanyName', 'CompanyPhone'],
                        },
                    },
                ],
            });
    
            const transformedOrders = orders.map((order) => ({
                idOrder: order.idOrder,
                OrderComment: order.OrderComment,
                OrderStart: order.OrderStart,
                OrderEnd: order.OrderEnd,
                OrderAddress: order.OrderAddress,
                idExecutor: order.idExecutor,
                idClients: order.idClients,
                idServices: order.idServices,
                // Include service information
                Service: {
                    idService: order.Service.idService,
                    ServiceName: order.Service.ServiceName,
                    ServiceType: order.Service.ServiceType,
                    ServicePrice: order.Service.ServicePrice,
                    img: order.Service.img,
                    // Include company information for the service
                    Company: {
                        idCompany: order.Service.Company.idCompany,
                        CompanyName: order.Service.Company.CompanyName,
                        CompanyPhone: order.Service.Company.CompanyPhone,
                    },
                },
                // Include executor information if exists
                Executor: order.Executor
                    ? {
                          idExecutor: order.Executor.idExecutor,
                          ExecutorName: order.Executor.ExecutorName,
                          ExecutorPhone: order.Executor.ExecutorPhone,
                          // Include company information for the executor
                          Company: {
                              idCompany: order.Executor.Company.idCompany,
                              CompanyName: order.Executor.Company.CompanyName,
                              CompanyPhone: order.Executor.Company.CompanyPhone,
                          },
                      }
                    : null,
            }));
    
            res.status(200).json(transformedOrders);
        } catch (error) {
            console.error(error);
            res.status(500).json(ApiError.internal('Internal Server Error'));
        }
    }

    async delete(req, res) {
        
    }
}

module.exports = new OrderController()