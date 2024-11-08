const { sequelize } = require('../config'); // Import sequelize from config
const { DataTypes } = require('sequelize');

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'users', // Custom table name
    timestamps: false,  // No need for createdAt/updatedAt timestamps for user
});

module.exports = { User };
