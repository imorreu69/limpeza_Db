const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');
const Produto = sequelize.define('Produto', {
Nome: {
type: DataTypes.STRING,
allowNull: false,
},
Data: {
type: DataTypes.DATE,
allowNull: false,
},
quantidade_estoque: {
type: DataTypes.INTEGER,
allowNull: false,
defaultValue: 0,
},
}, {
tableName: 'produtos',
});
module.exports = Produto;