const sequelize = require('sequelize');
const connection = require('../database');

const Games = connection.define('games',{
    title: {
        type: sequelize.STRING,
    },
    year: {
        type: sequelize.INTEGER,
    },
    price: {
        type: sequelize.DECIMAL,
    }
});

connection.sync(); // força criar o banco

module.exports = Games;