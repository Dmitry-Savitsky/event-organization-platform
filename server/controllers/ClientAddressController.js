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
      // Реализация получения одной записи
    }
  
    async delete(req, res) {
      // Реализация удаления записи
    }
  }
  
  module.exports = new ClientAddressController();
  