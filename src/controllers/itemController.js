const Item = require("../models/itemModel");

const itemController = {
  async listar(req, res) {
    try {
      const itens = await Item.listar();

      res.json(itens);
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao listar itens",
      });
    }
  },
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const item = await Item.buscarPorId(id);

      if (!item) {
        return res.status(404).json({
          erro: "Item não encontrado",
        });
      }

      res.json(item);
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao buscar item",
      });
    }
  },
  async criar(req, res) {
    try {
      const { nome, tipo, preco, quantidade, descricao } = req.body;

      if (!nome || !tipo || !preco || !quantidade || !descricao) {
        return res.status(400).json({
          erro: "Preencha todos os campos",
        });
      }

      const item = await Item.criar(nome, tipo, preco, quantidade, descricao);

      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao criar item",
      });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;

      const { nome, tipo, preco, quantidade, descricao } = req.body;

      if (!nome || !tipo || !preco || !quantidade || !descricao) {
        return res.status(400).json({
          erro: "Preencha todos os campos",
        });
      }

      const itemExistente = await Item.buscarPorId(id);

      if (!itemExistente) {
        return res.status(404).json({
          erro: "Item não encontrado",
        });
      }

      const itemAtualizado = await Item.atualizar(
        id,
        nome,
        tipo,
        preco,
        quantidade,
        descricao,
      );

      res.json(itemAtualizado);
    } catch (erro) {
      res.status(500).json({
        erro: "Erro ao atualizar item",
      });
    }
  },
  async deletar(req, res) {
    try {
      const { id } = req.params;

      const itemExistente = await Item.buscarPorId(id);

      if (!itemExistente) {
        return res.status(404).json({
          erro: "Item não encontrado",
        });
      }

      await Item.deletar(id);

      res.json({
        mensagem: "Item deletado",
      });
    } catch (erro) {
      res.status(500).json({
        erro: "Erro ao deletar item",
      });
    }
  },
};

module.exports = itemController;
