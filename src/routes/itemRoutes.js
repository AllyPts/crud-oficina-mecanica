const express = require('express');

const router = express.Router();

const itemController = require('../controllers/itemController');

router.get('/', itemController.listar);

router.get('/:id', itemController.buscarPorId);

router.post('/', itemController.criar);

router.put('/:id', itemController.atualizar);

router.delete('/:id', itemController.deletar);

module.exports = router;