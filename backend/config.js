const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Create Sequelize instance to connect to MySQL
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    dialect: 'mysql',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,  // Disable SQL query logging
});

sequelize.authenticate()
    .then(() => {
        console.log('MySQL Database connected successfully!');
    })
    .catch((err) => {
        console.error('Unable to connect to the MySQL database:', err);
    });

module.exports = { sequelize };
