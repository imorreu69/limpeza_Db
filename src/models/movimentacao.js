const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const produto = require('./produto');
const Usuario = require('./usuario');

const Movimentacao = sequelize.define('Movimentacao', {
    tipo: {
        type: DataTypes.ENUM('entrada', 'saida'),
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    data: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'movimentacaos',
});

produto.hasMany(Movimentacao, { foreignKey: 'produto_id' });
Movimentacao.belongsTo(produto, { foreignKey: 'produto_id' });
Usuario.hasMany(Movimentacao, { foreignKey: 'usuario_id' });
Movimentacao.belongsTo(Usuario, { foreignKey: 'usuario_id' });
module.exports = Movimentacao;