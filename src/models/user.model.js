const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db");
const Withtenant = require("./withTenant");

const User = Sequelize.define(
  "User",
  Withtenant({
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
  }),
  {
    indexes: [
      {
        unique: true,
        fields: ["tenantId", "sellerEmail"],
      },
    ],
  },
);
module.exports = User;
