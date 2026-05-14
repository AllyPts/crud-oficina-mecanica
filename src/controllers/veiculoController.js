const Veiculo = require('../models/veiculoModel');

const Cliente = require('../models/clienteModel');

const veiculoController = {

    async listar(req, res) {

        try {

            const veiculos = await Veiculo.listar();

            res.json(veiculos);

        } catch (error) {

            res.status(500).json({
                erro: 'Erro ao listar veículos'
            });

        }

    },

    async buscarPorId(req, res) {

        try {

            const { id } = req.params;

            const veiculo = await Veiculo.buscarPorId(id);

            if (!veiculo) {

                return res.status(404).json({
                    erro: 'Veículo não encontrado'
                });

            }

            res.json(veiculo);

        } catch (error) {

            res.status(500).json({
                erro: 'Erro ao buscar veículo'
            });

        }

    },

    async criar(req, res) {

        try {

            const {
                cliente_id,
                modelo,
                marca,
                placa,
                ano
            } = req.body;

            if (
                !cliente_id ||
                !modelo ||
                !marca ||
                !placa ||
                !ano
            ) {

                return res.status(400).json({
                    erro: 'Preencha todos os campos'
                });

            }

            const clienteExiste =
                await Cliente.buscarPorId(cliente_id);

            if (!clienteExiste) {

                return res.status(404).json({
                    erro: 'Cliente não encontrado'
                });

            }

            const placaExistente =
                await Veiculo.buscarPorPlaca(placa);

            if (placaExistente) {

                return res.status(409).json({
                    erro: 'Placa já cadastrada'
                });

            }

            const veiculo = await Veiculo.criar(
                cliente_id,
                modelo,
                marca,
                placa,
                ano
            );

            res.status(201).json(veiculo);

        } catch (error) {

            res.status(500).json({
                erro: 'Erro ao cadastrar veículo'
            });

        }

    },

    async atualizar(req, res) {

        try {

            const { id } = req.params;

            const {
                cliente_id,
                modelo,
                marca,
                placa,
                ano
            } = req.body;

            const veiculoExistente =
                await Veiculo.buscarPorId(id);

            if (!veiculoExistente) {

                return res.status(404).json({
                    erro: 'Veículo não encontrado'
                });

            }

            const clienteExiste =
                await Cliente.buscarPorId(cliente_id);

            if (!clienteExiste) {

                return res.status(404).json({
                    erro: 'Cliente não encontrado'
                });

            }

            const veiculoAtualizado =
                await Veiculo.atualizar(
                    id,
                    cliente_id,
                    modelo,
                    marca,
                    placa,
                    ano
                );

            res.json(veiculoAtualizado);

        } catch (error) {

            res.status(500).json({
                erro: 'Erro ao atualizar veículo'
            });

        }

    },

    async deletar(req, res) {

        try {

            const { id } = req.params;

            const veiculoExistente =
                await Veiculo.buscarPorId(id);

            if (!veiculoExistente) {

                return res.status(404).json({
                    erro: 'Veículo não encontrado'
                });

            }

            await Veiculo.deletar(id);

            res.json({
                mensagem: 'Veículo deletado'
            });

        } catch (error) {

            res.status(500).json({
                erro: 'Erro ao deletar veículo'
            });

        }

    }

};

module.exports = veiculoController;