const {ClientAddress: ClientAddressModel} = require(`../models/models`)
const ApiError = require(`../error/ApiError`)
const uuid = require(`uuid`)
const path = require(`path`)

class ClientAddressController {
    async create(req, res) {
      const { ClientAddress, PrimaryClientAddress, idClient } = req.body;
      
        try {
            const newClientAddress = await ClientAddressModel.create({ ClientAddress, PrimaryClientAddress, idClient }); //, img:fileName 
            return res.json({ ClientAddress: newClientAddress });
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
  
    async getAll(req, res) {
      const{idClient} = req.body
      let addresses;

      if(!idClient){
        addresses = await ClientAddressModel.findAll()
      }
      if(idClient){
        addresses = await ClientAddressModel.findAll({where: {idClient}})
      }
      return res.json({ addresses });
    }
  
    async getOne(req, res) {
      try {
        const { idClientAddress } = req.params; // Assuming idClientAddress is passed as a route parameter
        if (!idClientAddress) {
          return res.status(400).json({ error: "idClientAddress is required" });
        }
    
        const address = await ClientAddressModel.findOne({
          where: { idClientAddress },
        });
    
        if (!address) {
          return res.status(404).json({ error: "Address not found" });
        }
    
        return res.json({ address });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
    
  
    async delete(req, res) {
      // Реализация удаления записи
    }
  }
  
  module.exports = new ClientAddressController();
  