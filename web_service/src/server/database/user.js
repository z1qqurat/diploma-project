const {  Model, DataTypes } = require('sequelize');
const dbWrapper = require('./dbWrapper');

class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    creation_date: DataTypes.DATE,
    role_id: DataTypes.INTEGER,
    avatar_url: DataTypes.STRING,
    password_hash: DataTypes.STRING,
}, { sequelize: dbWrapper, modelName: 'users' });

module.exports = User;

