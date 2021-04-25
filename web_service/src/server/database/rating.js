const {  Model, DataTypes } = require('sequelize');
const dbWrapper = require('./dbWrapper');

class Rating extends Model {}
Rating.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    designer_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER
}, { sequelize: dbWrapper, modelName: 'ratings' });

module.exports = Rating;

