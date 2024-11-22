const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/pedidos', pedidoController.criarPedido);
router.get('/pedidos', pedidoController.listarPedidos);
router.put('/pedidos/:pedidoId/status', pedidoController.atualizarStatusPedido);

module.exports = router;
