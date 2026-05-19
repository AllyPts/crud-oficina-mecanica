const db = require("../config/database");

const Ordemservico = {
  async listar() {
    const result = await db.query(
      `SELECT 
                ordens_servico.id,
                ordens_servico.status,
                ordens_servico.data_abertura,
                ordens_servico.data_conclusao,
                ordens_servico.valor_total,
                veiculos.placa AS veiculo,
                funcionarios.nome AS funcionario
                FROM ordens_servico
                INNER JOIN veiculos ON ordens_servico.veiculo_id = veiculos.id
                INNER JOIN funcionarios ON ordens_servico.funcionario_id = funcionarios.id
                ORDER BY ordens_servico.id`,
    );
    return result.rows;
  },

  async buscarPorId(id) {
    const result = await db.query(
      `SELECT 
                ordens_servico.id,
                ordens_servico.status,
                ordens_servico.data_abertura,
                ordens_servico.data_conclusao,
                ordens_servico.valor_total,
                veiculos.placa AS veiculo,
                funcionarios.nome AS funcionario
                FROM ordens_servico
                INNER JOIN veiculos ON ordens_servico.veiculo_id = veiculos.id
                INNER JOIN funcionarios ON ordens_servico.funcionario_id = funcionarios.id
                WHERE ordens_servico.id = $1
                ORDER BY ordens_servico.id`,
      [id],
    );
    return result.rows[0];
  },

  async criar(veiculo_id, funcionario_id, status, valor_total) {
    const result = await db.query(
      `INSERT INTO ordens_servico
            (veiculo_id, funcionario_id, status, valor_total)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
      [veiculo_id, funcionario_id, status, valor_total],
    );

    return result.rows[0];
  },

  async atualizar(
    id,
    veiculo_id,
    funcionario_id,
    status,
    data_conclusao,
    valor_total,
  ) {
    const result = await db.query(
      `UPDATE ordens_servico
            SET veiculo_id = $1,
                funcionario_id = $2,
                status = $3,
                data_conclusao = $4,
                valor_total = $5
            WHERE id = $6
            RETURNING *`,
      [veiculo_id, funcionario_id, status, data_conclusao, valor_total, id],
    );

    return result.rows[0];
  },

  async deletar(id) {
    await db.query("DELETE FROM ordens_servico WHERE id = $1", [id]);
  },
};

module.exports = Ordemservico;
