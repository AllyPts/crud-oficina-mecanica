const db = require('../config/database');

const Item = {

    async listar() {

        const result = await db.query(
            'SELECT * FROM itens ORDER BY id'
        );

        return result.rows;

    },
    async buscarPorId(id) {

        const result = await db.query(
            'SELECT * FROM itens WHERE id = $1',
            [id]
        );

        return result.rows[0];

    },
    async buscarPorTipo(tipo) {

        const result = await db.query(
            'SELECT * FROM itens WHERE tipo = $1',
            [tipo]
        );
        
        return result.rows
    },
    async criar(nome, tipo, preco, quantidade, descricao) {

        const result = await db.query(
            `INSERT INTO itens
            (nome, tipo, preco, quantidade, descricao)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [nome, tipo, preco, quantidade, descricao]
        );

    return result.rows[0];
    },
    async atualizar(id, nome, tipo, preco, quantidade, descricao) {
        const result = await db.query (
            `UPDATE itens
            SET nome = $1,
                tipo = $2,
                preco = $3,
                quantidade = $4,
                descricao = $5
            WHERE id= $6
            RETURNING *`,
            [nome, tipo, preco, quantidade, descricao, id]
        );

    return result.rows[0]
    },
    async deletar(id) {

        await db.query(
            `DELETE FROM itens WHERE id = $1`,
           [id]
        );
    },
};

module.exports = Item;