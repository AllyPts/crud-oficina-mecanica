const Funcionario = require("../models/funcionarioModel");

const funcionarioController = {
  async listar(req, res) {
    try {
      const funcionarios = await Funcionario.listar();

      res.json(funcionarios);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar funcionarios" });
    }
  },
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const funcionario = await Funcionario.buscarPorId(id);

      if (!funcionario) {
        return res.status(404).json({ erro: "Funcionario não encontrado" });
      }

      res.json(funcionario);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar funcionario" });
    }
  },
  async criar(req, res) {
    try {
      const { cpf, telefone, salario, cargo, nome } = req.body;

      if (!cpf || !telefone || !salario || !cargo || !nome) {
        return res.status(400).json({ erro: "Preencha todos os campos" });
      }

      const cpfExistente = await Funcionario.buscarPorCpf(cpf);

      if (cpfExistente) {
        return res.status(409).json({ erro: "Cpf já cadastrado" });
      }

      const funcionario = await Funcionario.criar(
        nome,
        cpf,
        telefone,
        cargo,
        salario,
      );

      res.status(201).json(funcionario);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao criar funcionario" });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;

      const { cpf, telefone, salario, cargo, nome } = req.body;

      if (!nome || !telefone || !salario || !cargo || !cpf) {
        return res.status(400).json({ erro: "Preencha todos os campos" });
      }

      const funcionarioExistente = await Funcionario.buscarPorId(id);

      if (!funcionarioExistente) {
        return res.status(404).json({ erro: "Funcionario não encontrado" });
      }

      const funcionarioAtualizado = await Funcionario.atualizar(
        id,
        nome,
        cpf,
        telefone,
        cargo,
        salario,
      );

      res.json(funcionarioAtualizado);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao atualizar funcionario" });
    }
  },
  async deletar(req, res) {
    try {
      const { id } = req.params;

      const funcionarioExistente = await Funcionario.buscarPorId(id);

      if (!funcionarioExistente) {
        return res.status(404).json({ erro: "Funcionario não encontrado" });
      }

      await Funcionario.deletar(id);

      res.json({ mensagem: "Funcionario deletado" });
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao deletar funcionario" });
    }
  },
};

module.exports = funcionarioController;
