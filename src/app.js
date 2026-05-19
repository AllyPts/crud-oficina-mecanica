const express = require('express');
const cors = require('cors');
const path = require('path');

const clienteRoutes = require('./routes/clienteRoutes');

const veiculoRoutes = require('./routes/veiculoRoutes');

const funcionarioRoutes = require('./routes/funcionarioRoutes');

const ordemServicoRoutes = require('./routes/ordemServicoRoutes');

const itemRoutes = require('./routes/itemRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/clientes', clienteRoutes);

app.use('/veiculos', veiculoRoutes);

app.use('/funcionarios', funcionarioRoutes);

app.use('/ordensServico', ordemServicoRoutes);

app.use('/itens', itemRoutes);

app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );

});

module.exports = app;