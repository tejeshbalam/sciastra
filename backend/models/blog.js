

const { sequelize } = require('../config'); // Correctly import the sequelize instance

const { Sequelize, DataTypes } = require('sequelize');

// Define the Blog model
const Blog = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publishedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    tags: {
        type: DataTypes.STRING, // Store tags as a comma-separated string
        allowNull: true,
    }
}, {
    timestamps: false, // No createdAt/updatedAt fields for blog posts
    tableName: 'blogs',
});

module.exports = { Blog };
