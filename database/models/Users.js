const sequelize = require('sequelize');
const connection = require('../database');

const Users = connection.define('users',{
    name: {
        type: sequelize.STRING,
    },
    email: {
        type: sequelize.STRING,
    },
    password: {
        type: sequelize.INTEGER, // password need be number
    }
});

connection.sync(); // força criar o banco

module.exports = Users;