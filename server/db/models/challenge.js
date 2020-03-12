const Sequelize = require('sequelize');
const db = require('../db');

const Challenge = db.define('challenge', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  functionName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = Challenge;
