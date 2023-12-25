const sequelize = require(`../db`)
const {DataTypes} = require(`sequelize`)

const Client = sequelize.define('Client', {
    idClient: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ClientName: { type: DataTypes.STRING, allowNull: false },
    ClientPhone: { type: DataTypes.STRING(45), allowNull: false },
  });

const RegistrationData = sequelize.define('RegistrationData', {
    idRegistrationData: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Login: { type: DataTypes.STRING(45), allowNull: true },
    Password: { type: DataTypes.STRING(45), allowNull: true },
    Status: { type: DataTypes.INTEGER, allowNull: true },
    idUser: { type: DataTypes.INTEGER, allowNull: true },
  });
  
const Company = sequelize.define('Company', {
    idCompany: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    CompanyName: { type: DataTypes.STRING(45), allowNull: true },
    CompanyPhone: { type: DataTypes.STRING(15), allowNull: true },
    CompanyAddress: { type: DataTypes.STRING(150), allowNull: true },
  });
  
const Executor = sequelize.define('Executor', {
    idExecutor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ExecutorName: { type: DataTypes.STRING, allowNull: false },
    ExecutorPhone: { type: DataTypes.STRING(45), allowNull: false },
  });
  
const Service = sequelize.define('Service', {
    idService: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ServiceName: { type: DataTypes.STRING, allowNull: false },
    ServiceType: { type: DataTypes.INTEGER, allowNull: false },
    ServicePrice: { type: DataTypes.INTEGER, allowNull: true },
  });
  
const Order = sequelize.define('Order', {
    idOrder: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    OrderComment: { type: DataTypes.STRING(255), allowNull: true },
    OrderStart: { type: DataTypes.DATE, allowNull: false },
    OrderEnd: { type: DataTypes.DATE, allowNull: true },
    OrderAddress: { type: DataTypes.STRING(150), allowNull: false },
  });
  
const Review = sequelize.define('Review', {
    idReview: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ReviewText: { type: DataTypes.STRING(255), allowNull: true },
    ReviewRating: { type: DataTypes.INTEGER, allowNull: false },
  });
  
const ClientAddress = sequelize.define('ClientAddress', {
    idClientAddress: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ClientAddress: { type: DataTypes.STRING(150), allowNull: false },
    PrimaryClientAddress: { type: DataTypes.INTEGER, allowNull: true },
  });
  
const OrdersHasExecutor = sequelize.define('OrdersHasExecutor', {
    // Assuming `idOrders` and `idExecutor` are both INTEGER
    idOrdersHasExecutor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idOrders: { type: DataTypes.INTEGER, primaryKey: true },
    idExecutor: { type: DataTypes.INTEGER, primaryKey: true },
  });
  
  // Associations
Client.hasMany(ClientAddress, { foreignKey: 'idClient' });
ClientAddress.belongsTo(Client, { foreignKey: 'idClient' });
  
Executor.belongsTo(Company, { foreignKey: 'idCompany' });
Company.hasMany(Executor, { foreignKey: 'idCompany' });
  
Service.belongsTo(Company, { foreignKey: 'idCompany' });
Company.hasMany(Service, { foreignKey: 'idCompany' });
  
Order.belongsTo(Client, { foreignKey: 'idClients' });
Client.hasMany(Order, { foreignKey: 'idClients' });
  
Order.belongsTo(Service, { foreignKey: 'idServices' });
Service.hasMany(Order, { foreignKey: 'idServices' });
  
Review.belongsTo(Client, { foreignKey: 'idClients' });
Client.hasMany(Review, { foreignKey: 'idClients' });
  
Review.belongsTo(Order, { foreignKey: 'idOrders' });
Order.hasMany(Review, { foreignKey: 'idOrders' });
  
ClientAddress.belongsTo(Client, { foreignKey: 'idClient' });
Client.hasMany(ClientAddress, { foreignKey: 'idClient' });
  
OrdersHasExecutor.belongsTo(Order, { foreignKey: 'idOrders' });
OrdersHasExecutor.belongsTo(Executor, { foreignKey: 'idExecutor' });
  
Order.hasMany(OrdersHasExecutor, { foreignKey: 'idOrders' });
Executor.hasMany(OrdersHasExecutor, { foreignKey: 'idExecutor' });

module.exports = {
 Client,
 Company,
 Executor,
 Service,
 Order,
 Review,
 ClientAddress,
 OrdersHasExecutor,
 RegistrationData
}