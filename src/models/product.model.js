const { DataTypes, ENUM } = require("sequelize");
const Sequelize = require("../config/db");
const withTenant = require("./withTenant");

const Product = Sequelize.define(
  "product",
  withTenant({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        "fashion",
        "food",
        "electronics",
        "decoration",
        "cosmetics",
        "educational",
      ),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    oldPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    sellingPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    images: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
    },
    status: {
      type: DataTypes.ENUM("Draft", "Active", "Archived"),
      allowNull: false,
      defaultValue: "Active",
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
  }),
  {
    tableName: "products",
    paranoid: true,
  },
);
module.exports = Product;
