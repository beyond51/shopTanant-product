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
<<<<<<< HEAD
      allowNull: false,
      validate: {
        isEmail: true,
      },
=======
      unique: true,
      allowNull: false,
>>>>>>> upstream/main
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }),
  {
<<<<<<< HEAD
    indexes: [
      {
        unique: true,
        fields: ["tenantId", "sellerEmail"],
      },
    ],
  },
=======
    tableName: "users",
    underscored: true,
    timestamps: true,
  }
>>>>>>> upstream/main
);

module.exports = User;