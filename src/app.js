const express = require("express");
const Sequelize = require("./config/db");
const cors = require("cors");

const cookieparser = require("cookie-parser");

// error middleware
const ErrorMiddleware = require("./middlewares/error.middleware");

// import routes
const tenantRoutes = require("./routes/tenant.routes");
const usertenants = require("./routes/userTenants.routes");
const AuthRoutes = require("./routes/user.routes");
const ProductRoutes = require("./routes/product.routes");
const CustomerRoutes = require("./routes/customer.routes");
const OrderRoutes = require("./routes/order.routes");
const PaymentRoutes = require("./routes/payment.routes");
const createOrderNumber = require("./utils/orderNumber");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieparser());

const startServer = async () => {
  try {
    await Sequelize.authenticate();
    console.log("Database connected successfully.");

    require("./models/index");

    await Sequelize.sync();
  } catch (error) {
    console.log("Error in postgresql sync:", error);
  }
};

startServer();

// Routes
app.use("/api/tenant", tenantRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/userTenant", usertenants);
app.use("/api/products", ProductRoutes);
app.use("/api/customers", CustomerRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/payments", PaymentRoutes);

// Error middleware
app.use(ErrorMiddleware);

module.exports = app;
