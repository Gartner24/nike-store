const { DataTypes } = require('sequelize');
const sequelize = require('../config/db/database'); // Asegúrate de que la ruta sea correcta para tu configuración

const Inventory = sequelize.define('inventory', {
  inventoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  productID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stockMin: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stockMax: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Inventory;
