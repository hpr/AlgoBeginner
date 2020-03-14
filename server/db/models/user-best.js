const Sequelize = require('sequelize');
const db = require('../db');

const UserBest = db.define('userBest', {
  time: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  code: {
    type: Sequelize.TEXT
  }
});

module.exports = UserBest;
