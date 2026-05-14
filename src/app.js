const express = require('express');
const cors = require('cors');
const path = require('path');

const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/clientes', clienteRoutes);

app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );

});

module.exports = app;