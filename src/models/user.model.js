const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db");
const withTenant = require("./withTenant");

const User = Sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  sellerName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sellerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailVerificationOtp: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
