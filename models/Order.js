const { DataTypes, Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const sequelize = require('../config/database'); // Assuming you have a similar config

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,  // Automatically generates UUID
    },
    orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',  // Assuming 'Users' is the name of the User table
            key: 'id',
        },
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',  // Default order status
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    timestamps: true,  // Automatically adds `createdAt` and `updatedAt`
    hooks: {
        beforeCreate(order, options) {
            order.id = uuidv4();  // Generates a UUID for the order
            // Optionally, you could also generate a custom order number here
        }
    }
});

module.exports = Order;
