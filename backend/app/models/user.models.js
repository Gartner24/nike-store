import Sequelize from 'sequelize';
import sequelize from '../../config/db/database.js';

const User = sequelize.define('users', {
    userID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    fullName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(120),
        unique: true,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING(20)
    },
    role: {
        type: Sequelize.ENUM('client', 'admin'),
        allowNull: false,
        defaultValue: 'client'
    },
    address: {
        type: Sequelize.TEXT
    },
    registrationDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false
});



export default User;
