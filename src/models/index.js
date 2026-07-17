const sequelize = require("../config/db.js");

// 🛢️ 1. Models Import
const Tenant = require("./tenant.model.js");
const User = require("./user.model.js");
const Customer = require("./customer.model.js");
const Product = require("./product.model.js");
const Order = require("./order.model.js");
// const OrderItem = require("./orderItem.model.js");

Tenant.hasMany(User, { foreignKey: "tenantId", as: "members" });
User.belongsTo(Tenant, { foreignKey: "tenantId", as: "organization" });

Tenant.hasMany(Product, { foreignKey: "tenantId", as: "products" });
Product.belongsTo(Tenant, { foreignKey: "tenantId", as: "organization" });

Tenant.hasMany(Customer, { foreignKey: "tenantId", as: "customers" });
Customer.belongsTo(Tenant, { foreignKey: "tenantId", as: "organization" });

Tenant.hasMany(Order, { foreignKey: "tenantId", as: "orders" });
Order.belongsTo(Tenant, { foreignKey: "tenantId", as: "organization" });

// Tenant.hasMany(OrderItem, { foreignKey: "tenantId", as: "orderItems" });
// OrderItem.belongsTo(Tenant, { foreignKey: "tenantId", as: "organization" });

// --- Customer & Order Relationship ---
Customer.hasMany(Order, { foreignKey: "customerId", as: "orders" });
Order.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

// // --- Order & OrderItem Relationship ---
// Order.hasMany(OrderItem, { foreignKey: "orderId", as: "orderItems" });
// OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// // --- Product & OrderItem Relationship ---
// OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
// Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems" });

// Scope definitions
Tenant.addScope("active", {
  where: {
    isActive: true,
  },
});

// 3. Export all active models
module.exports = {
  sequelize,
  Tenant,
  User,
  Customer,
  Product,
  Order,
  
};
