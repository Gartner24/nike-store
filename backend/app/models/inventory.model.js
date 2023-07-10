import { DataTypes } from 'sequelize';
import sequelize from '../../config/db/database.js';

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

export default Inventory;
