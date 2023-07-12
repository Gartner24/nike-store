import { DataTypes } from 'sequelize';
import sequelize from '../../config/db/database.js';


const ProductImage = sequelize.define('ProductImage', {
    imageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },  
    isFront: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    imageURL: {
        type: DataTypes.STRING(500),
        allowNull: false
    }
}, {
    tableName: 'productsImages',
    timestamps: false,
});