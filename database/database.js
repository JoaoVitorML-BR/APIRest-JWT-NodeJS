// making the database connection
const sequelize = require('sequelize');
const connection = new sequelize('apirest', 'root', '1904', {
    dialect: 'mysql',
    host: 'localhost',
    timezone: '-03:00'
});

module.exports = connection;