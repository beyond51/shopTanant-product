const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db");

const UserTenant = Sequelize.define(
  "UserTenant",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    tenantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "tenants",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      default: "admin",
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "tenantId"],
      },
    ],
  },
);

module.exports = UserTenant;
