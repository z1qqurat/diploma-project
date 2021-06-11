const {  Model, DataTypes } = require('sequelize');
const dbWrapper = require('./dbWrapper');

class Order extends Model {}
Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    designer_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    device_type_id: DataTypes.INTEGER,
    style: DataTypes.STRING,
    description: DataTypes.STRING,
    due_date: DataTypes.DATE,
    price: DataTypes.INTEGER,
}, { sequelize: dbWrapper, modelName: 'orders' });

module.exports = Order;

