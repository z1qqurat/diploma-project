
const { Sequelize } = require('sequelize');

module.exports = new Sequelize('m_project', 'admin', 'admin', {
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});