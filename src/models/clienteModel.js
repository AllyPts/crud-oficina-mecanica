const db = require('../config/database');

const Cliente = {

    async listar() {

        const result = await db.query(
            'SELECT * FROM clientes ORDER BY id'
        );

        return result.rows;

    },

    async buscarPorId(id) {

        const result = await db.query(
            'SELECT * FROM clientes WHERE id = $1',
            [id]
        );

        return result.rows[0];

    },

    async atualizar(id, nome, telefone, email) {

        const result = await db.query(
            `UPDATE clientes
            SET nome = $1,
                telefone = $2,
                email = $3
            WHERE id = $4
            RETURNING *`,
            [nome, telefone, email, id]
        );

        return result.rows[0];

    },

    async criar(nome, telefone, email) {

        const result = await db.query(
            `INSERT INTO clientes
            (nome, telefone, email)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [nome, telefone, email]
        );

        return result.rows[0];

    },

    async deletar(id) {

        await db.query(
            'DELETE FROM clientes WHERE id = $1',
            [id]
        );

    }

};

module.exports = Cliente;