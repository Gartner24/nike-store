import { DataTypes } from 'sequelize';
import sequelize from '../../config/db/database.js';
import Product from './product.models.js'

const Inventory = sequelize.define('Inventory', {
  inventoryID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: Product,
      key: 'productID'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stockMin: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stockMax: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'inventory',
  timestamps: false,
});

export default Inventory;