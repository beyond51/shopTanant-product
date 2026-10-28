const sequelize = require("../config/db.js");

// 🛢️ 1. Models Import
const Tenant = require("./tenant.model.js");
const User = require("./user.model.js");
const Customer = require("./customer.model.js");
const Product = require("./product.model.js");
const Order = require("./order.model.js");
const UserTenant = require("./userTenant.model.js");
// const OrderItem = require("./orderItem.model.js");

Tenant.hasMany(User, { foreignKey: "tenantId", as: "members" });
User.belongsTo(Tenant, { foreignKey: "tenantId", as: "organization" });

Tenant.hasMany(Product, { foreignKey: "tenantId", as: "products" });
Product.belongsTo(Tenant, { foreignKey: "tenantId", as: "organization" });

Tenant.hasMany(Customer, { foreignKey: "tenantId", as: "customers" });
Customer.belongsTo(Tenant, { foreignKey: "tenantId", as: "organization" });

Tenant.hasMany(Order, { foreignKey: "tenantId", as: "orders" });
Order.belongsTo(Tenant, { foreignKey: "tenantId", as: "organization" });

// --- Customer & Order Relationship ---
Customer.hasMany(Order, { foreignKey: "customerId", as: "orders" });
Order.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

User.hasMany(Product, {
  foreignKey: "createdBy",
  as: "createdProducts",
});

Product.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});

User.hasMany(Product, {
  foreignKey: "updatedBy",
  as: "updatedProducts",
});

Product.belongsTo(User, {
  foreignKey: "updatedBy",
  as: "updater",
});

Tenant.addScope("active", {
  where: {
    isActive: true,
  },
});
UserTenant.belongsTo(Tenant, {
  foreignKey: "tenantId",
  as: "tenant",
});

// 3. Export all active models
module.exports = {
  sequelize,
  Tenant,
  User,
  Customer,
  Product,
  Order,
  UserTenant,
};
