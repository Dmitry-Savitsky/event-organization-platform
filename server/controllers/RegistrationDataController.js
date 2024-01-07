const sequelize = require(`../db`)
const ApiError = require(`../error/ApiError`)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Client, RegistrationData, Company } = require('../models/models')

const generateJwt = (idRegistrationData, Status, idUser) => {
    return jwt.sign(
        {
            idreg: idRegistrationData,
            status: Status,
            userid: idUser
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '12h'
        }
    );
}

class RegistrationDataController {
  async registration(req, res, next) {
    try {
      const { login, password, status, clientName, clientPhone, companyName, companyPhone} = req.body;

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

      console.log(registrationData);

      // Генерация JWT токена
      const token = generateJwt(registrationData.idRegistrationData, status, TablePK);

      res.status(200).json({ token });

    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        return next(ApiError.badRequest(`Incorrect input...`));
      }

      // Поиск пользователя в таблице RegistrationData
      const user = await RegistrationData.findOne({ where: { Login: login } });

      if (!user) {
        return next(ApiError.internal(`User not found...`));
      }

      // Проверка пароля
      const passwordMatch = await bcrypt.compare(password, user.Password);

      if (!passwordMatch) {
        return next(ApiError.internal(`Invalid password...`));
      }

      // Генерация JWT токена
      const token = generateJwt(user.idRegistrationData, user.Status, user.idUser);

      res.status(200).json({ token });

    } catch (error) {
      console.error('Login error:', error);
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.role)
    return res.json({token})
  }
}

module.exports = new RegistrationDataController()