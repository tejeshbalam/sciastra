
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');  // Import the configured sequelize instance

const Enrollment = sequelize.define('Enrollment', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    enrollmentDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    timestamps: false,
    tableName: 'enrollments',
});

module.exports = Enrollment;
