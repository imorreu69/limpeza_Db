const Livro = require('../models/produto');
const { Op } = require('sequelize');
async function cadastrar(req, res) {
    try {
        const produto = await Produto.create(req.body);
        res.status(201).json(produto);
    } catch (erro) {
        res.status(400).json({
            mensagem: 'Erro ao cadastrar produto',
            erro: erro.message,
        });
    }
}

async function listar(req, res) {
    try {
        const { pagina = 1, limite = 10, nome, data } = req.query;
        const paginaNumerica = Number(pagina);
        const limiteNumerico = Number(limite);
        const filtro = {};

        if (!Number.isInteger(paginaNumerica) || paginaNumerica < 1 ||
            !Number.isInteger(limiteNumerico) || limiteNumerico < 1) {
            return res.status(400).json({
                mensagem: 'Pagina e limite devem ser números inteiros positivos',
            });
        }

        if (nome) {
            filtro.titulo = { [Op.like]: `%${nome}%` };
        }

        if (data) {
            const dataInicial = new Date(data);

            if (Number.isNaN(dataInicial.getTime())) {
                return res.status(400).json({
                    mensagem: 'Data inválida',
                });
            }

            filtro.createdAt = { [Op.gte]: dataInicial };
        }

        const produto = await Livro.findAll({
            where: filtro,
            limit: limiteNumerico,
            offset: (paginaNumerica - 1) * limiteNumerico,
        });

        res.json(produto);
    } catch (erro) {
        res.status(400).json({
            mensagem: 'Erro ao listar Produtos',
            erro: erro.message,
        });
    }
}

async function deletar(req, res) {
    try {
        const { id } = req.params;

        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado',
            });
        }

        await produto.destroy();

        res.status(200).json({
            mensagem: 'Produto removido com sucesso',
        });

    } catch (erro) {
        res.status(400).json({
            mensagem: 'Erro ao deletar produto',
            erro: erro.message,
        });
    }
}

module.exports = { cadastrar, listar, deletar };