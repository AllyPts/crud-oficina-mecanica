const db = require("../config/database");

const Funcionario = {
  async listar() {
    const result = await db.query("SELECT * FROM funcionarios ORDER BY id");

    return result.rows;
  },
  async buscarPorId(id) {
    const result = await db.query("SELECT * FROM funcionarios WHERE id = $1", [
      id,
    ]);

    return result.rows[0];
  },
  async buscarPorCpf(cpf) {
    const result = await db.query("SELECT * FROM funcionarios WHERE cpf = $1", [
      cpf,
    ]);

    return result.rows[0];
  },
  async criar(nome, cpf, telefone, cargo, salario) {
    const result = await db.query(
      `INSERT INTO funcionarios
            (nome, cpf, telefone, cargo, salario)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
      [nome, cpf, telefone, cargo, salario],
    );

    return result.rows[0];
  },
  async atualizar(id, nome, cpf, telefone, cargo, salario) {
    const result = await db.query(
      `UPDATE funcionarios
            SET nome = $1,
                cpf = $2,
                telefone = $3,
                cargo = $4,
                salario = $5
            WHERE id= $6
            RETURNING *`,
      [nome, cpf, telefone, cargo, salario, id],
    );

    return result.rows[0];
  },
  async deletar(id) {
    await db.query(`DELETE FROM funcionarios WHERE id = $1`, [id]);
  },
};

module.exports = Funcionario;
