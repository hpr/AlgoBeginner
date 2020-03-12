const Sequelize = require('sequelize');
const db = require('../db');

const Assertion = db.define('assertion', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  input: {
    type: Sequelize.STRING
  },
  output: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Assertion;
