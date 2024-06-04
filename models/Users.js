const {DataTypes, Sequelize} = require('sequelize');
const {v4: uuidv4} = require('uuid');

const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4,},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
}, {
    timestamps: true,
    hooks: {
        beforeCreate(attributes, options) {
            attributes.id = uuidv4();
        }
    }
});
module.exports = User;
