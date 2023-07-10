import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Product from './product';

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
