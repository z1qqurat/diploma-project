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
    contact_info: DataTypes.STRING,
    style: DataTypes.STRING,
    description: DataTypes.STRING,
    from_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    price_low: DataTypes.INTEGER,
    price_high: DataTypes.INTEGER
}, { sequelize: dbWrapper, modelName: 'orders' });

module.exports = Order;

