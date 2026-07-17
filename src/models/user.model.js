const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db");
const withTenant = require("./withTenant");

const User = Sequelize.define(
  "User",
  withTenant({
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
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }),
  {
    tableName: "users",
    underscored: true,
    timestamps: true,
  }
);

module.exports = User;