const {  Model, DataTypes } = require('sequelize');
const dbWrapper = require('./dbWrapper');

class Media extends Model {}
Media.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    title: DataTypes.STRING,
    creation_date: DataTypes.DATE
}, { sequelize: dbWrapper, modelName: 'media' });

module.exports = Media;

