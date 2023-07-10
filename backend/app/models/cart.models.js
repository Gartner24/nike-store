import { DataTypes } from 'sequelize';
import sequelize from '../../config/db/database.js';
import User from './user.models.js';
import Product from './product.models.js';

const ShoppingCart = sequelize.define('ShoppingCart', {
  cartID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userID'
    }
  },
  productID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'productID'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cartStatus: {
    type: DataTypes.ENUM('Active', 'Ordered', 'Cancelled'),
    allowNull: false,
    defaultValue: 'Active'
  }
}, {
  tableName: 'shoppingCart',
  timestamps: false
});

export default ShoppingCart;
