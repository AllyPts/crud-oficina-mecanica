const Ordemservico = require("../models/ordemServicoModel");
const Veiculo = require("../models/veiculoModel");
const Funcionario = require("../models/funcionarioModel");

const ordemServicoController = {
  async listar(req, res) {
    try {
      const ordensServico = await Ordemservico.listar();

      res.json(ordensServico);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar ordens de serviço" });
    }
  },
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const ordemServico = await Ordemservico.buscarPorId(id);

      if (!ordemServico) {
        return res
          .status(404)
          .json({ erro: "Ordem de serviço não encontrada" });
      }

      res.json(ordemServico);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar ordem de serviço" });
    }
  },

  async criar(req, res) {
    try {
      const { veiculo_id, funcionario_id, status, valor_total } = req.body;

      if (!veiculo_id || !funcionario_id || !status || !valor_total) {
        return res.status(400).json({ erro: "Preencha todos os campos" });
      }

      const veiculoExistente = await Veiculo.buscarPorId(veiculo_id);

      const funcionarioExistente =
        await Funcionario.buscarPorId(funcionario_id);

      if (!veiculoExistente) {
        return res.status(404).json({ erro: "Veiculo não encontrado" });
      }

      if (!funcionarioExistente) {
        return res.status(404).json({ erro: "Funcionario não encontrado" });
      }

      const ordemServico = await Ordemservico.criar(
        veiculo_id,
        funcionario_id,
        status,
        valor_total,
      );
      res.status(201).json({ ordemServico });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao criar ordem de serviço" });
    }
  },
  async atualizar(req, res) {
    try {
      const { id } = req.params;

      const {
        veiculo_id,
        funcionario_id,
        status,
        data_conclusao,
        valor_total,
      } = req.body;

      if (
        !veiculo_id ||
        !funcionario_id ||
        !status ||
        !data_conclusao ||
        !valor_total
      ) {
        return res.status(400).json({ erro: "Preencha todos os campos" });
      }

      const ordemServicoExistente = await Ordemservico.buscarPorId(id);

      if (!ordemServicoExistente) {
        return res
          .status(404)
          .json({ erro: "Ordem de serviço não encontrada" });
      }

      const ordemservicoAtualizado = await Ordemservico.atualizar(
        id,
        veiculo_id,
        funcionario_id,
        status,
        data_conclusao,
        valor_total,
      );

      res.json(ordemservicoAtualizado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar ordem de serviço" });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      const ordemServicoExistente = await Ordemservico.buscarPorId(id);

      if (!ordemServicoExistente) {
        return res
          .status(404)
          .json({ erro: "Ordem de serviço não encontrada" });
      }

      await Ordemservico.deletar(id);

      res.json({ mensagem: "Ordem de serviço deletada" });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao deletar ordem de serviço" });
    }
  },
};

module.exports = ordemServicoController;
