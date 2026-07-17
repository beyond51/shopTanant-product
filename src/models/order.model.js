const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db");
const withTenant = require("./withTenant");

const Order = Sequelize.define(
  "Order",
  withTenant({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "customer", // matches Customer model tableName "customer"
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
     items: {
      type: DataTypes.JSONB,       //sabhi order maintain ke liye 
      allowNull: false,
      defaultValue: [],
    },

    status: {
      type: DataTypes.ENUM("Pending", "Processing", "Shipped", "Delivered", "Cancelled"),
      allowNull: false,
      defaultValue: "Pending",
    },
    paymentStatus: {
      type: DataTypes.ENUM("Pending", "Paid", "Failed", "Refunded"),
      allowNull: false,
      defaultValue: "Pending",
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    shippingAddress: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    billingAddress: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  }),
  {
    tableName: "orders",
    underscored: true,
    paranoid: true,
  }
);

module.exports = Order;