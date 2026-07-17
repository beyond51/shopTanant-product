const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db");
const withTenant = require("./withTenant");

const Customer = Sequelize.define(
  "Customer",
  withTenant({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Active", "Suspended"),
      allowNull: false,
      defaultValue: "Active",
    },
  }),
  { 
    tableName: "customer",
     underscored: true, 
     paranoid: true
    
    },
);

module.exports = Customer