const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "internal server error";

  // 🛡️ Handle Sequelize Validation & Unique Constraint errors
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  }

  // Log the full error stack in the server console for easy debugging
  console.error("❌ Error handler caught:", err);

  res.status(statusCode).json({
    message,
    sucess: false,
  });
};

module.exports = errorMiddleware;
