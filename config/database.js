const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});

sequelize.syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Connection has been established successfully.');

        await sequelize.sync({ force: false }); // This will drop existing tables and re-create them, useful for development
        console.log('All models were synchronized successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = sequelize;
