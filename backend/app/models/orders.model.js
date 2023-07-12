import { DataTypes } from 'sequelize';
import sequelize from '../../config/db/database.js';

const Order = sequelize.define('Order', {
  orderID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  orderStatus: {
    type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
    allowNull: false,
    defaultValue: 'Pending'
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  shippingAddress: {
    type: DataTypes.STRING(150),
    allowNull: false
  }
}, {
  tableName: 'orders',
  timestamps: false
});

export default Order;