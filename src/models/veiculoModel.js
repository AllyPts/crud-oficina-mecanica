const db = require('../config/database');

const Veiculo = {

    async listar() {

        const result = await db.query(
            `SELECT
                veiculos.id,
                clientes.nome AS cliente,
                veiculos.modelo,
                veiculos.marca,
                veiculos.placa,
                veiculos.ano
            FROM veiculos
            INNER JOIN clientes
                ON veiculos.cliente_id = clientes.id
            ORDER BY veiculos.id`
        );

        return result.rows;

    },

    async buscarPorId(id) {

        const result = await db.query(
            `SELECT
                veiculos.id,
                clientes.nome AS cliente,
                veiculos.modelo,
                veiculos.marca,
                veiculos.placa,
                veiculos.ano
            FROM veiculos
            INNER JOIN clientes
                ON veiculos.cliente_id = clientes.id
            WHERE veiculos.id = $1`,
            [id]
        );

        return result.rows[0];

    },

    async buscarPorPlaca(placa) {

        const result = await db.query(
            'SELECT * FROM veiculos WHERE placa = $1',
            [placa]
        );

        return result.rows[0];

    },

    async criar(cliente_id, modelo, marca, placa, ano) {

        const result = await db.query(
            `INSERT INTO veiculos
            (cliente_id, modelo, marca, placa, ano)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [cliente_id, modelo, marca, placa, ano]
        );

        return result.rows[0];

    },

    async atualizar(id, cliente_id, modelo, marca, placa, ano) {

        const result = await db.query(
            `UPDATE veiculos
            SET cliente_id = $1,
                modelo = $2,
                marca = $3,
                placa = $4,
                ano = $5
            WHERE id = $6
            RETURNING *`,
            [cliente_id, modelo, marca, placa, ano, id]
        );

        return result.rows[0];

    },

    async deletar(id) {

        await db.query(
            'DELETE FROM veiculos WHERE id = $1',
            [id]
        );

    }

};

module.exports = Veiculo;