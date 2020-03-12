const Sequelize = require('sequelize');
const db = require('../db');

const Challenge = db.define('challenge', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Challenge;
