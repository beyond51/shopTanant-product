const { DataTypes } = require("sequelize");
const Sequence = require("../config/db");

const tenant = Sequence.define("tenant", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  ShopName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  officialEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  shopDomain: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = tenant;
