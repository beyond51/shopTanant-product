const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db");
const withTenant = require("./withTenant");

const Product = Sequelize.define(
  "Product",
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
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    compareAtPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    inventoryQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // categoryId: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    //   references: {
    //     model: "categories",
    //     key: "id",
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "SET NULL",
    // },
    status: {
      type: DataTypes.ENUM("Draft", "Active", "Archived"),
      allowNull: false,
      defaultValue: "Active",
    },
  }),
  {
    tableName: "products",
    underscored: true,
    paranoid: true,
  }
);
module.exports = Product;