const db = require('../config/database');

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
                ORDER BY ordens_servico.id`
        );
        return result.rows
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
                ORDER BY ordens_servico.id`, [id]           
        );
        return result.rows[0]
     }
     
};