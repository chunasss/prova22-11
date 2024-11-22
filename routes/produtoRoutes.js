const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/produtos', produtoController.criarProduto);
router.get('/produtos', produtoController.listarProdutos);
router.get('/produtos/:produtoId', produtoController.buscarProduto);
router.put('/produtos/:produtoId', produtoController.editarProduto);
router.delete('/produtos/:produtoId', produtoController.excluirProduto);

module.exports = router;
