const Cliente = require('../models/clienteModel');

const clienteController = {

    async listar(req, res) {

        try {

            const clientes = await Cliente.listar();

            res.json(clientes);

        } catch (error) {

            res.status(500).json({
                erro: 'Erro ao listar clientes'
            });

        }

    },

async buscarPorId(req, res) {

    try {

        const { id } = req.params;

        const cliente = await Cliente.buscarPorId(id);

        if (!cliente) {

            return res.status(404).json({
                erro: 'Cliente não encontrado'
            });

        }

        res.json(cliente);

    } catch (error) {

        res.status(500).json({
            erro: 'Erro ao buscar cliente'
        });

    }

},

    async criar(req, res) {

    try {

        const { nome, telefone, email } = req.body;

        if (!nome || !telefone || !email) {

            return res.status(400).json({
                erro: 'Preencha todos os campos'
            });

        }

        const cliente = await Cliente.criar(
            nome,
            telefone,
            email
        );

        res.status(201).json(cliente);

    } catch (error) {

        res.status(500).json({
            erro: 'Erro ao criar cliente'
        });

    }

},

    async atualizar(req, res) {

    try {

        const { id } = req.params;

        const { nome, telefone, email } = req.body;

        if (!nome || !telefone || !email) {

            return res.status(400).json({
                erro: 'Preencha todos os campos'
            });

        }

        const clienteAtualizado = await Cliente.atualizar(
            id,
            nome,
            telefone,
            email
        );

        res.json(clienteAtualizado);

    } catch (error) {

        res.status(500).json({
            erro: 'Erro ao atualizar cliente'
        });

    }

},

    async deletar(req, res) {

        try {

            const { id } = req.params;

            await Cliente.deletar(id);

            res.json({
                mensagem: 'Cliente deletado'
            });

        } catch (error) {

            res.status(500).json({
                erro: 'Erro ao deletar cliente'
            });

        }

    }

};

module.exports = clienteController;