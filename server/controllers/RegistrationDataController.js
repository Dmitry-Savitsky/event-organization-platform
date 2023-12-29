const sequelize = require(`../db`)
const ApiError = require(`../error/ApiError`)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Client, RegistrationData, Company } = require('../models/models')

const generateJwt = (userId) => {
    const secretKey = 'your_secret_key'; // Замените на свой секретный ключ
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    return token;
};



class RegistrationDataController {
    async registration(req, res) {
        const t = await sequelize.transaction();    
        try {
          const { login, password, status, clientName, clientPhone, companyName, companyPhone, companyAddress } = req.body;
    
          if (!login || !password || !status) {
            return next(ApiError.badRequest(`Incorrect input...`));
          }
    
          // Проверка, существует ли login в таблице RegistrationData
          const existingUser = await RegistrationData.findOne({ where: { Login: login } });
    
          if (existingUser) {
            return next(ApiError.badRequest(`Login already exists...`));
          }
    
          let user;
          let TablePK;
    
          if (status === 1) {
            // Создание записи в таблице Client
            user = await Client.create(
              {
                ClientName: clientName,
                ClientPhone: clientPhone,
              }
            );
            TablePK = user.idClient;
          } else if (status === 2) {
            // Создание записи в таблице Company
            user = await Company.create(
              {
                CompanyName: companyName,
                CompanyPhone: companyPhone,
                CompanyAddress: companyAddress,
              }
            );
            TablePK = user.idCompany;
          } else {
            return res.status(400).json({ error: 'Invalid status' });
          }
    
          console.log("TABLEPK: " + TablePK);
    
          // Создание записи в таблице RegistrationData
          const hashedPassword = await bcrypt.hash(password, 10);
    
          const registrationData = await RegistrationData.create(
            {
              Login: login,
              Password: hashedPassword,
              Status: status,
              idUser: TablePK,
            }
          );
    
          // Генерация JWT токена
          const token = generateJwt(registrationData.idRegistrationData);
    
    
          res.status(200).json({ token });
    
        } catch (error) {
          console.error('Registration error:', error);
        }
    }

    async login(req, res) {

    }

    async auth(req, res, next) {
                const { id } = req.query;

                if (!id) {
                    console.error("ID is not set");
                    return next(ApiError.badRequest(`id is not set`));
                }

                console.log("ID is set:", id)
                res.json(id);
            }
        }

module.exports = new RegistrationDataController()