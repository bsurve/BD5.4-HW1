let sq = require("sequelize");
const { DataTypes } = require("../../BD5.4-HW1/lib");
let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  stroage: "./database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };