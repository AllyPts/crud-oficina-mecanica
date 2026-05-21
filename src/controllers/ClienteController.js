const { Cliente } = require("../models");

class ClienteController {
  async criar(req, res) {
    try {
      const { nome, telefone, email } = req.body;

      const clienteExistente = await Cliente.findOne({
        where: { email },
      });

      if (clienteExistente) {
        return res
          .status(400)
          .json({ error: "Cliente com este email já existe." });
      }

      if (!nome || !telefone || !email) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios." });
      }

      const novoCliente = await Cliente.create({
        nome,
        telefone,
        email,
      });

      return res.status(201).json(novoCliente);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar cliente." });
    }
  }
  async listar(req, res) {
    try {
      const clientes = await Cliente.findAll();
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar clientes." });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado." });
      }

      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar cliente." });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, telefone, email } = req.body;

      await Cliente.update({ nome, telefone, email }, { where: { id } });
      return res
        .status(200)
        .json({ message: "Cliente atualizado com sucesso." });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar cliente." });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await Cliente.destroy({ where: { id } });
      return res.status(200).json({ message: "Cliente deletado com sucesso." });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar cliente." });
    }
  }
}

module.exports = new ClienteController();
